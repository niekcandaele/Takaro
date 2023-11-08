import { FC, PropsWithChildren, ReactElement, useMemo } from 'react';
import { PERMISSIONS, PermissionsGuard as Guard, RequiredPermissions } from '@takaro/lib-components';
import { useUser } from 'hooks/useUser';

interface PermissionsGuardProps {
  requiredPermissions: RequiredPermissions;
  fallback?: ReactElement;
}

export const PermissionsGuard: FC<PropsWithChildren<PermissionsGuardProps>> = ({
  requiredPermissions,
  children,
  fallback,
}) => {
  const { userData } = useUser();

  const userPermissions = useMemo(() => {
    if (!userData || !userData.roles) {
      return [];
    }

    const permissionsFromRoles = userData.roles
      .map((role) => role.permissions.map((permission) => permission.permission))
      .reduce((acc, permissionList) => acc.concat(permissionList), [])
      .filter((permission): permission is PERMISSIONS =>
        Object.values(PERMISSIONS).includes(permission as PERMISSIONS)
      );

    return [...new Set(permissionsFromRoles)];
  }, [userData]); // only recalculated when userData changes

  return (
    <Guard requiredPermissions={requiredPermissions} userPermissions={userPermissions} fallback={fallback}>
      {children}
    </Guard>
  );
};
