import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { EventOutputDTOEventNameEnum as EventName } from '@takaro/apiclient';
import { GameServerSelectQueryField, PlayerSelectQueryField, EventNameSelectField } from 'components/selects';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DateRangePicker, Button, styled } from '@takaro/lib-components';
import { ModuleSelectQueryField } from 'components/selects/ModuleSelectQueryField';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto 0.5fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['1']};
`;

interface EventFilterProps {
  initialSelectedValues: {
    playerIds?: string[];
    gameServerIds?: string[];
    eventNames?: EventName[];
    dateRange?: { start?: string; end?: string };
    moduleIds?: string[];
  };
  onSubmit: (data: EventFilterInputs) => void;
  isLoading: boolean;
  isLive?: boolean;
}

export const eventFilterSchema = z.object({
  dateRange: z
    .object({
      start: z.string().optional().catch(undefined),
      end: z.string().optional().catch(undefined),
    })
    .optional()
    .catch(undefined),
  playerIds: z.array(z.string()).optional().default([]),
  gameServerIds: z.array(z.string()).optional().default([]),
  moduleIds: z.array(z.string()).optional().default([]),
  eventNames: z.array(z.nativeEnum(EventName)).optional().default([]),
});
export type EventFilterInputs = z.infer<typeof eventFilterSchema>;

export const EventFilter: FC<EventFilterProps> = ({ initialSelectedValues, onSubmit, isLoading, isLive }) => {
  console.log('defaultvalues', initialSelectedValues);
  const { control, handleSubmit, formState } = useForm<EventFilterInputs>({
    mode: 'onSubmit',
    resolver: zodResolver(eventFilterSchema),
    values: {
      dateRange: initialSelectedValues?.dateRange ?? { start: undefined, end: undefined },
      playerIds: initialSelectedValues?.playerIds ?? [],
      gameServerIds: initialSelectedValues.gameServerIds ?? [],
      eventNames: initialSelectedValues.eventNames ?? [],
      moduleIds: initialSelectedValues.moduleIds ?? [],
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <PlayerSelectQueryField
        multiple={true}
        loading={isLoading}
        name="playerIds"
        canClear={true}
        control={control}
        label="Players"
        initialValues={initialSelectedValues.playerIds}
      />
      <GameServerSelectQueryField
        multiple={true}
        name="gameServerIds"
        canClear={true}
        control={control}
        label="Gameservers"
        loading={isLoading}
        initialValues={initialSelectedValues.gameServerIds}
      />
      <ModuleSelectQueryField
        multiple={true}
        name="moduleIds"
        canClear={true}
        control={control}
        loading={isLoading}
        initialValues={initialSelectedValues.moduleIds}
      />
      <EventNameSelectField multiple={true} name="eventNames" canClear={true} control={control} label="Event names" />
      <DateRangePicker
        control={control}
        name="dateRange"
        id="event-daterange-picker"
        disabled={isLive}
        loading={isLoading}
        label="Interval"
      />
      <Button disabled={!formState.isDirty} text="Apply filters" type="submit" fullWidth />
    </Form>
  );
};
