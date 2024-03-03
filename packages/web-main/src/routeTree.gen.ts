/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LogoutReturnImport } from './routes/logout-return'
import { Route as LoginImport } from './routes/login'
import { Route as ForbiddenImport } from './routes/forbidden'
import { Route as AuthImport } from './routes/_auth'
import { Route as StudioModuleIdImport } from './routes/studio.$moduleId'
import { Route as AccountVerificationImport } from './routes/account.verification'
import { Route as AccountRecoveryImport } from './routes/account.recovery'
import { Route as AccountProfileImport } from './routes/account.profile'
import { Route as AuthLogoutImport } from './routes/_auth/logout'
import { Route as AuthGlobalImport } from './routes/_auth/_global'
import { Route as AuthGlobalIndexImport } from './routes/_auth/_global/index'
import { Route as AuthGameserverGameServerIdImport } from './routes/_auth/gameserver.$gameServerId'
import { Route as AuthGlobalVariablesImport } from './routes/_auth/_global/variables'
import { Route as AuthGlobalUsersImport } from './routes/_auth/_global/users'
import { Route as AuthGlobalSettingsImport } from './routes/_auth/_global/settings'
import { Route as AuthGlobalRolesImport } from './routes/_auth/_global/roles'
import { Route as AuthGlobalPlayersImport } from './routes/_auth/_global/players'
import { Route as AuthGlobalModulesImport } from './routes/_auth/_global/modules'
import { Route as AuthGlobalGameserversImport } from './routes/_auth/_global/gameservers'
import { Route as AuthGlobalEventsImport } from './routes/_auth/_global/events'
import { Route as AuthGlobalDashboardImport } from './routes/_auth/_global/dashboard'
import { Route as AuthGlobalSettingsIndexImport } from './routes/_auth/_global/settings/index'
import { Route as AuthGameserverGameServerIdSettingsImport } from './routes/_auth/gameserver.$gameServerId/settings'
import { Route as AuthGameserverGameServerIdModulesImport } from './routes/_auth/gameserver.$gameServerId/modules'
import { Route as AuthGameserverGameServerIdDashboardImport } from './routes/_auth/gameserver.$gameServerId/dashboard'
import { Route as AuthGlobalVariablesCreateImport } from './routes/_auth/_global/variables.create'
import { Route as AuthGlobalUserUserIdImport } from './routes/_auth/_global/user.$userId'
import { Route as AuthGlobalSettingsGameserversImport } from './routes/_auth/_global/settings/gameservers'
import { Route as AuthGlobalSettingsDiscordImport } from './routes/_auth/_global/settings/discord'
import { Route as AuthGlobalRolesCreateImport } from './routes/_auth/_global/roles.create'
import { Route as AuthGlobalPlayerPlayerIdImport } from './routes/_auth/_global/player.$playerId'
import { Route as AuthGlobalModulesCreateImport } from './routes/_auth/_global/modules.create'
import { Route as AuthGlobalPlayerPlayerIdIndexImport } from './routes/_auth/_global/player.$playerId/index'
import { Route as AuthGlobalGameserversCreateIndexImport } from './routes/_auth/_global/gameservers.create.index'
import { Route as AuthGameserverGameServerIdDashboardStatisticsImport } from './routes/_auth/gameserver.$gameServerId/dashboard.statistics'
import { Route as AuthGameserverGameServerIdDashboardOverviewImport } from './routes/_auth/gameserver.$gameServerId/dashboard.overview'
import { Route as AuthGameserverGameServerIdDashboardConsoleImport } from './routes/_auth/gameserver.$gameServerId/dashboard.console'
import { Route as AuthGlobalVariablesUpdateVariableIdImport } from './routes/_auth/_global/variables.update.$variableId'
import { Route as AuthGlobalRolesViewRoleIdImport } from './routes/_auth/_global/roles.view.$roleId'
import { Route as AuthGlobalRolesUpdateRoleIdImport } from './routes/_auth/_global/roles.update.$roleId'
import { Route as AuthGlobalPlayerPlayerIdInventoryImport } from './routes/_auth/_global/player.$playerId/inventory'
import { Route as AuthGlobalPlayerPlayerIdInfoImport } from './routes/_auth/_global/player.$playerId/info'
import { Route as AuthGlobalPlayerPlayerIdEventsImport } from './routes/_auth/_global/player.$playerId/events'
import { Route as AuthGlobalPlayerPlayerIdEconomyImport } from './routes/_auth/_global/player.$playerId/economy'
import { Route as AuthGlobalModulesModuleIdViewImport } from './routes/_auth/_global/modules.$moduleId.view'
import { Route as AuthGlobalModulesModuleIdUpdateImport } from './routes/_auth/_global/modules.$moduleId.update'
import { Route as AuthGlobalModulesModuleIdCopyImport } from './routes/_auth/_global/modules.$moduleId.copy'
import { Route as AuthGlobalGameserversUpdateGameServerIdImport } from './routes/_auth/_global/gameservers.update.$gameServerId'
import { Route as AuthGlobalGameserversCreateImportImport } from './routes/_auth/_global/gameservers.create.import'
import { Route as AuthGameserverGameServerIdModulesModuleIdInstallImport } from './routes/_auth/gameserver.$gameServerId/modules.$moduleId.install'
import { Route as AuthGlobalUserUserIdRoleAssignImport } from './routes/_auth/_global/user.$userId.role.assign'
import { Route as AuthGlobalPlayerPlayerIdRoleAssignImport } from './routes/_auth/_global/player.$playerId/role.assign'
import { Route as AuthGameserverGameServerIdModulesModuleIdInstallViewImport } from './routes/_auth/gameserver.$gameServerId/modules.$moduleId.install.view'

// Create/Update Routes

const LogoutReturnRoute = LogoutReturnImport.update({
  path: '/logout-return',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ForbiddenRoute = ForbiddenImport.update({
  path: '/forbidden',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const StudioModuleIdRoute = StudioModuleIdImport.update({
  path: '/studio/$moduleId',
  getParentRoute: () => rootRoute,
} as any)

const AccountVerificationRoute = AccountVerificationImport.update({
  path: '/account/verification',
  getParentRoute: () => rootRoute,
} as any)

const AccountRecoveryRoute = AccountRecoveryImport.update({
  path: '/account/recovery',
  getParentRoute: () => rootRoute,
} as any)

const AccountProfileRoute = AccountProfileImport.update({
  path: '/account/profile',
  getParentRoute: () => rootRoute,
} as any)

const AuthLogoutRoute = AuthLogoutImport.update({
  path: '/logout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthGlobalRoute = AuthGlobalImport.update({
  id: '/_global',
  getParentRoute: () => AuthRoute,
} as any)

const AuthGlobalIndexRoute = AuthGlobalIndexImport.update({
  path: '/',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGameserverGameServerIdRoute = AuthGameserverGameServerIdImport.update(
  {
    path: '/gameserver/$gameServerId',
    getParentRoute: () => AuthRoute,
  } as any,
)

const AuthGlobalVariablesRoute = AuthGlobalVariablesImport.update({
  path: '/variables',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalUsersRoute = AuthGlobalUsersImport.update({
  path: '/users',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalSettingsRoute = AuthGlobalSettingsImport.update({
  path: '/settings',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalRolesRoute = AuthGlobalRolesImport.update({
  path: '/roles',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalPlayersRoute = AuthGlobalPlayersImport.update({
  path: '/players',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalModulesRoute = AuthGlobalModulesImport.update({
  path: '/modules',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalGameserversRoute = AuthGlobalGameserversImport.update({
  path: '/gameservers',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalEventsRoute = AuthGlobalEventsImport.update({
  path: '/events',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalDashboardRoute = AuthGlobalDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalSettingsIndexRoute = AuthGlobalSettingsIndexImport.update({
  path: '/',
  getParentRoute: () => AuthGlobalSettingsRoute,
} as any)

const AuthGameserverGameServerIdSettingsRoute =
  AuthGameserverGameServerIdSettingsImport.update({
    path: '/settings',
    getParentRoute: () => AuthGameserverGameServerIdRoute,
  } as any)

const AuthGameserverGameServerIdModulesRoute =
  AuthGameserverGameServerIdModulesImport.update({
    path: '/modules',
    getParentRoute: () => AuthGameserverGameServerIdRoute,
  } as any)

const AuthGameserverGameServerIdDashboardRoute =
  AuthGameserverGameServerIdDashboardImport.update({
    path: '/dashboard',
    getParentRoute: () => AuthGameserverGameServerIdRoute,
  } as any)

const AuthGlobalVariablesCreateRoute = AuthGlobalVariablesCreateImport.update({
  path: '/create',
  getParentRoute: () => AuthGlobalVariablesRoute,
} as any)

const AuthGlobalUserUserIdRoute = AuthGlobalUserUserIdImport.update({
  path: '/user/$userId',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalSettingsGameserversRoute =
  AuthGlobalSettingsGameserversImport.update({
    path: '/gameservers',
    getParentRoute: () => AuthGlobalSettingsRoute,
  } as any)

const AuthGlobalSettingsDiscordRoute = AuthGlobalSettingsDiscordImport.update({
  path: '/discord',
  getParentRoute: () => AuthGlobalSettingsRoute,
} as any)

const AuthGlobalRolesCreateRoute = AuthGlobalRolesCreateImport.update({
  path: '/create',
  getParentRoute: () => AuthGlobalRolesRoute,
} as any)

const AuthGlobalPlayerPlayerIdRoute = AuthGlobalPlayerPlayerIdImport.update({
  path: '/player/$playerId',
  getParentRoute: () => AuthGlobalRoute,
} as any)

const AuthGlobalModulesCreateRoute = AuthGlobalModulesCreateImport.update({
  path: '/create',
  getParentRoute: () => AuthGlobalModulesRoute,
} as any)

const AuthGlobalPlayerPlayerIdIndexRoute =
  AuthGlobalPlayerPlayerIdIndexImport.update({
    path: '/',
    getParentRoute: () => AuthGlobalPlayerPlayerIdRoute,
  } as any)

const AuthGlobalGameserversCreateIndexRoute =
  AuthGlobalGameserversCreateIndexImport.update({
    path: '/create/',
    getParentRoute: () => AuthGlobalGameserversRoute,
  } as any)

const AuthGameserverGameServerIdDashboardStatisticsRoute =
  AuthGameserverGameServerIdDashboardStatisticsImport.update({
    path: '/statistics',
    getParentRoute: () => AuthGameserverGameServerIdDashboardRoute,
  } as any)

const AuthGameserverGameServerIdDashboardOverviewRoute =
  AuthGameserverGameServerIdDashboardOverviewImport.update({
    path: '/overview',
    getParentRoute: () => AuthGameserverGameServerIdDashboardRoute,
  } as any)

const AuthGameserverGameServerIdDashboardConsoleRoute =
  AuthGameserverGameServerIdDashboardConsoleImport.update({
    path: '/console',
    getParentRoute: () => AuthGameserverGameServerIdDashboardRoute,
  } as any)

const AuthGlobalVariablesUpdateVariableIdRoute =
  AuthGlobalVariablesUpdateVariableIdImport.update({
    path: '/update/$variableId',
    getParentRoute: () => AuthGlobalVariablesRoute,
  } as any)

const AuthGlobalRolesViewRoleIdRoute = AuthGlobalRolesViewRoleIdImport.update({
  path: '/view/$roleId',
  getParentRoute: () => AuthGlobalRolesRoute,
} as any)

const AuthGlobalRolesUpdateRoleIdRoute =
  AuthGlobalRolesUpdateRoleIdImport.update({
    path: '/update/$roleId',
    getParentRoute: () => AuthGlobalRolesRoute,
  } as any)

const AuthGlobalPlayerPlayerIdInventoryRoute =
  AuthGlobalPlayerPlayerIdInventoryImport.update({
    path: '/inventory',
    getParentRoute: () => AuthGlobalPlayerPlayerIdRoute,
  } as any)

const AuthGlobalPlayerPlayerIdInfoRoute =
  AuthGlobalPlayerPlayerIdInfoImport.update({
    path: '/info',
    getParentRoute: () => AuthGlobalPlayerPlayerIdRoute,
  } as any)

const AuthGlobalPlayerPlayerIdEventsRoute =
  AuthGlobalPlayerPlayerIdEventsImport.update({
    path: '/events',
    getParentRoute: () => AuthGlobalPlayerPlayerIdRoute,
  } as any)

const AuthGlobalPlayerPlayerIdEconomyRoute =
  AuthGlobalPlayerPlayerIdEconomyImport.update({
    path: '/economy',
    getParentRoute: () => AuthGlobalPlayerPlayerIdRoute,
  } as any)

const AuthGlobalModulesModuleIdViewRoute =
  AuthGlobalModulesModuleIdViewImport.update({
    path: '/$moduleId/view',
    getParentRoute: () => AuthGlobalModulesRoute,
  } as any)

const AuthGlobalModulesModuleIdUpdateRoute =
  AuthGlobalModulesModuleIdUpdateImport.update({
    path: '/$moduleId/update',
    getParentRoute: () => AuthGlobalModulesRoute,
  } as any)

const AuthGlobalModulesModuleIdCopyRoute =
  AuthGlobalModulesModuleIdCopyImport.update({
    path: '/$moduleId/copy',
    getParentRoute: () => AuthGlobalModulesRoute,
  } as any)

const AuthGlobalGameserversUpdateGameServerIdRoute =
  AuthGlobalGameserversUpdateGameServerIdImport.update({
    path: '/update/$gameServerId',
    getParentRoute: () => AuthGlobalGameserversRoute,
  } as any)

const AuthGlobalGameserversCreateImportRoute =
  AuthGlobalGameserversCreateImportImport.update({
    path: '/create/import',
    getParentRoute: () => AuthGlobalGameserversRoute,
  } as any)

const AuthGameserverGameServerIdModulesModuleIdInstallRoute =
  AuthGameserverGameServerIdModulesModuleIdInstallImport.update({
    path: '/$moduleId/install',
    getParentRoute: () => AuthGameserverGameServerIdModulesRoute,
  } as any)

const AuthGlobalUserUserIdRoleAssignRoute =
  AuthGlobalUserUserIdRoleAssignImport.update({
    path: '/role/assign',
    getParentRoute: () => AuthGlobalUserUserIdRoute,
  } as any)

const AuthGlobalPlayerPlayerIdRoleAssignRoute =
  AuthGlobalPlayerPlayerIdRoleAssignImport.update({
    path: '/role/assign',
    getParentRoute: () => AuthGlobalPlayerPlayerIdRoute,
  } as any)

const AuthGameserverGameServerIdModulesModuleIdInstallViewRoute =
  AuthGameserverGameServerIdModulesModuleIdInstallViewImport.update({
    path: '/view',
    getParentRoute: () => AuthGameserverGameServerIdModulesModuleIdInstallRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/forbidden': {
      preLoaderRoute: typeof ForbiddenImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/logout-return': {
      preLoaderRoute: typeof LogoutReturnImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_global': {
      preLoaderRoute: typeof AuthGlobalImport
      parentRoute: typeof AuthImport
    }
    '/_auth/logout': {
      preLoaderRoute: typeof AuthLogoutImport
      parentRoute: typeof AuthImport
    }
    '/account/profile': {
      preLoaderRoute: typeof AccountProfileImport
      parentRoute: typeof rootRoute
    }
    '/account/recovery': {
      preLoaderRoute: typeof AccountRecoveryImport
      parentRoute: typeof rootRoute
    }
    '/account/verification': {
      preLoaderRoute: typeof AccountVerificationImport
      parentRoute: typeof rootRoute
    }
    '/studio/$moduleId': {
      preLoaderRoute: typeof StudioModuleIdImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_global/dashboard': {
      preLoaderRoute: typeof AuthGlobalDashboardImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/events': {
      preLoaderRoute: typeof AuthGlobalEventsImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/gameservers': {
      preLoaderRoute: typeof AuthGlobalGameserversImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/modules': {
      preLoaderRoute: typeof AuthGlobalModulesImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/players': {
      preLoaderRoute: typeof AuthGlobalPlayersImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/roles': {
      preLoaderRoute: typeof AuthGlobalRolesImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/settings': {
      preLoaderRoute: typeof AuthGlobalSettingsImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/users': {
      preLoaderRoute: typeof AuthGlobalUsersImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/variables': {
      preLoaderRoute: typeof AuthGlobalVariablesImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/gameserver/$gameServerId': {
      preLoaderRoute: typeof AuthGameserverGameServerIdImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_global/': {
      preLoaderRoute: typeof AuthGlobalIndexImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/modules/create': {
      preLoaderRoute: typeof AuthGlobalModulesCreateImport
      parentRoute: typeof AuthGlobalModulesImport
    }
    '/_auth/_global/player/$playerId': {
      preLoaderRoute: typeof AuthGlobalPlayerPlayerIdImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/roles/create': {
      preLoaderRoute: typeof AuthGlobalRolesCreateImport
      parentRoute: typeof AuthGlobalRolesImport
    }
    '/_auth/_global/settings/discord': {
      preLoaderRoute: typeof AuthGlobalSettingsDiscordImport
      parentRoute: typeof AuthGlobalSettingsImport
    }
    '/_auth/_global/settings/gameservers': {
      preLoaderRoute: typeof AuthGlobalSettingsGameserversImport
      parentRoute: typeof AuthGlobalSettingsImport
    }
    '/_auth/_global/user/$userId': {
      preLoaderRoute: typeof AuthGlobalUserUserIdImport
      parentRoute: typeof AuthGlobalImport
    }
    '/_auth/_global/variables/create': {
      preLoaderRoute: typeof AuthGlobalVariablesCreateImport
      parentRoute: typeof AuthGlobalVariablesImport
    }
    '/_auth/gameserver/$gameServerId/dashboard': {
      preLoaderRoute: typeof AuthGameserverGameServerIdDashboardImport
      parentRoute: typeof AuthGameserverGameServerIdImport
    }
    '/_auth/gameserver/$gameServerId/modules': {
      preLoaderRoute: typeof AuthGameserverGameServerIdModulesImport
      parentRoute: typeof AuthGameserverGameServerIdImport
    }
    '/_auth/gameserver/$gameServerId/settings': {
      preLoaderRoute: typeof AuthGameserverGameServerIdSettingsImport
      parentRoute: typeof AuthGameserverGameServerIdImport
    }
    '/_auth/_global/settings/': {
      preLoaderRoute: typeof AuthGlobalSettingsIndexImport
      parentRoute: typeof AuthGlobalSettingsImport
    }
    '/_auth/_global/gameservers/create/import': {
      preLoaderRoute: typeof AuthGlobalGameserversCreateImportImport
      parentRoute: typeof AuthGlobalGameserversImport
    }
    '/_auth/_global/gameservers/update/$gameServerId': {
      preLoaderRoute: typeof AuthGlobalGameserversUpdateGameServerIdImport
      parentRoute: typeof AuthGlobalGameserversImport
    }
    '/_auth/_global/modules/$moduleId/copy': {
      preLoaderRoute: typeof AuthGlobalModulesModuleIdCopyImport
      parentRoute: typeof AuthGlobalModulesImport
    }
    '/_auth/_global/modules/$moduleId/update': {
      preLoaderRoute: typeof AuthGlobalModulesModuleIdUpdateImport
      parentRoute: typeof AuthGlobalModulesImport
    }
    '/_auth/_global/modules/$moduleId/view': {
      preLoaderRoute: typeof AuthGlobalModulesModuleIdViewImport
      parentRoute: typeof AuthGlobalModulesImport
    }
    '/_auth/_global/player/$playerId/economy': {
      preLoaderRoute: typeof AuthGlobalPlayerPlayerIdEconomyImport
      parentRoute: typeof AuthGlobalPlayerPlayerIdImport
    }
    '/_auth/_global/player/$playerId/events': {
      preLoaderRoute: typeof AuthGlobalPlayerPlayerIdEventsImport
      parentRoute: typeof AuthGlobalPlayerPlayerIdImport
    }
    '/_auth/_global/player/$playerId/info': {
      preLoaderRoute: typeof AuthGlobalPlayerPlayerIdInfoImport
      parentRoute: typeof AuthGlobalPlayerPlayerIdImport
    }
    '/_auth/_global/player/$playerId/inventory': {
      preLoaderRoute: typeof AuthGlobalPlayerPlayerIdInventoryImport
      parentRoute: typeof AuthGlobalPlayerPlayerIdImport
    }
    '/_auth/_global/roles/update/$roleId': {
      preLoaderRoute: typeof AuthGlobalRolesUpdateRoleIdImport
      parentRoute: typeof AuthGlobalRolesImport
    }
    '/_auth/_global/roles/view/$roleId': {
      preLoaderRoute: typeof AuthGlobalRolesViewRoleIdImport
      parentRoute: typeof AuthGlobalRolesImport
    }
    '/_auth/_global/variables/update/$variableId': {
      preLoaderRoute: typeof AuthGlobalVariablesUpdateVariableIdImport
      parentRoute: typeof AuthGlobalVariablesImport
    }
    '/_auth/gameserver/$gameServerId/dashboard/console': {
      preLoaderRoute: typeof AuthGameserverGameServerIdDashboardConsoleImport
      parentRoute: typeof AuthGameserverGameServerIdDashboardImport
    }
    '/_auth/gameserver/$gameServerId/dashboard/overview': {
      preLoaderRoute: typeof AuthGameserverGameServerIdDashboardOverviewImport
      parentRoute: typeof AuthGameserverGameServerIdDashboardImport
    }
    '/_auth/gameserver/$gameServerId/dashboard/statistics': {
      preLoaderRoute: typeof AuthGameserverGameServerIdDashboardStatisticsImport
      parentRoute: typeof AuthGameserverGameServerIdDashboardImport
    }
    '/_auth/_global/gameservers/create/': {
      preLoaderRoute: typeof AuthGlobalGameserversCreateIndexImport
      parentRoute: typeof AuthGlobalGameserversImport
    }
    '/_auth/_global/player/$playerId/': {
      preLoaderRoute: typeof AuthGlobalPlayerPlayerIdIndexImport
      parentRoute: typeof AuthGlobalPlayerPlayerIdImport
    }
    '/_auth/_global/player/$playerId/role/assign': {
      preLoaderRoute: typeof AuthGlobalPlayerPlayerIdRoleAssignImport
      parentRoute: typeof AuthGlobalPlayerPlayerIdImport
    }
    '/_auth/_global/user/$userId/role/assign': {
      preLoaderRoute: typeof AuthGlobalUserUserIdRoleAssignImport
      parentRoute: typeof AuthGlobalUserUserIdImport
    }
    '/_auth/gameserver/$gameServerId/modules/$moduleId/install': {
      preLoaderRoute: typeof AuthGameserverGameServerIdModulesModuleIdInstallImport
      parentRoute: typeof AuthGameserverGameServerIdModulesImport
    }
    '/_auth/gameserver/$gameServerId/modules/$moduleId/install/view': {
      preLoaderRoute: typeof AuthGameserverGameServerIdModulesModuleIdInstallViewImport
      parentRoute: typeof AuthGameserverGameServerIdModulesModuleIdInstallImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthRoute.addChildren([
    AuthGlobalRoute.addChildren([
      AuthGlobalDashboardRoute,
      AuthGlobalEventsRoute,
      AuthGlobalGameserversRoute.addChildren([
        AuthGlobalGameserversCreateImportRoute,
        AuthGlobalGameserversUpdateGameServerIdRoute,
        AuthGlobalGameserversCreateIndexRoute,
      ]),
      AuthGlobalModulesRoute.addChildren([
        AuthGlobalModulesCreateRoute,
        AuthGlobalModulesModuleIdCopyRoute,
        AuthGlobalModulesModuleIdUpdateRoute,
        AuthGlobalModulesModuleIdViewRoute,
      ]),
      AuthGlobalPlayersRoute,
      AuthGlobalRolesRoute.addChildren([
        AuthGlobalRolesCreateRoute,
        AuthGlobalRolesUpdateRoleIdRoute,
        AuthGlobalRolesViewRoleIdRoute,
      ]),
      AuthGlobalSettingsRoute.addChildren([
        AuthGlobalSettingsDiscordRoute,
        AuthGlobalSettingsGameserversRoute,
        AuthGlobalSettingsIndexRoute,
      ]),
      AuthGlobalUsersRoute,
      AuthGlobalVariablesRoute.addChildren([
        AuthGlobalVariablesCreateRoute,
        AuthGlobalVariablesUpdateVariableIdRoute,
      ]),
      AuthGlobalIndexRoute,
      AuthGlobalPlayerPlayerIdRoute.addChildren([
        AuthGlobalPlayerPlayerIdEconomyRoute,
        AuthGlobalPlayerPlayerIdEventsRoute,
        AuthGlobalPlayerPlayerIdInfoRoute,
        AuthGlobalPlayerPlayerIdInventoryRoute,
        AuthGlobalPlayerPlayerIdIndexRoute,
        AuthGlobalPlayerPlayerIdRoleAssignRoute,
      ]),
      AuthGlobalUserUserIdRoute.addChildren([
        AuthGlobalUserUserIdRoleAssignRoute,
      ]),
    ]),
    AuthLogoutRoute,
    AuthGameserverGameServerIdRoute.addChildren([
      AuthGameserverGameServerIdDashboardRoute.addChildren([
        AuthGameserverGameServerIdDashboardConsoleRoute,
        AuthGameserverGameServerIdDashboardOverviewRoute,
        AuthGameserverGameServerIdDashboardStatisticsRoute,
      ]),
      AuthGameserverGameServerIdModulesRoute.addChildren([
        AuthGameserverGameServerIdModulesModuleIdInstallRoute.addChildren([
          AuthGameserverGameServerIdModulesModuleIdInstallViewRoute,
        ]),
      ]),
      AuthGameserverGameServerIdSettingsRoute,
    ]),
  ]),
  ForbiddenRoute,
  LoginRoute,
  LogoutReturnRoute,
  AccountProfileRoute,
  AccountRecoveryRoute,
  AccountVerificationRoute,
  StudioModuleIdRoute,
])

/* prettier-ignore-end */
