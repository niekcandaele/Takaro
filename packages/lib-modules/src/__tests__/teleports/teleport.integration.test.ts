import { IntegrationTest, expect, EventsAwaiter } from '@takaro/test';
import { IModuleTestsSetupData, modulesTestSetup } from '../setupData.integration.test.js';
import { GameEvents } from '../../dto/index.js';

const group = 'Teleports suite';

const tests = [
  new IntegrationTest<IModuleTestsSetupData>({
    group,
    snapshot: false,
    setup: modulesTestSetup,
    name: 'Can teleport with /tp',
    test: async function () {
      await this.client.gameserver.gameServerControllerInstallModule(
        this.setupData.gameserver.id,
        this.setupData.teleportsModule.id
      );

      const eventAwaiter = new EventsAwaiter();
      await eventAwaiter.connect(this.client);
      const setEvents = eventAwaiter.waitForEvents(GameEvents.CHAT_MESSAGE, 1);
      await this.client.command.commandControllerTrigger(this.setupData.gameserver.id, {
        msg: '/settp test',
        player: {
          gameId: '1',
        },
      });

      expect((await setEvents).length).to.be.eq(1);
      expect((await setEvents)[0].data.msg).to.be.eq('Teleport test set.');

      const events = eventAwaiter.waitForEvents(GameEvents.CHAT_MESSAGE, 1);
      await this.client.command.commandControllerTrigger(this.setupData.gameserver.id, {
        msg: '/tp test',
        player: {
          gameId: '1',
        },
      });

      expect((await events).length).to.be.eq(1);
      expect((await events)[0].data.msg).to.be.eq('Teleported to test.');
    },
  }),
  new IntegrationTest<IModuleTestsSetupData>({
    group,
    snapshot: false,
    setup: modulesTestSetup,
    name: 'Shows an error when teleporting to a non-existing teleport',
    test: async function () {
      await this.client.gameserver.gameServerControllerInstallModule(
        this.setupData.gameserver.id,
        this.setupData.teleportsModule.id
      );
      const eventAwaiter = new EventsAwaiter();
      await eventAwaiter.connect(this.client);
      const events = eventAwaiter.waitForEvents(GameEvents.CHAT_MESSAGE);

      await this.client.command.commandControllerTrigger(this.setupData.gameserver.id, {
        msg: '/tp test',
        player: {
          gameId: '1',
        },
      });

      expect((await events).length).to.be.eq(1);
      expect((await events)[0].data.msg).to.be.eq('Teleport test does not exist.');
    },
  }),
  new IntegrationTest<IModuleTestsSetupData>({
    group,
    snapshot: false,
    setup: modulesTestSetup,
    name: 'Times out when teleporting faster than set timeout',
    test: async function () {
      await this.client.gameserver.gameServerControllerInstallModule(
        this.setupData.gameserver.id,
        this.setupData.teleportsModule.id,
        {
          userConfig: JSON.stringify({
            timeout: 5000,
          }),
        }
      );
      const eventAwaiter = new EventsAwaiter();
      await eventAwaiter.connect(this.client);

      const setTpEvent = eventAwaiter.waitForEvents(GameEvents.CHAT_MESSAGE, 1);

      await this.client.command.commandControllerTrigger(this.setupData.gameserver.id, {
        msg: '/settp test',
        player: {
          gameId: '1',
        },
      });

      expect((await setTpEvent).length).to.be.eq(1);

      const tpEvent = eventAwaiter.waitForEvents(GameEvents.CHAT_MESSAGE, 1);

      await this.client.command.commandControllerTrigger(this.setupData.gameserver.id, {
        msg: '/tp test',
        player: {
          gameId: '1',
        },
      });

      expect((await tpEvent)[0].data.msg).to.be.eq('Teleported to test.');

      const tpTimeoutEvent = eventAwaiter.waitForEvents(GameEvents.CHAT_MESSAGE, 1);

      await this.client.command.commandControllerTrigger(this.setupData.gameserver.id, {
        msg: '/tp test',
        player: {
          gameId: '1',
        },
      });

      expect((await tpTimeoutEvent)[0].data.msg).to.be.eq('You cannot teleport yet. Please wait before trying again.');
    },
  }),
];

describe(group, function () {
  tests.forEach((test) => {
    test.run();
  });
});
