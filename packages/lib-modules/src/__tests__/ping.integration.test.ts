import { IntegrationTest, expect, IModuleTestsSetupData, modulesTestSetup, EventsAwaiter } from '@takaro/test';
import { HookEvents } from '../dto/index.js';

const group = 'Ping command';

const tests = [
  new IntegrationTest<IModuleTestsSetupData>({
    group,
    snapshot: false,
    setup: modulesTestSetup,
    name: 'Ping command replies with pong',
    test: async function () {
      await this.client.gameserver.gameServerControllerInstallModule(
        this.setupData.gameserver.id,
        this.setupData.utilsModule.id,
      );

      const events = (await new EventsAwaiter().connect(this.client)).waitForEvents(HookEvents.CHAT_MESSAGE);

      await this.client.command.commandControllerTrigger(this.setupData.gameserver.id, {
        msg: '/ping',
        playerId: this.setupData.players[0].id,
      });

      expect((await events).length).to.be.eq(1);
      expect((await events)[0].data.meta.msg).to.be.eq('Pong!');
    },
  }),
];

describe(group, function () {
  tests.forEach((test) => {
    test.run();
  });
});
