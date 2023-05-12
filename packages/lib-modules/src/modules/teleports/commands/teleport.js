import { getTakaro, getData } from '@takaro/helpers';

async function teleport() {
  const data = await getData();
  const takaro = await getTakaro(data);

  const player = data.player;

  const teleportsRes = await takaro.variable.variableControllerFind({
    filters: {
      key: `t_tp_${data.arguments.tp}`,
      gameServerId: data.gameServerId,
      playerId: player.id,
    },
    sortBy: 'key',
    sortDirection: 'asc',
  });

  if (teleportsRes.data.data.length === 0) {
    await takaro.gameserver.gameServerControllerSendMessage(data.gameServerId, {
      message: `Teleport ${data.arguments.tp} does not exist.`,
    });
    return;
  }

  const teleport = JSON.parse(teleportsRes.data.data[0].value);

  await takaro.gameserver.gameServerControllerTeleportPlayer(
    data.gameServerId,
    player.id,
    {
      x: teleport.x,
      y: teleport.y,
      z: teleport.z,
    }
  );

  await takaro.gameserver.gameServerControllerSendMessage(data.gameServerId, {
    message: `Teleported to ${teleport.name}.`,
  });
}

teleport();
