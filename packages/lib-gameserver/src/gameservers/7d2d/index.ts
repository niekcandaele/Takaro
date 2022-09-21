import { logger } from '@takaro/logger';
import { IGameEventEmitter } from '../../interfaces/eventEmitter';
import { IGamePlayer } from '../../interfaces/GamePlayer';
import { IGameServer, IServerInfo } from '../../interfaces/GameServer';
import { SevenDaysToDieEmitter } from './emitter';

export class SevenDaysToDie implements IGameServer {
  private logger = logger('7D2D');

  async getPlayer(id: string): Promise<IGamePlayer | null> {
    this.logger.debug('getPlayer', id);
    return null;
  }
  async executeCommand(command: string): Promise<string> {
    return command;
  }
  async testReachability(): Promise<IServerInfo> {
    return { connectable: true };
  }

  async getPlayers(): Promise<IGamePlayer[]> {
    return [];
  }

  getEventEmitter(): IGameEventEmitter {
    const emitter = new SevenDaysToDieEmitter();
    return emitter;
  }
}
