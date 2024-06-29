import { IntegrationTest, expect, SetupGameServerPlayers, integrationConfig, EventsAwaiter } from '@takaro/test';
import {
  Client,
  ItemsOutputDTO,
  ShopListingOutputDTO,
  ShopOrderOutputDTOStatusEnum,
  UserOutputDTO,
  isAxiosError,
} from '@takaro/apiclient';
import { faker } from '@faker-js/faker';
import { GameEvents } from '@takaro/modules';

const group = 'ShopOrderController';

async function createUserForPlayer(
  client: Client,
  eventsAwaiter: EventsAwaiter,
  playerId: string,
  gameServerId: string,
  createUser = true
) {
  const password = 'shop-tester-password-very-safe';

  let user: UserOutputDTO | null = null;

  if (createUser) {
    user = (
      await client.user.userControllerCreate({
        name: 'test',
        email: `test-${faker.internet.email()}`,
        password,
      })
    ).data.data;
  } else {
    const userSearchRes = await client.user.userControllerSearch({ filters: { playerId: [playerId] } });
    if (userSearchRes.data.data.length === 0) {
      throw new Error('No user found for player');
    }
    user = userSearchRes.data.data[0];
  }

  const userClient = new Client({ auth: { username: user.email, password }, url: integrationConfig.get('host') });
  await userClient.login();

  const chatEventWaiter = eventsAwaiter.waitForEvents(GameEvents.CHAT_MESSAGE);
  await client.command.commandControllerTrigger(gameServerId, {
    msg: '/link',
    playerId,
  });
  const chatEvents = await chatEventWaiter;
  expect(chatEvents).to.have.length(1);
  const code = chatEvents[0].data.msg.match(/code=(\w+-\w+-\w+)/)[1];
  await userClient.user.userControllerLinkPlayerProfile({ email: user.email, code });

  return {
    user,
    client: userClient,
  };
}

interface IShopSetup extends SetupGameServerPlayers.ISetupData {
  items: ItemsOutputDTO[];
  listing100: ShopListingOutputDTO;
  listing33: ShopListingOutputDTO;
  user1: UserOutputDTO;
  client1: Client;
  user2: UserOutputDTO;
  client2: Client;
}

const shopSetup = async function (this: IntegrationTest<IShopSetup>): Promise<IShopSetup> {
  const setupData = await SetupGameServerPlayers.setup.bind(
    this as unknown as IntegrationTest<SetupGameServerPlayers.ISetupData>
  )();

  await this.client.settings.settingsControllerSet('economyEnabled', {
    value: 'true',
    gameServerId: setupData.gameServer1.id,
  });

  await this.client.settings.settingsControllerSet('currencyName', {
    gameServerId: setupData.gameServer1.id,
    value: 'test coin',
  });

  const items = (await this.client.item.itemControllerSearch()).data.data;

  const listing100Res = await this.client.shopListing.shopListingControllerCreate({
    gameServerId: setupData.gameServer1.id,
    itemId: items[0].id,
    price: 100,
    name: 'Test item',
  });

  const listing33Res = await this.client.shopListing.shopListingControllerCreate({
    gameServerId: setupData.gameServer1.id,
    itemId: items[1].id,
    price: 33,
    name: 'Test item 2',
  });

  await this.client.playerOnGameserver.playerOnGameServerControllerAddCurrency(
    setupData.gameServer1.id,
    setupData.pogs1[0].playerId,
    { currency: 250 }
  );

  await this.client.playerOnGameserver.playerOnGameServerControllerAddCurrency(
    setupData.gameServer1.id,
    setupData.pogs1[1].playerId,
    { currency: 250 }
  );

  const { client: user1Client, user: user1 } = await createUserForPlayer(
    this.client,
    setupData.eventsAwaiter,
    setupData.pogs1[0].playerId,
    setupData.gameServer1.id
  );

  const { client: user2Client, user: user2 } = await createUserForPlayer(
    this.client,
    setupData.eventsAwaiter,
    setupData.pogs1[1].playerId,
    setupData.gameServer1.id
  );

  return {
    ...setupData,
    items,
    listing100: listing100Res.data.data,
    listing33: listing33Res.data.data,
    user1,
    client1: user1Client,
    user2,
    client2: user2Client,
  };
};

const tests = [
  new IntegrationTest<IShopSetup>({
    group,
    snapshot: true,
    name: 'Create a new order',
    setup: shopSetup,
    filteredFields: ['listingId', 'userId'],
    test: async function () {
      const res = await this.setupData.client1.shopOrder.shopOrderControllerCreate({
        listingId: this.setupData.listing100.id,
        amount: 1,
      });

      expect(res.data.data.status).to.be.eq(ShopOrderOutputDTOStatusEnum.Paid);

      return res;
    },
  }),
  new IntegrationTest<IShopSetup>({
    group,
    snapshot: true,
    name: 'Create a new order when not enough money',
    setup: shopSetup,
    filteredFields: ['listingId', 'userId'],
    expectedStatus: 400,
    test: async function () {
      try {
        await this.setupData.client1.shopOrder.shopOrderControllerCreate({
          listingId: this.setupData.listing100.id,
          amount: 5,
        });
        throw new Error('Should not be able to create order');
      } catch (error) {
        if (!isAxiosError(error)) throw error;
        if (!error.response) throw error;
        expect(error.response.data.meta.error.code).to.be.eq('BadRequestError');
        expect(error.response.data.meta.error.message).to.be.eq('Not enough currency');
        return error.response;
      }
    },
  }),
  new IntegrationTest<IShopSetup>({
    group,
    snapshot: true,
    name: 'Get order by ID',
    setup: shopSetup,
    filteredFields: ['listingId', 'userId'],
    test: async function () {
      const order = await this.setupData.client1.shopOrder.shopOrderControllerCreate({
        listingId: this.setupData.listing100.id,
        amount: 1,
      });

      const res = await this.setupData.client1.shopOrder.shopOrderControllerGetOne(order.data.data.id);
      return res;
    },
  }),
  new IntegrationTest<IShopSetup>({
    group,
    snapshot: true,
    name: 'Get order by ID that is not yours -> error',
    setup: shopSetup,
    filteredFields: ['listingId', 'userId'],
    expectedStatus: 404,
    test: async function () {
      const order = await this.setupData.client1.shopOrder.shopOrderControllerCreate({
        listingId: this.setupData.listing100.id,
        amount: 1,
      });

      try {
        await this.setupData.client2.shopOrder.shopOrderControllerGetOne(order.data.data.id);
        throw new Error('Should not be able to get order');
      } catch (error) {
        if (!isAxiosError(error)) throw error;
        if (!error.response) throw error;
        expect(error.response.data.meta.error.code).to.be.eq('NotFoundError');
        return error.response;
      }
    },
  }),
  new IntegrationTest<IShopSetup>({
    group,
    snapshot: true,
    name: 'Get order by ID that is not yours but you have high privileges -> success',
    setup: shopSetup,
    filteredFields: ['listingId', 'userId'],
    test: async function () {
      const order = await this.setupData.client1.shopOrder.shopOrderControllerCreate({
        listingId: this.setupData.listing100.id,
        amount: 1,
      });

      const res = await this.client.shopOrder.shopOrderControllerGetOne(order.data.data.id);
      return res;
    },
  }),
  new IntegrationTest<IShopSetup>({
    group,
    snapshot: true,
    name: 'Search orders',
    setup: shopSetup,
    filteredFields: ['listingId', 'userId'],
    test: async function () {
      await this.setupData.client1.shopOrder.shopOrderControllerCreate({
        listingId: this.setupData.listing100.id,
        amount: 1,
      });
      const res = await this.setupData.client1.shopOrder.shopOrderControllerSearch();
      expect(res.data.data).to.have.length(1);
      return res;
    },
  }),
  new IntegrationTest<IShopSetup>({
    group,
    snapshot: true,
    name: 'Search orders returns only own orders',
    setup: shopSetup,
    filteredFields: ['listingId', 'userId'],
    test: async function () {
      await this.setupData.client1.shopOrder.shopOrderControllerCreate({
        listingId: this.setupData.listing100.id,
        amount: 1,
      });

      const res = await this.setupData.client2.shopOrder.shopOrderControllerSearch();
      expect(res.data.data).to.have.length(0);
      return res;
    },
  }),
  new IntegrationTest<IShopSetup>({
    group,
    snapshot: true,
    name: 'Cannot search orders of another user',
    setup: shopSetup,
    filteredFields: ['listingId', 'userId'],
    test: async function () {
      await this.setupData.client1.shopOrder.shopOrderControllerCreate({
        listingId: this.setupData.listing100.id,
        amount: 1,
      });

      const ordersRes = await this.setupData.client2.shopOrder.shopOrderControllerSearch({
        filters: { userId: [this.setupData.user1.id] },
      });
      expect(ordersRes.data.data).to.have.length(0);
      return ordersRes;
    },
  }),
  new IntegrationTest<IShopSetup>({
    group,
    snapshot: true,
    name: 'Search orders returns all orders when called by high privileged user',
    setup: shopSetup,
    filteredFields: ['listingId', 'userId'],
    test: async function () {
      await this.setupData.client1.shopOrder.shopOrderControllerCreate({
        listingId: this.setupData.listing100.id,
        amount: 1,
      });

      await this.setupData.client2.shopOrder.shopOrderControllerCreate({
        listingId: this.setupData.listing33.id,
        amount: 1,
      });

      const res = await this.client.shopOrder.shopOrderControllerSearch();
      expect(res.data.data).to.have.length(2);
      return res;
    },
  }),
];

/** TODO:
 * Claim an order happy path
 * Claim an order that is not yours -> error
 * Claim an order that is already claimed -> error
 * Claim an order that is canceled -> error
 *
 * Cancel an order happy path
 * Cancel an order that is not yours -> error
 * High priv user cancel an order that is not yours -> success
 * Cancel an order that is already canceled -> error
 */

describe(group, function () {
  tests.forEach((test) => {
    test.run();
  });
});
