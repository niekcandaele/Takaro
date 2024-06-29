import { TakaroService } from '../Base.js';
import { ShopListingModel, ShopListingRepo } from '../../db/shopListing.js';
import { ctx, errors, traceableClass } from '@takaro/util';
import { ITakaroQuery } from '@takaro/db';
import { PaginatedOutput } from '../../db/base.js';
import { ShopOrderRepo } from '../../db/shopOrder.js';
import {
  ShopListingOutputDTO,
  ShopListingCreateDTO,
  ShopListingUpdateDTO,
  ShopOrderOutputDTO,
  ShopOrderUpdateDTO,
  ShopOrderStatus,
  ShopOrderCreateInternalDTO,
} from './dto.js';
import { UserService } from '../UserService.js';
import { checkPermissions } from '../AuthService.js';
import { PERMISSIONS } from '@takaro/auth';
import { PlayerService } from '../PlayerService.js';
import { PlayerOnGameServerService } from '../PlayerOnGameserverService.js';
import { GameServerService } from '../GameServerService.js';
import { EVENT_TYPES, EventCreateDTO, EventService } from '../EventService.js';
import {
  TakaroEventShopOrderCreated,
  TakaroEventShopListingCreated,
  TakaroEventShopListingDeleted,
  TakaroEventShopListingUpdated,
  TakaroEventShopOrderStatusChanged,
} from '@takaro/modules';

@traceableClass('service:shopListing')
export class ShopListingService extends TakaroService<
  ShopListingModel,
  ShopListingOutputDTO,
  ShopListingCreateDTO,
  ShopListingUpdateDTO
> {
  private eventService = new EventService(this.domainId);
  get repo() {
    return new ShopListingRepo(this.domainId);
  }

  get orderRepo() {
    return new ShopOrderRepo(this.domainId);
  }

  private async checkIfOrderBelongsToUser(order: ShopOrderOutputDTO) {
    const userId = ctx.data.user;
    if (!userId) throw new errors.UnauthorizedError();

    const belongsToUser = userId && order.userId === userId;

    if (!belongsToUser) {
      const userService = new UserService(this.domainId);
      const user = await userService.findOne(userId);
      const userHasHighPrivileges = checkPermissions([PERMISSIONS.MANAGE_SHOP_ORDERS], user);

      if (!userHasHighPrivileges) {
        this.log.warn(`User ${userId} tried to access order ${order.id} that does not belong to them`, {
          orderId: order.id,
          userId,
        });
        throw new errors.NotFoundError('Shop order not found');
      }
    }
  }

  async find(filters: ITakaroQuery<ShopListingOutputDTO>): Promise<PaginatedOutput<ShopListingOutputDTO>> {
    const listings = await this.repo.find(filters);
    return listings;
  }

  async findOne(id: string): Promise<ShopListingOutputDTO> {
    const listing = await this.repo.findOne(id);
    if (!listing) throw new errors.NotFoundError(`Shop listing with id ${id} not found`);
    return listing;
  }

  async create(item: ShopListingCreateDTO): Promise<ShopListingOutputDTO> {
    const created = await this.repo.create(item);

    await this.eventService.create(
      new EventCreateDTO({
        eventName: EVENT_TYPES.SHOP_LISTING_CREATED,
        gameserverId: created.gameServerId,
        meta: new TakaroEventShopListingCreated({
          id: created.id,
        }),
      })
    );

    return created;
  }

  async update(id: string, item: ShopListingUpdateDTO): Promise<ShopListingOutputDTO> {
    const updated = await this.repo.update(id, item);

    await this.eventService.create(
      new EventCreateDTO({
        eventName: EVENT_TYPES.SHOP_LISTING_UPDATED,
        gameserverId: updated.gameServerId,
        meta: new TakaroEventShopListingUpdated({
          id: updated.id,
        }),
      })
    );

    return updated;
  }

  async delete(id: string): Promise<string> {
    await this.repo.delete(id);

    await this.eventService.create(
      new EventCreateDTO({
        eventName: EVENT_TYPES.SHOP_LISTING_DELETED,
        gameserverId: id,
        meta: new TakaroEventShopListingDeleted({
          id,
        }),
      })
    );

    return id;
  }

  async findOrders(filters: ITakaroQuery<ShopOrderOutputDTO>): Promise<PaginatedOutput<ShopOrderOutputDTO>> {
    const userId = ctx.data.user;
    if (!userId) throw new errors.UnauthorizedError();
    const userService = new UserService(this.domainId);
    const user = await userService.findOne(userId);
    const userHasHighPrivileges = checkPermissions([PERMISSIONS.MANAGE_SHOP_ORDERS], user);

    if (!userHasHighPrivileges) {
      if (!filters.filters) filters.filters = {};
      filters.filters.userId = [userId];
    }

    const orders = await this.orderRepo.find(filters);
    return orders;
  }

  async findOneOrder(id: string): Promise<ShopOrderOutputDTO> {
    const order = await this.orderRepo.findOne(id);
    if (!order) throw new errors.NotFoundError(`Shop order with id ${id} not found`);
    await this.checkIfOrderBelongsToUser(order);
    return order;
  }

  async createOrder(listingId: string, amount: number): Promise<ShopOrderOutputDTO> {
    const userId = ctx.data.user;
    if (!userId) throw new errors.UnauthorizedError();

    const userService = new UserService(this.domainId);
    const user = await userService.findOne(userId);

    if (!user.playerId)
      throw new errors.BadRequestError(
        'You have not linked your account to a player yet. Please link your account to a player first.'
      );

    const listing = await this.findOne(listingId);
    const gameServerId = listing.gameServerId;

    const playerService = new PlayerService(this.domainId);
    const { pogs } = await playerService.resolveFromId(user.playerId, gameServerId);
    const pog = pogs.find((pog) => pog.gameServerId === gameServerId);
    if (!pog) throw new errors.BadRequestError('You have not logged in to the game server yet.');

    const playerOnGameServerService = new PlayerOnGameServerService(this.domainId);
    await playerOnGameServerService.deductCurrency(pog.id, listing.price * amount);

    const order = await this.orderRepo.create(new ShopOrderCreateInternalDTO({ listingId, userId, amount }));

    await this.eventService.create(
      new EventCreateDTO({
        eventName: EVENT_TYPES.SHOP_ORDER_CREATED,
        gameserverId: gameServerId,
        meta: new TakaroEventShopOrderCreated({
          id: order.id,
        }),
      })
    );

    return order;
  }

  async claimOrder(orderId: string): Promise<ShopOrderOutputDTO> {
    const userId = ctx.data.user;
    if (!userId) throw new errors.UnauthorizedError();

    const order = await this.orderRepo.findOne(orderId);
    if (!order) throw new errors.NotFoundError(`Shop order with id ${orderId} not found`);
    await this.checkIfOrderBelongsToUser(order);
    if (order.status !== ShopOrderStatus.PAID)
      throw new errors.BadRequestError(`Can only claim paid, unclaimed orders. Current status: ${order.status}`);

    const userService = new UserService(this.domainId);
    const user = await userService.findOne(userId);

    if (!user.playerId)
      throw new errors.BadRequestError(
        'You have not linked your account to a player yet. Please link your account to a player first.'
      );

    const listing = await this.findOne(order.listingId);
    const gameServerId = listing.gameServerId;

    const playerService = new PlayerService(this.domainId);
    const { pogs } = await playerService.resolveFromId(user.playerId, gameServerId);
    const pog = pogs.find((pog) => pog.gameServerId === gameServerId);
    if (!pog) throw new errors.BadRequestError('You have not logged in to the game server yet.');
    if (!pog.online)
      throw new errors.BadRequestError(
        'You must be online in the game server to claim the order. If you have just logged in, please wait a few seconds and try again.'
      );

    const gameServerService = new GameServerService(this.domainId);
    if (listing.item) {
      await gameServerService.giveItem(gameServerId, pog.playerId, listing.item.code, order.amount, 0);
    }

    const updatedOrder = await this.orderRepo.update(
      orderId,
      new ShopOrderUpdateDTO({ status: ShopOrderStatus.COMPLETED })
    );

    await this.eventService.create(
      new EventCreateDTO({
        eventName: EVENT_TYPES.SHOP_ORDER_STATUS_CHANGED,
        gameserverId: gameServerId,
        meta: new TakaroEventShopOrderStatusChanged({
          id: updatedOrder.id,
          status: ShopOrderStatus.COMPLETED,
        }),
      })
    );

    return updatedOrder;
  }

  async cancelOrder(orderId: string): Promise<ShopOrderOutputDTO> {
    const order = await this.orderRepo.findOne(orderId);
    if (!order) throw new errors.NotFoundError(`Shop order with id ${orderId} not found`);
    await this.checkIfOrderBelongsToUser(order);
    if (order.status !== ShopOrderStatus.PAID)
      throw new errors.BadRequestError(
        `Can only cancel paid orders that weren't claimed yet. Current status: ${order.status}`
      );
    const updatedOrder = await this.orderRepo.update(
      orderId,
      new ShopOrderUpdateDTO({ status: ShopOrderStatus.CANCELED })
    );

    const listing = await this.findOne(order.listingId);
    const gameServerId = listing.gameServerId;

    await this.eventService.create(
      new EventCreateDTO({
        eventName: EVENT_TYPES.SHOP_ORDER_STATUS_CHANGED,
        gameserverId: gameServerId,
        meta: new TakaroEventShopOrderStatusChanged({
          id: updatedOrder.id,
          status: ShopOrderStatus.CANCELED,
        }),
      })
    );

    return updatedOrder;
  }
}
