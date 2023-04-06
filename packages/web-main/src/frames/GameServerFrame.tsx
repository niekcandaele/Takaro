import { FC } from 'react';
import { motion } from 'framer-motion';
import { ErrorFallback, LoadingPage, styled } from '@takaro/lib-components';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header';
import { Navbar, NavbarLink } from 'components/Navbar';
import { Page } from '../pages/Page';
import {
  AiOutlineAppstore as DashboardIcon,
  AiOutlineSetting as SettingsIcon,
  AiOutlineFunction as ModulesIcon,
  AiOutlineBook as DocumentationIcon,
} from 'react-icons/ai';
import { PATHS } from 'paths';
import { useParams, redirect, useOutletContext } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';
import { useGameServer } from 'queries/gameservers';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const ContentContainer = styled(motion.div)`
  background-color: ${({ theme }): string => theme.colors.background};
  width: 100%;
  opacity: 0;
  overflow-y: auto;
`;

export function useGameServerOutletContext() {
  return useOutletContext<{ gameServerId: string }>();
}

export const ServerFrame: FC = () => {
  const { serverId } = useParams();

  // in case /server/**NOTHING**
  if (!serverId) {
    redirect(PATHS.gameServers.overview());
  }

  const { isLoading, isError } = useGameServer(serverId!);

  const links: NavbarLink[] = [
    {
      label: 'Server Dashboard',
      // If serverId is not valid it will be directed by the failed requests.
      path: PATHS.gameServer.dashboard(serverId!),
      icon: <DashboardIcon />,
    },
    {
      label: 'Server Modules',
      path: PATHS.gameServer.modules(serverId!),
      icon: <ModulesIcon />,
    },
    {
      label: 'Server Settings',
      path: PATHS.gameServer.settings(serverId!),
      icon: <SettingsIcon />,
    },
    {
      label: 'Documentation',
      path: 'https://docs.takaro.io',
      icon: <DocumentationIcon />,
      external: true,
    },
  ];

  return (
    <Container>
      <Navbar links={links} />
      <ContentContainer
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Header />
        <Page>
          <ErrorBoundary fallback={<ErrorFallback />}>
            {isLoading && <LoadingPage />}
            {isError ? (
              <div>Server not found</div>
            ) : (
              <Outlet context={{ gameServerId: serverId }} />
            )}
          </ErrorBoundary>
        </Page>
      </ContentContainer>
    </Container>
  );
};
