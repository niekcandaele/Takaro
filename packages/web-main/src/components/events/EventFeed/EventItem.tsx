import { FC } from 'react';
import { styled } from '@takaro/lib-components';
import { EventDetail } from './EventDetail';
import { DateTime } from 'luxon';
import { EventOutputDTO, EventOutputDTOEventNameEnum } from '@takaro/apiclient';
import { CountryCodeToEmoji } from 'components/CountryCodeToEmoji';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
`;

const EventType = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['0_5']};

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    color: ${({ theme }) => theme.colors.textAlt};
  }
`;

const ListItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['7']};
  margin-left: ${({ theme }) => theme.spacing['2']};
`;

const Data = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 2fr;
`;

const DataItem = styled.div`
  p:first-child {
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.textAlt};
  }
`;

const Circle = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  margin-top: 5px;
  left: -6px;

  position: absolute;
  border: 1px solid #474747;

  background-color: ${({ theme }) => theme.colors.textAlt};
`;
const EventProperty: FC<{ name: string; value: unknown }> = ({ name, value }) => {
  const val = (value as string) === '' ? '-' : value;
  return (
    <DataItem>
      <p>{name}</p>
      <p>{val as string}</p>
    </DataItem>
  );
};

export type EventItemProps = {
  event: EventOutputDTO;
  onDetailClick: () => void;
};

export const EventItem: FC<EventItemProps> = ({ event }) => {
  const timestamp = Date.parse(event.createdAt);
  const timeAgo = DateTime.fromMillis(timestamp).toRelative();

  const meta = event.meta as any;

  let properties = <></>;

  switch (event.eventName) {
    case EventOutputDTOEventNameEnum.ChatMessage:
      properties = (
        <>
          <EventProperty name="gameserver" value={event.gameServer?.name} />
          <EventProperty name="player" value={event.player?.name} />
          <EventProperty name="message" value={meta?.message} />
        </>
      );
      break;
    case EventOutputDTOEventNameEnum.CommandExecuted:
      properties = (
        <>
          <EventProperty name="module" value={event.module?.name} />
          <EventProperty name="command" value={meta.command?.name} />
          {Object.values(meta.command?.arguments).length ? (
            <EventProperty name="args" value={JSON.stringify(meta.command?.arguments)} />
          ) : null}
        </>
      );
      break;
    case EventOutputDTOEventNameEnum.HookExecuted:
    case EventOutputDTOEventNameEnum.CronjobExecuted:
      properties = (
        <>
          <EventProperty name="module" value={event?.module?.name} />
          <EventProperty name="success" value={`${meta.result?.success}`} />
        </>
      );
      break;
    case EventOutputDTOEventNameEnum.PlayerNewIpDetected:
      properties = (
        <>
          <EventProperty name="gameserver" value={event.gameServer?.name} />
          <EventProperty
            name="country"
            value={
              <>
                <CountryCodeToEmoji countryCode={(event.meta as any).new.country} />
                {(event.meta as any).new.country}
              </>
            }
          />

          <EventProperty name="player" value={event.player?.name} />
        </>
      );
      break;
    case EventOutputDTOEventNameEnum.PlayerConnected:
    case EventOutputDTOEventNameEnum.PlayerDisconnected:
    case EventOutputDTOEventNameEnum.PlayerDeath:
      properties = (
        <>
          <EventProperty name="gameserver" value={event.gameServer?.name} />
          <EventProperty name="game" value={event.gameServer?.type} />
          <EventProperty name="player" value={event.player?.name} />
        </>
      );
      break;
    case EventOutputDTOEventNameEnum.EntityKilled:
      properties = (
        <>
          <EventProperty name="gameserver" value={event.gameServer?.name} />
          <EventProperty name="game" value={event.gameServer?.type} />
          <EventProperty name="player" value={event.player?.name} />
          {event.meta && 'weapon' in event.meta ? (
            <EventProperty name="weapon" value={(event.meta as any).weapon} />
          ) : null}
          {event.meta && 'entity' in event.meta ? (
            <EventProperty name="entity" value={(event.meta as any).entity} />
          ) : null}
        </>
      );
      break;
    case EventOutputDTOEventNameEnum.CurrencyAdded:
    case EventOutputDTOEventNameEnum.CurrencyDeducted:
      properties = (
        <>
          <EventProperty name="gameserver" value={event.gameServer?.name} />
          <EventProperty name="game" value={event.gameServer?.type} />
          <EventProperty name="player" value={event.player?.name} />
        </>
      );
      break;
    case EventOutputDTOEventNameEnum.SettingsSet:
      properties = (
        <>
          <EventProperty name="user" value={event.user?.name} />
          {event.gameServer ? <EventProperty name="gameserver" value={event.gameServer?.name} /> : null}
        </>
      );
      break;
    case EventOutputDTOEventNameEnum.RoleCreated:
    case EventOutputDTOEventNameEnum.RoleDeleted:
    case EventOutputDTOEventNameEnum.RoleUpdated:
      properties = (
        <>
          <EventProperty name="user" value={event.user?.name} />
          {event.meta && 'role' in event.meta && 'name' in (event.meta as any).role ? (
            <EventProperty name="role" value={(event.meta as any).role.name} />
          ) : null}
        </>
      );
      break;
  }

  return (
    <ListItem>
      <Circle />
      <Header>
        <EventType>
          <p>{event.eventName}</p>
          <p>{timeAgo}</p>
        </EventType>
        <EventDetail eventType={event.eventName} metaData={event} />
      </Header>
      <Data>{properties}</Data>
    </ListItem>
  );
};
