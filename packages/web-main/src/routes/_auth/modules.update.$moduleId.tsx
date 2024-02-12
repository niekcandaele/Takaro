import { moduleOptions, useModuleUpdate } from 'queries/modules';
import { ModuleForm, ModuleFormSubmitProps } from './-modules/ModuleForm';
import { DrawerSkeleton } from '@takaro/lib-components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/modules/update/$moduleId')({
  loader: ({ params, context }) => context.queryClient.ensureQueryData(moduleOptions(params.moduleId)),
  component: Component,
  pendingComponent: DrawerSkeleton,
});

function Component() {
  const mod = Route.useLoaderData();
  const { mutate, isSuccess, isPending: isSubmitting, error: formError } = useModuleUpdate();

  const onSubmit = (fields: ModuleFormSubmitProps) => {
    mutate({
      // if moduleId is not present it will have failed before this point.
      id: mod.id,
      moduleUpdate: {
        name: fields.name,
        description: fields.description,
        configSchema: fields.schema, // this is already stringified
        uiSchema: fields.uiSchema, // this is already stringified
        permissions: fields.permissions,
      },
    });
  };

  return <ModuleForm mod={mod} onSubmit={onSubmit} isLoading={isSubmitting} isSuccess={isSuccess} error={formError} />;
}
