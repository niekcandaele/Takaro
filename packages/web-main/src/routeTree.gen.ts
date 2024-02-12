/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as LogoutReturnImport } from './routes/logout-return';
import { Route as LoginImport } from './routes/login';
import { Route as ForbiddenImport } from './routes/forbidden';
import { Route as AuthImport } from './routes/_auth';
import { Route as StudioModuleIdImport } from './routes/studio.$moduleId';
import { Route as AuthRolesImport } from './routes/_auth/roles';
import { Route as AuthModulesImport } from './routes/_auth/modules';
import { Route as AuthLogoutImport } from './routes/_auth/logout';
import { Route as AuthGameserversImport } from './routes/_auth/gameservers';
import { Route as AuthEventsImport } from './routes/_auth/events';
import { Route as AuthDashboardImport } from './routes/_auth/dashboard';
import { Route as AuthSettingsImport } from './routes/_auth/_settings';
import { Route as AuthVariablesCreateImport } from './routes/_auth/variables.create';
import { Route as AuthUsersUserIdImport } from './routes/_auth/users.$userId';
import { Route as AuthSettingsGameserversImport } from './routes/_auth/settings/gameservers';
import { Route as AuthSettingsDiscordImport } from './routes/_auth/settings/discord';
import { Route as AuthRolesCreateImport } from './routes/_auth/roles.create';
import { Route as AuthPlayerPlayerIdImport } from './routes/_auth/player.$playerId';
import { Route as AuthModulesCreateImport } from './routes/_auth/modules.create';
import { Route as AuthGameserversCreateImport } from './routes/_auth/gameservers.create';
import { Route as AuthGameserverGameServerIdImport } from './routes/_auth/gameserver.$gameServerId';
import { Route as AuthAuthVerificationImport } from './routes/_auth/auth.verification';
import { Route as AuthAuthRecoveryImport } from './routes/_auth/auth.recovery';
import { Route as AuthAuthProfileImport } from './routes/_auth/auth.profile';
import { Route as AuthVariablesUpdateVariableIdImport } from './routes/_auth/variables.update.$variableId';
import { Route as AuthRolesViewRoleIdImport } from './routes/_auth/roles.view.$roleId';
import { Route as AuthRolesUpdateRoleIdImport } from './routes/_auth/roles.update.$roleId';
import { Route as AuthPlayerPlayerIdInventoryImport } from './routes/_auth/player.$playerId/inventory';
import { Route as AuthPlayerPlayerIdGlobalImport } from './routes/_auth/player.$playerId/global';
import { Route as AuthPlayerPlayerIdEventsImport } from './routes/_auth/player.$playerId/events';
import { Route as AuthPlayerPlayerIdEconomyImport } from './routes/_auth/player.$playerId/economy';
import { Route as AuthModulesViewModuleIdImport } from './routes/_auth/modules.view.$moduleId';
import { Route as AuthModulesUpdateModuleIdImport } from './routes/_auth/modules.update.$moduleId';
import { Route as AuthGameserversUpdateGameServerIdImport } from './routes/_auth/gameservers.update.$gameServerId';
import { Route as AuthGameserversCreateImportImport } from './routes/_auth/gameservers.create.import';
import { Route as AuthGameserverGameServerIdSettingsImport } from './routes/_auth/gameserver.$gameServerId/settings';
import { Route as AuthGameserverGameServerIdModulesImport } from './routes/_auth/gameserver.$gameServerId/modules';
import { Route as AuthGameserverGameServerIdDashboardImport } from './routes/_auth/gameserver.$gameServerId/_dashboard';
import { Route as AuthUsersUserIdRoleAssignImport } from './routes/_auth/users.$userId.role.assign';
import { Route as AuthPlayerPlayerIdRoleAssignImport } from './routes/_auth/player.$playerId/role.assign';
import { Route as AuthGameserverGameServerIdDashboardStatisticsImport } from './routes/_auth/gameserver.$gameServerId/dashboard/statistics';
import { Route as AuthGameserverGameServerIdDashboardOverviewImport } from './routes/_auth/gameserver.$gameServerId/dashboard/overview';
import { Route as AuthGameserverGameServerIdDashboardConsoleImport } from './routes/_auth/gameserver.$gameServerId/dashboard/console';
import { Route as AuthGameserverGameServerIdModuleModuleIdInstallImport } from './routes/_auth/gameserver.$gameServerId/module.$moduleId.install';
import { Route as AuthGameserverGameServerIdModuleModuleIdInstallViewImport } from './routes/_auth/gameserver.$gameServerId/module.$moduleId.install.view';

// Create/Update Routes

const LogoutReturnRoute = LogoutReturnImport.update({
  path: '/logout-return',
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any);

const ForbiddenRoute = ForbiddenImport.update({
  path: '/forbidden',
  getParentRoute: () => rootRoute,
} as any);

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any);

const StudioModuleIdRoute = StudioModuleIdImport.update({
  path: '/studio/$moduleId',
  getParentRoute: () => rootRoute,
} as any);

const AuthRolesRoute = AuthRolesImport.update({
  path: '/roles',
  getParentRoute: () => AuthRoute,
} as any);

const AuthModulesRoute = AuthModulesImport.update({
  path: '/modules',
  getParentRoute: () => AuthRoute,
} as any);

const AuthLogoutRoute = AuthLogoutImport.update({
  path: '/logout',
  getParentRoute: () => AuthRoute,
} as any);

const AuthGameserversRoute = AuthGameserversImport.update({
  path: '/gameservers',
  getParentRoute: () => AuthRoute,
} as any);

const AuthEventsRoute = AuthEventsImport.update({
  path: '/events',
  getParentRoute: () => AuthRoute,
} as any);

const AuthDashboardRoute = AuthDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthRoute,
} as any);

const AuthSettingsRoute = AuthSettingsImport.update({
  id: '/_settings',
  getParentRoute: () => AuthRoute,
} as any);

const AuthVariablesCreateRoute = AuthVariablesCreateImport.update({
  path: '/variables/create',
  getParentRoute: () => AuthRoute,
} as any);

const AuthUsersUserIdRoute = AuthUsersUserIdImport.update({
  path: '/users/$userId',
  getParentRoute: () => AuthRoute,
} as any);

const AuthSettingsGameserversRoute = AuthSettingsGameserversImport.update({
  path: '/settings/gameservers',
  getParentRoute: () => AuthRoute,
} as any);

const AuthSettingsDiscordRoute = AuthSettingsDiscordImport.update({
  path: '/settings/discord',
  getParentRoute: () => AuthRoute,
} as any);

const AuthRolesCreateRoute = AuthRolesCreateImport.update({
  path: '/create',
  getParentRoute: () => AuthRolesRoute,
} as any);

const AuthPlayerPlayerIdRoute = AuthPlayerPlayerIdImport.update({
  path: '/player/$playerId',
  getParentRoute: () => AuthRoute,
} as any);

const AuthModulesCreateRoute = AuthModulesCreateImport.update({
  path: '/create',
  getParentRoute: () => AuthModulesRoute,
} as any);

const AuthGameserversCreateRoute = AuthGameserversCreateImport.update({
  path: '/create',
  getParentRoute: () => AuthGameserversRoute,
} as any);

const AuthGameserverGameServerIdRoute = AuthGameserverGameServerIdImport.update({
  path: '/gameserver/$gameServerId',
  getParentRoute: () => AuthRoute,
} as any);

const AuthAuthVerificationRoute = AuthAuthVerificationImport.update({
  path: '/auth/verification',
  getParentRoute: () => AuthRoute,
} as any);

const AuthAuthRecoveryRoute = AuthAuthRecoveryImport.update({
  path: '/auth/recovery',
  getParentRoute: () => AuthRoute,
} as any);

const AuthAuthProfileRoute = AuthAuthProfileImport.update({
  path: '/auth/profile',
  getParentRoute: () => AuthRoute,
} as any);

const AuthVariablesUpdateVariableIdRoute = AuthVariablesUpdateVariableIdImport.update({
  path: '/variables/update/$variableId',
  getParentRoute: () => AuthRoute,
} as any);

const AuthRolesViewRoleIdRoute = AuthRolesViewRoleIdImport.update({
  path: '/view/$roleId',
  getParentRoute: () => AuthRolesRoute,
} as any);

const AuthRolesUpdateRoleIdRoute = AuthRolesUpdateRoleIdImport.update({
  path: '/update/$roleId',
  getParentRoute: () => AuthRolesRoute,
} as any);

const AuthPlayerPlayerIdInventoryRoute = AuthPlayerPlayerIdInventoryImport.update({
  path: '/inventory',
  getParentRoute: () => AuthPlayerPlayerIdRoute,
} as any);

const AuthPlayerPlayerIdGlobalRoute = AuthPlayerPlayerIdGlobalImport.update({
  path: '/global',
  getParentRoute: () => AuthPlayerPlayerIdRoute,
} as any);

const AuthPlayerPlayerIdEventsRoute = AuthPlayerPlayerIdEventsImport.update({
  path: '/events',
  getParentRoute: () => AuthPlayerPlayerIdRoute,
} as any);

const AuthPlayerPlayerIdEconomyRoute = AuthPlayerPlayerIdEconomyImport.update({
  path: '/economy',
  getParentRoute: () => AuthPlayerPlayerIdRoute,
} as any);

const AuthModulesViewModuleIdRoute = AuthModulesViewModuleIdImport.update({
  path: '/view/$moduleId',
  getParentRoute: () => AuthModulesRoute,
} as any);

const AuthModulesUpdateModuleIdRoute = AuthModulesUpdateModuleIdImport.update({
  path: '/update/$moduleId',
  getParentRoute: () => AuthModulesRoute,
} as any);

const AuthGameserversUpdateGameServerIdRoute = AuthGameserversUpdateGameServerIdImport.update({
  path: '/update/$gameServerId',
  getParentRoute: () => AuthGameserversRoute,
} as any);

const AuthGameserversCreateImportRoute = AuthGameserversCreateImportImport.update({
  path: '/import',
  getParentRoute: () => AuthGameserversCreateRoute,
} as any);

const AuthGameserverGameServerIdSettingsRoute = AuthGameserverGameServerIdSettingsImport.update({
  path: '/settings',
  getParentRoute: () => AuthGameserverGameServerIdRoute,
} as any);

const AuthGameserverGameServerIdModulesRoute = AuthGameserverGameServerIdModulesImport.update({
  path: '/modules',
  getParentRoute: () => AuthGameserverGameServerIdRoute,
} as any);

const AuthGameserverGameServerIdDashboardRoute = AuthGameserverGameServerIdDashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => AuthGameserverGameServerIdRoute,
} as any);

const AuthUsersUserIdRoleAssignRoute = AuthUsersUserIdRoleAssignImport.update({
  path: '/role/assign',
  getParentRoute: () => AuthUsersUserIdRoute,
} as any);

const AuthPlayerPlayerIdRoleAssignRoute = AuthPlayerPlayerIdRoleAssignImport.update({
  path: '/role/assign',
  getParentRoute: () => AuthPlayerPlayerIdRoute,
} as any);

const AuthGameserverGameServerIdDashboardStatisticsRoute = AuthGameserverGameServerIdDashboardStatisticsImport.update({
  path: '/dashboard/statistics',
  getParentRoute: () => AuthGameserverGameServerIdRoute,
} as any);

const AuthGameserverGameServerIdDashboardOverviewRoute = AuthGameserverGameServerIdDashboardOverviewImport.update({
  path: '/dashboard/overview',
  getParentRoute: () => AuthGameserverGameServerIdRoute,
} as any);

const AuthGameserverGameServerIdDashboardConsoleRoute = AuthGameserverGameServerIdDashboardConsoleImport.update({
  path: '/dashboard/console',
  getParentRoute: () => AuthGameserverGameServerIdRoute,
} as any);

const AuthGameserverGameServerIdModuleModuleIdInstallRoute =
  AuthGameserverGameServerIdModuleModuleIdInstallImport.update({
    path: '/module/$moduleId/install',
    getParentRoute: () => AuthGameserverGameServerIdRoute,
  } as any);

const AuthGameserverGameServerIdModuleModuleIdInstallViewRoute =
  AuthGameserverGameServerIdModuleModuleIdInstallViewImport.update({
    path: '/view',
    getParentRoute: () => AuthGameserverGameServerIdModuleModuleIdInstallRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      preLoaderRoute: typeof AuthImport;
      parentRoute: typeof rootRoute;
    };
    '/forbidden': {
      preLoaderRoute: typeof ForbiddenImport;
      parentRoute: typeof rootRoute;
    };
    '/login': {
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    '/logout-return': {
      preLoaderRoute: typeof LogoutReturnImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth/_settings': {
      preLoaderRoute: typeof AuthSettingsImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/dashboard': {
      preLoaderRoute: typeof AuthDashboardImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/events': {
      preLoaderRoute: typeof AuthEventsImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/gameservers': {
      preLoaderRoute: typeof AuthGameserversImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/logout': {
      preLoaderRoute: typeof AuthLogoutImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/modules': {
      preLoaderRoute: typeof AuthModulesImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/roles': {
      preLoaderRoute: typeof AuthRolesImport;
      parentRoute: typeof AuthImport;
    };
    '/studio/$moduleId': {
      preLoaderRoute: typeof StudioModuleIdImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth/auth/profile': {
      preLoaderRoute: typeof AuthAuthProfileImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/auth/recovery': {
      preLoaderRoute: typeof AuthAuthRecoveryImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/auth/verification': {
      preLoaderRoute: typeof AuthAuthVerificationImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/gameserver/$gameServerId': {
      preLoaderRoute: typeof AuthGameserverGameServerIdImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/gameservers/create': {
      preLoaderRoute: typeof AuthGameserversCreateImport;
      parentRoute: typeof AuthGameserversImport;
    };
    '/_auth/modules/create': {
      preLoaderRoute: typeof AuthModulesCreateImport;
      parentRoute: typeof AuthModulesImport;
    };
    '/_auth/player/$playerId': {
      preLoaderRoute: typeof AuthPlayerPlayerIdImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/roles/create': {
      preLoaderRoute: typeof AuthRolesCreateImport;
      parentRoute: typeof AuthRolesImport;
    };
    '/_auth/settings/discord': {
      preLoaderRoute: typeof AuthSettingsDiscordImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/settings/gameservers': {
      preLoaderRoute: typeof AuthSettingsGameserversImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/users/$userId': {
      preLoaderRoute: typeof AuthUsersUserIdImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/variables/create': {
      preLoaderRoute: typeof AuthVariablesCreateImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/gameserver/$gameServerId/_dashboard': {
      preLoaderRoute: typeof AuthGameserverGameServerIdDashboardImport;
      parentRoute: typeof AuthGameserverGameServerIdImport;
    };
    '/_auth/gameserver/$gameServerId/modules': {
      preLoaderRoute: typeof AuthGameserverGameServerIdModulesImport;
      parentRoute: typeof AuthGameserverGameServerIdImport;
    };
    '/_auth/gameserver/$gameServerId/settings': {
      preLoaderRoute: typeof AuthGameserverGameServerIdSettingsImport;
      parentRoute: typeof AuthGameserverGameServerIdImport;
    };
    '/_auth/gameservers/create/import': {
      preLoaderRoute: typeof AuthGameserversCreateImportImport;
      parentRoute: typeof AuthGameserversCreateImport;
    };
    '/_auth/gameservers/update/$gameServerId': {
      preLoaderRoute: typeof AuthGameserversUpdateGameServerIdImport;
      parentRoute: typeof AuthGameserversImport;
    };
    '/_auth/modules/update/$moduleId': {
      preLoaderRoute: typeof AuthModulesUpdateModuleIdImport;
      parentRoute: typeof AuthModulesImport;
    };
    '/_auth/modules/view/$moduleId': {
      preLoaderRoute: typeof AuthModulesViewModuleIdImport;
      parentRoute: typeof AuthModulesImport;
    };
    '/_auth/player/$playerId/economy': {
      preLoaderRoute: typeof AuthPlayerPlayerIdEconomyImport;
      parentRoute: typeof AuthPlayerPlayerIdImport;
    };
    '/_auth/player/$playerId/events': {
      preLoaderRoute: typeof AuthPlayerPlayerIdEventsImport;
      parentRoute: typeof AuthPlayerPlayerIdImport;
    };
    '/_auth/player/$playerId/global': {
      preLoaderRoute: typeof AuthPlayerPlayerIdGlobalImport;
      parentRoute: typeof AuthPlayerPlayerIdImport;
    };
    '/_auth/player/$playerId/inventory': {
      preLoaderRoute: typeof AuthPlayerPlayerIdInventoryImport;
      parentRoute: typeof AuthPlayerPlayerIdImport;
    };
    '/_auth/roles/update/$roleId': {
      preLoaderRoute: typeof AuthRolesUpdateRoleIdImport;
      parentRoute: typeof AuthRolesImport;
    };
    '/_auth/roles/view/$roleId': {
      preLoaderRoute: typeof AuthRolesViewRoleIdImport;
      parentRoute: typeof AuthRolesImport;
    };
    '/_auth/variables/update/$variableId': {
      preLoaderRoute: typeof AuthVariablesUpdateVariableIdImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/gameserver/$gameServerId/dashboard/console': {
      preLoaderRoute: typeof AuthGameserverGameServerIdDashboardConsoleImport;
      parentRoute: typeof AuthGameserverGameServerIdImport;
    };
    '/_auth/gameserver/$gameServerId/dashboard/overview': {
      preLoaderRoute: typeof AuthGameserverGameServerIdDashboardOverviewImport;
      parentRoute: typeof AuthGameserverGameServerIdImport;
    };
    '/_auth/gameserver/$gameServerId/dashboard/statistics': {
      preLoaderRoute: typeof AuthGameserverGameServerIdDashboardStatisticsImport;
      parentRoute: typeof AuthGameserverGameServerIdImport;
    };
    '/_auth/player/$playerId/role/assign': {
      preLoaderRoute: typeof AuthPlayerPlayerIdRoleAssignImport;
      parentRoute: typeof AuthPlayerPlayerIdImport;
    };
    '/_auth/users/$userId/role/assign': {
      preLoaderRoute: typeof AuthUsersUserIdRoleAssignImport;
      parentRoute: typeof AuthUsersUserIdImport;
    };
    '/_auth/gameserver/$gameServerId/module/$moduleId/install': {
      preLoaderRoute: typeof AuthGameserverGameServerIdModuleModuleIdInstallImport;
      parentRoute: typeof AuthGameserverGameServerIdImport;
    };
    '/_auth/gameserver/$gameServerId/module/$moduleId/install/view': {
      preLoaderRoute: typeof AuthGameserverGameServerIdModuleModuleIdInstallViewImport;
      parentRoute: typeof AuthGameserverGameServerIdModuleModuleIdInstallImport;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthRoute.addChildren([
    AuthSettingsRoute,
    AuthDashboardRoute,
    AuthEventsRoute,
    AuthGameserversRoute.addChildren([
      AuthGameserversCreateRoute.addChildren([AuthGameserversCreateImportRoute]),
      AuthGameserversUpdateGameServerIdRoute,
    ]),
    AuthLogoutRoute,
    AuthModulesRoute.addChildren([
      AuthModulesCreateRoute,
      AuthModulesUpdateModuleIdRoute,
      AuthModulesViewModuleIdRoute,
    ]),
    AuthRolesRoute.addChildren([AuthRolesCreateRoute, AuthRolesUpdateRoleIdRoute, AuthRolesViewRoleIdRoute]),
    AuthAuthProfileRoute,
    AuthAuthRecoveryRoute,
    AuthAuthVerificationRoute,
    AuthGameserverGameServerIdRoute.addChildren([
      AuthGameserverGameServerIdDashboardRoute,
      AuthGameserverGameServerIdModulesRoute,
      AuthGameserverGameServerIdSettingsRoute,
      AuthGameserverGameServerIdDashboardConsoleRoute,
      AuthGameserverGameServerIdDashboardOverviewRoute,
      AuthGameserverGameServerIdDashboardStatisticsRoute,
      AuthGameserverGameServerIdModuleModuleIdInstallRoute.addChildren([
        AuthGameserverGameServerIdModuleModuleIdInstallViewRoute,
      ]),
    ]),
    AuthPlayerPlayerIdRoute.addChildren([
      AuthPlayerPlayerIdEconomyRoute,
      AuthPlayerPlayerIdEventsRoute,
      AuthPlayerPlayerIdGlobalRoute,
      AuthPlayerPlayerIdInventoryRoute,
      AuthPlayerPlayerIdRoleAssignRoute,
    ]),
    AuthSettingsDiscordRoute,
    AuthSettingsGameserversRoute,
    AuthUsersUserIdRoute.addChildren([AuthUsersUserIdRoleAssignRoute]),
    AuthVariablesCreateRoute,
    AuthVariablesUpdateVariableIdRoute,
  ]),
  ForbiddenRoute,
  LoginRoute,
  LogoutReturnRoute,
  StudioModuleIdRoute,
]);

/* prettier-ignore-end */
