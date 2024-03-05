import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { DrawerSkeleton } from '@takaro/lib-components';
import { permissionsQueryOptions, useRoleCreate } from 'queries/roles';
import { RoleForm, IFormInputs } from './-roles/RoleCreateUpdateForm';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { hasPermission } from 'hooks/useHasPermission';

export const Route = createFileRoute('/_auth/_global/roles/create')({
  beforeLoad: ({ context }) => {
    if (!hasPermission(context.auth.session, ['MANAGE_ROLES'])) {
      throw redirect({ to: '/forbidden' });
    }
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(permissionsQueryOptions()),
  component: Component,
  pendingComponent: DrawerSkeleton,
});

function Component() {
  const navigate = useNavigate();
  const { mutate, isPending: isCreatingRole, error, isSuccess } = useRoleCreate();
  const permissions = Route.useLoaderData();

  useEffect(() => {
    if (!open || isSuccess) {
      navigate({ to: '/roles' });
    }
  }, [open, navigate, isSuccess]);

  const onSubmit: SubmitHandler<IFormInputs> = ({ name, permissions: formPermissions }) => {
    const activePermissions = Object.entries(formPermissions)
      .filter(([_key, value]) => value.enabled === true)
      .map(([key, value]) => ({
        permissionId: key,
        count: value.count,
      }));
    mutate({
      name,
      permissions: activePermissions,
    });
  };

  return <RoleForm onSubmit={onSubmit} isLoading={isCreatingRole} permissions={permissions} error={error} />;
}
