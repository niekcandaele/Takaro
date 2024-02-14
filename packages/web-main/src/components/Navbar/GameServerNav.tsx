import { FC, useMemo } from 'react';
import { NavbarLink, renderLink } from '.';
import { GlobalGameServerSelect } from './GlobalGameServerSelect';
import { Button } from '@takaro/lib-components';
import { PERMISSIONS } from '@takaro/apiclient';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import {
  AiOutlineAppstore as DashboardIcon,
  AiOutlineSetting as SettingsIcon,
  AiOutlineFunction as ModulesIcon,
  AiOutlinePlus as AddServerIcon,
} from 'react-icons/ai';
import { gameServersOptions } from 'queries/gameservers';
import { Nav, NoServersCallToAction } from './style';
import { useQuery } from '@tanstack/react-query';

export const GameServerNav: FC = () => {
  const navigate = useNavigate();
  const { data: gameservers } = useQuery(gameServersOptions());
  const { gameServerId } = getRouteApi('/_auth').useSearch();

  console.log('here', gameServerId);

  const gameServerLinks: NavbarLink[] = useMemo(() => {
    return [
      {
        label: 'Dashboard',
        linkProps: {
          to: '/gameserver/$gameServerId/dashboard/overview',
          params: { gameServerId: gameServerId },
        },
        icon: <DashboardIcon />,
        requiredPermissions: [PERMISSIONS.ReadGameservers],
      },
      {
        label: 'Modules',
        linkProps: {
          to: '/gameserver/$gameServerId/modules',
          params: { gameServerId: gameServerId },
        },
        icon: <ModulesIcon />,
        requiredPermissions: [PERMISSIONS.ReadGameservers, PERMISSIONS.ReadModules],
      },
      {
        label: 'Settings',
        linkProps: {
          to: '/gameserver/$gameServerId/settings',
          params: { gameServerId: gameServerId },
        },
        icon: <SettingsIcon />,
        requiredPermissions: [PERMISSIONS.ReadSettings, PERMISSIONS.ReadGameservers],
      },
    ];
  }, [gameServerId]);

  return (
    <Nav data-testid="server-nav">
      {gameServerId && gameservers && gameservers.length > 0 ? (
        <>
          <h3>Game Server</h3>
          {gameservers.length > 1 && <GlobalGameServerSelect currentSelectedGameServerId={gameServerId} />}
          {gameServerLinks.map((link) => renderLink(link))}
        </>
      ) : (
        <>
          <h3>Game Server</h3>
          <NoServersCallToAction
            initial={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>Step into the world of Takaro by adding your first server!</p>
            <Button
              icon={<AddServerIcon />}
              fullWidth
              onClick={() => navigate({ to: '/gameservers/create' })}
              text="Add a server"
            />
          </NoServersCallToAction>
        </>
      )}
    </Nav>
  );
};
