import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Select,
  OptionGroup,
  Option,
  TextField,
  styled,
  DrawerContent,
  DrawerHeading,
  Drawer,
  DrawerFooter,
  DrawerBody,
  CollapseList,
  Tooltip,
  ErrorMessage,
} from '@takaro/lib-components';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GameServerCreateDTOTypeEnum,
  MockConnectionInfo,
  RustConnectionInfo,
  SdtdConnectionInfo,
} from '@takaro/apiclient';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'paths';
import { useParams } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { useGameServer, useGameServerCreate } from 'queries/gameservers';
import { useGameServerUpdate } from 'queries/gameservers/queries';
import { connectionInfoFieldsMap } from './connectionInfoFieldsMap';
import { validationSchema } from './validationSchema';

export interface IFormInputs {
  name: string;
  type: GameServerCreateDTOTypeEnum;
  connectionInfo: MockConnectionInfo | RustConnectionInfo | SdtdConnectionInfo;
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const CreateUpdateGameServer: FC = () => {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const { serverId } = useParams();
  const isCreateMode = !serverId;

  useEffect(() => {
    if (!open) {
      navigate(PATHS.gameServers.overview());
    }
  }, [open, navigate]);

  const createGameServer = useGameServerCreate();
  const updateGameServer = useGameServerUpdate();
  const { data, isLoading } = useGameServer(serverId!);

  const { control, handleSubmit, watch } = useForm<IFormInputs>({
    mode: 'all',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      type: data?.type ?? GameServerCreateDTOTypeEnum.Rust,
      name: data?.name ?? '',
      connectionInfo: data?.connectionInfo,
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = async ({
    name,
    type,
    connectionInfo,
  }) => {
    setError('');

    try {
      if (isCreateMode) {
        await createGameServer.mutateAsync({
          name,
          type,
          connectionInfo: JSON.stringify(connectionInfo),
        });
      } else {
        await updateGameServer.mutateAsync({
          gameServerId: serverId,
          gameServerDetails: {
            name,
            type,
            connectionInfo: JSON.stringify(connectionInfo),
          },
        });
      }
      navigate(PATHS.gameServers.overview());
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const gameTypeSelectOptions = [
    {
      name: 'Mock (testing purposes)',
      value: GameServerCreateDTOTypeEnum.Mock,
      show: import.meta.env.DEV,
    },
    {
      name: 'Rust',
      value: GameServerCreateDTOTypeEnum.Rust,
      show: true,
    },
    {
      name: '7 Days to die',
      value: GameServerCreateDTOTypeEnum.Sevendaystodie,
      show: true,
    },
  ].filter(({ show }) => show);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeading>
          {serverId ? 'Update game server' : 'Create game server'}
        </DrawerHeading>
        <DrawerBody>
          <CollapseList>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="create-update-game-server-form"
            >
              <CollapseList.Item title="General">
                <TextField
                  control={control}
                  label="Server name"
                  loading={isLoading}
                  name="name"
                  placeholder="My cool server"
                  required
                />

                <Select
                  control={control}
                  name="type"
                  label="Game Server"
                  required
                  loading={isLoading}
                  render={(selectedIndex) => (
                    <div>
                      {gameTypeSelectOptions[selectedIndex]?.name ??
                        'Select...'}
                    </div>
                  )}
                >
                  <OptionGroup label="Games">
                    {gameTypeSelectOptions.map(({ name, value }) => (
                      <Option key={`select-${name}`} value={value}>
                        <div>
                          <span>{name}</span>
                        </div>
                      </Option>
                    ))}
                  </OptionGroup>
                </Select>
              </CollapseList.Item>
              {watch('type') !== undefined && (
                <CollapseList.Item title="Connection info">
                  {connectionInfoFieldsMap(isLoading, control)[watch('type')]}
                </CollapseList.Item>
              )}
              {error && <ErrorMessage message={error} />}
            </form>
          </CollapseList>
        </DrawerBody>
        <DrawerFooter>
          <ButtonContainer>
            <Button
              text="Cancel"
              onClick={() => setOpen(false)}
              color="background"
            />
            <Tooltip label="You need to test the connection before we can save">
              <Button
                fullWidth
                text="Save changes"
                type="submit"
                form="create-update-game-server-form"
              />
            </Tooltip>
          </ButtonContainer>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateUpdateGameServer;
