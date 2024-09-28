import { LineChart, Card, styled, Loading, QuestionTooltip, GeoMercator, Chip } from '@takaro/lib-components';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { DateTime } from 'luxon';
import {
  PlayersOnlineStatsQueryOptions,
  LatencyStatsQueryOptions,
  EventsCountQueryOptions,
  CountriesStatsQueryOptions,
} from 'queries/stats';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { TimePeriodSelect } from 'components/selects';
import { EventsCountInputDTOEventNameEnum } from '@takaro/apiclient';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  grid-template-rows: 500px;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Route = createFileRoute('/_auth/gameserver/$gameServerId/dashboard/statistics')({
  component: Component,
});

function Component() {
  const { gameServerId } = Route.useParams();
  const { control } = useForm({
    defaultValues: {
      period: 'last24Hours',
    },
  });
  const selectedPeriod = useWatch({ control, name: 'period' });
  const { startDate, now } = useMemo(() => {
    let startDate: string | null;

    switch (selectedPeriod) {
      case 'last24Hours':
        startDate = DateTime.now().minus({ days: 1 }).toISO();
        break;
      case 'last7Days':
        startDate = DateTime.now().minus({ days: 7 }).toISO();
        break;
      case 'last30Days':
        startDate = DateTime.now().minus({ days: 30 }).toISO();
        break;
      case 'last90Days':
        startDate = DateTime.now().minus({ days: 90 }).toISO();
        break;
      default:
        startDate = null;
    }

    if (startDate === null) {
      throw new Error('startDate is undefined or null');
    }

    const now = DateTime.now().toISO();

    if (now === null) {
      throw new Error('Could not get current time');
    }

    return { startDate, now };
  }, [selectedPeriod]);

  const { data: countryStats } = useQuery(CountriesStatsQueryOptions({ gameServerId }));
  const { data: playersOnlineData } = useQuery(PlayersOnlineStatsQueryOptions(gameServerId, startDate, now));
  const { data: latencyData } = useQuery(LatencyStatsQueryOptions(gameServerId, startDate, now));
  const { data: chatMessagesData } = useQuery(
    EventsCountQueryOptions({
      gameServerId,
      sumBy: ['gameserver'],
      startDate,
      endDate: now,
      eventName: EventsCountInputDTOEventNameEnum.ChatMessage,
      bucketStep: '1h',
    }),
  );

  if (!playersOnlineData || !latencyData || !chatMessagesData || !countryStats) {
    return <Loading />;
  }
  return (
    <>
      <div style={{ width: '200px', marginLeft: 'auto' }}>
        <TimePeriodSelect control={control} name="period" />
      </div>
      <Container>
        <Card variant="outline">
          <Card.Title label="Players online">
            <QuestionTooltip>Number of players online on the server</QuestionTooltip>
          </Card.Title>
          <div style={{ position: 'relative', height: '425px' }}>
            <LineChart
              name="Players online"
              data={playersOnlineData.values}
              xAccessor={(d) => new Date(d[0] * 1000)}
              yAccessor={(d) => d[1]}
              curveType="curveStep"
            />
          </div>
        </Card>

        <Card variant="outline">
          <Card.Title label="Latency">
            <QuestionTooltip>Roundtrip time between Takaro and your server in ms</QuestionTooltip>
          </Card.Title>
          <div style={{ position: 'relative', height: '425px' }}>
            <LineChart
              name="Latency"
              data={latencyData.values}
              xAccessor={(d) => new Date(d[0] * 1000)}
              yAccessor={(d) => d[1]}
              curveType="curveStep"
            />
          </div>
        </Card>

        {/*
        <StatCard variant="outline">
          <StatCard.Title label="Chat Messages">
            <QuestionTooltip>How many chat messages were sent per hour</QuestionTooltip>
          </StatCard.Title>
          <LineChart
            name="Chat Messages"
            data={chatMessagesData.values}
            xAccessor={(d) => new Date(d[0] * 1000)}
            yAccessor={(d) => d[1]}
            curveType="curveStep"
          />
        </StatCard>
        */}
        <Card variant="outline" style={{ gridColumn: '1 / 3' }}>
          <Card.Title label="Player Demographics">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Chip variant="outline" color="warning" label="Beta" />
              <QuestionTooltip>Shows where your players are from</QuestionTooltip>
            </div>
          </Card.Title>
          <Card.Body>
            <div style={{ width: '100%', height: '700px' }}>
              <GeoMercator
                name="Player countries"
                xAccessor={(d) => d.country}
                yAccessor={(d) => d.playerCount}
                tooltipAccessor={(d) => `${d.country}:${d.playerCount}`}
                data={countryStats}
                allowZoomAndDrag={false}
                showZoomControls={false}
              />
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
