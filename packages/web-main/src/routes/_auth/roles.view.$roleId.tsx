import { DrawerSkeleton } from '@takaro/lib-components';
import { permissionsOptions, roleOptions } from 'queries/roles/queries';
import { RoleForm } from './-roles/RoleCreateUpdateForm';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { hasPermission } from 'hooks/useHasPermission';

export const Route = createFileRoute('/_auth/roles/view/$roleId')({
  beforeLoad: ({ context }) => {
    if (!hasPermission(context.auth.session, ['READ_ROLES'])) {
      throw redirect({ to: '/forbidden' });
    }
  },
  loader: async ({ params, context }) => {
    const p1 = context.queryClient.ensureQueryData(roleOptions(params.roleId));
    const p2 = context.queryClient.ensureQueryData(permissionsOptions());
    const [role, permissions] = await Promise.all([p1, p2]);
    return { role, permissions };
  },
  component: Component,
  pendingComponent: DrawerSkeleton,
});

function Component() {
  const { role, permissions } = Route.useLoaderData();
  return <RoleForm initialData={role} permissions={permissions} error={null} />;
}
