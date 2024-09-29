import { queryOptions } from '@tanstack/react-query';
import { getApiClient } from 'util/getApiClient';
import { ActivityInputDTO, EventsCountInputDTO, StatsOutputDTO } from '@takaro/apiclient';
import { AxiosError } from 'axios';
import { queryParamsToArray } from './util';

type StatsOutput = { values: Array<[number, number]> };

export const statsKeys = {
  all: ['stats'] as const,
  ping: (playerId: string, gameServerId: string, startDate?: string, endDate?: string) =>
    [...statsKeys.all, 'ping', playerId, gameServerId, startDate, endDate] as const,
  currency: (playerId: string, gameServerId: string, startDate?: string, endDate?: string) =>
    [...statsKeys.all, 'currency', playerId, gameServerId, startDate, endDate] as const,
  latency: (gameServerId: string, startDate?: string, endDate?: string) =>
    [...statsKeys.all, 'latency', gameServerId, startDate, endDate] as const,
  playersOnline: (gameServerId?: string, startDate?: string, endDate?: string) =>
    [...statsKeys.all, 'players-online', gameServerId, startDate, endDate] as const,
  activity: (gameServerId?: string) => [...statsKeys.all, 'activity', gameServerId] as const,
  countries: (gameServerId: string) => [...statsKeys.all, 'countries', gameServerId] as const,
};

export const PingStatsQueryOptions = (playerId: string, gameServerId: string, startDate?: string, endDate?: string) => {
  return queryOptions<StatsOutputDTO, AxiosError<StatsOutputDTO>, StatsOutput>({
    queryKey: statsKeys.ping(playerId, gameServerId, startDate, endDate),
    queryFn: async () =>
      (await getApiClient().stats.statsControllerGetPingStats(gameServerId, playerId, startDate, endDate)).data.data,
  });
};

export const CurrencyStatsQueryOptions = (
  playerId: string,
  gameServerId: string,
  startDate?: string,
  endDate?: string,
) => {
  return queryOptions<StatsOutputDTO, AxiosError<StatsOutputDTO>, StatsOutput>({
    queryKey: statsKeys.currency(playerId, gameServerId, startDate, endDate),
    queryFn: async () =>
      (await getApiClient().stats.statsControllerGetCurrencyStats(gameServerId, playerId, startDate, endDate)).data
        .data,
  });
};

export const LatencyStatsQueryOptions = (gameServerId: string, startDate?: string, endDate?: string) => {
  return queryOptions<StatsOutputDTO, AxiosError<StatsOutputDTO>, StatsOutput>({
    queryKey: statsKeys.latency(gameServerId, startDate, endDate),
    queryFn: async () =>
      (await getApiClient().stats.statsControllerGetLatencyStats(gameServerId, startDate, endDate)).data.data,
  });
};

export const PlayersOnlineStatsQueryOptions = (gameServerId?: string, startDate?: string, endDate?: string) => {
  return queryOptions<StatsOutputDTO, AxiosError<StatsOutputDTO>, StatsOutput>({
    queryKey: statsKeys.playersOnline(gameServerId, startDate, endDate),
    queryFn: async () =>
      (await getApiClient().stats.statsControllerGetPlayerOnlineStats(gameServerId, startDate, endDate)).data.data,
  });
};

export const EventsCountQueryOptions = (options: EventsCountInputDTO) => {
  return queryOptions<StatsOutputDTO, AxiosError<StatsOutputDTO>, StatsOutput>({
    queryKey: ['events', options],
    queryFn: async () =>
      (
        await getApiClient().stats.statsControllerGetEventsCount(
          options.eventName,
          options.bucketStep,
          options.sumBy,
          options.gameServerId,
          options.moduleId,
          options.playerId,
          options.userId,
          options.startDate,
          options.endDate,
        )
      ).data.data,
  });
};

export const ActivityStatsQueryOptions = (options: ActivityInputDTO) => {
  return queryOptions<StatsOutputDTO, AxiosError<StatsOutputDTO>, StatsOutput>({
    queryKey: [statsKeys.activity(options.gameServerId), queryParamsToArray(options)],
    queryFn: async () =>
      (
        await getApiClient().stats.statsControllerGetActivityStats(
          options.timeType,
          options.dataType,
          options.gameServerId,
          options.startDate,
          options.endDate,
        )
      ).data.data,
  });
};

type CountryValue = { country: string; playerCount: number };
export const CountriesStatsQueryOptions = ({ gameServerId }: { gameServerId: string }) => {
  return queryOptions<CountryValue[], AxiosError<CountryValue[]>, CountryValue[]>({
    queryKey: [statsKeys.countries(gameServerId)],
    queryFn: async () =>
      (await getApiClient().stats.statsControllerGetCountryStats([gameServerId])).data.data.values as CountryValue[],
  });
};
