import { TakaroService } from './Base.js';

import { TakaroDTO, errors, traceableClass } from '@takaro/util';
import { TakaroModel } from '@takaro/db';
import { ITakaroRepo, PaginatedOutput } from '../db/base.js';
import { Axios } from 'axios';
import { IsObject } from 'class-validator';

export class StatsOutputDTO extends TakaroDTO<StatsOutputDTO> {
  @IsObject()
  values: Array<[number, number]> = [];
}

@traceableClass('service:stats')
export class StatsService extends TakaroService<TakaroModel, TakaroDTO<void>, TakaroDTO<void>, TakaroDTO<void>> {
  private promClient = new Axios({
    baseURL: 'http://prometheus:9090',
  });
  get repo(): ITakaroRepo<TakaroModel, TakaroDTO<void>, TakaroDTO<void>, TakaroDTO<void>> {
    // Dummy since we're not talking to our DB here
    return {} as ITakaroRepo<TakaroModel, TakaroDTO<void>, TakaroDTO<void>, TakaroDTO<void>>;
  }
  async find(): Promise<PaginatedOutput<TakaroDTO<void>>> {
    throw new errors.NotImplementedError();
  }
  async findOne(): Promise<TakaroDTO<void>> {
    throw new errors.NotImplementedError();
  }
  async create(): Promise<TakaroDTO<void>> {
    throw new errors.NotImplementedError();
  }
  async update(): Promise<TakaroDTO<void>> {
    throw new errors.NotImplementedError();
  }
  async delete(): Promise<string> {
    throw new errors.NotImplementedError();
  }

  private handleTimestamps(startDate?: string, endDate?: string) {
    const thirtyMinutesAgo = new Date(new Date().getTime() - 30 * 60 * 1000);
    const startTime = (startDate ? new Date(startDate).valueOf() : thirtyMinutesAgo.valueOf()) / 1000;
    const endTime = (endDate ? new Date(endDate).valueOf() : new Date().valueOf()) / 1000;
    // Calculate step, we always return 100 datapoints (or less) right now
    const step = Math.max(1, Math.floor((endTime - startTime) / 100));
    return { startTime, endTime, step };
  }

  private async prometheusQuery(query: string, startDate?: string, endDate?: string) {
    const { startTime, endTime, step } = this.handleTimestamps(startDate, endDate);

    const response = await this.promClient.get('/api/v1/query_range', {
      params: {
        query,
        start: startTime,
        end: endTime,
        step,
      },
    });

    const parsed = JSON.parse(response.data);

    if (parsed.status !== 'success') throw new errors.InternalServerError();
    if (parsed.data.result.length === 0) throw new errors.NotFoundError();

    return parsed.data.result[0].values;
  }

  async getPing(playerId: string, gameserverId: string, startTime?: string, endTime?: string) {
    const data = await this.prometheusQuery(
      `takaro_player_ping{domain="${this.domainId}", player="${playerId}", gameserver="${gameserverId}"}`,
      startTime,
      endTime
    );
    return { values: data };
  }

  async getCurrency(playerId: string, gameserverId: string, startTime?: string, endTime?: string) {
    const data = await this.prometheusQuery(
      `takaro_player_currency{domain="${this.domainId}", player="${playerId}", gameserver="${gameserverId}"}`,
      startTime,
      endTime
    );
    return { values: data };
  }

  async getPlayersOnline(gameserverId?: string, startTime?: string, endTime?: string) {
    if (gameserverId) {
      const data = await this.prometheusQuery(
        `takaro_players_online{domain="${this.domainId}", gameserver="${gameserverId}"}`,
        startTime,
        endTime
      );
      return { values: data };
    } else {
      const data = await this.prometheusQuery(
        `sum by(domain) (takaro_players_online{domain="${this.domainId}"})`,
        startTime,
        endTime
      );
      return { values: data };
    }
  }
}
