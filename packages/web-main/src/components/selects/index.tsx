import { SelectFieldProps } from '@takaro/lib-components';

// TODO: implement multiSelect
export type CustomSelectProps = Omit<SelectFieldProps, 'render' | 'children' | 'enableFilter' | 'multiSelect'>;

export { GameServerSelect } from './GameServerSelect';
export { RolesSelect } from './RolesSelect';
export { PlayerSelect } from './PlayerSelect';
export { ModuleSelect } from './ModuleSelect';
export { TimePeriodSelect } from './TimePeriodSelect';
