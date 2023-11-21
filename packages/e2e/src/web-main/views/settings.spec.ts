import playwright from '@playwright/test';
import { test } from '../fixtures/index.js';
import { GameServerCreateDTOTypeEnum } from '@takaro/apiclient';
import { integrationConfig } from '@takaro/test';

const { expect } = playwright;

test('Can set global settings', async ({ page }) => {
  await page.getByText('Settings').click();
  await page.getByLabel('serverChatName').fill('My cool server');
  await page.getByRole('button', { name: 'Save' }).click();

  await page.reload();

  await expect(page.getByLabel('serverChatName')).toHaveValue('My cool server');
});

test('Can set server-scoped settings', async ({ page }) => {
  await page.getByRole('link', { name: 'Servers' }).click();
  await page.getByText('Test server').click();
  await page
    .getByRole('navigation')
    .filter({ hasText: 'ServerDashboardModulesSettings' })
    .getByRole('link', { name: 'Settings' })
    .click();

  await page.getByLabel('serverChatName').fill('My cool server');
  await page.getByRole('button', { name: 'Save' }).click();

  await page.reload();

  await expect(page.getByLabel('serverChatName')).toHaveValue('My cool server');
});

test('Setting server-scoped setting for server A does not affect server B', async ({ page, takaro }) => {
  await takaro.rootClient.gameserver.gameServerControllerCreate({
    name: 'Second server',
    type: GameServerCreateDTOTypeEnum.Mock,
    connectionInfo: JSON.stringify({
      host: integrationConfig.get('mockGameserver.host'),
    }),
  });

  await page.getByRole('link', { name: 'Servers' }).click();
  // make sure we click on the server card, and not the select
  await page.getByRole('heading', { name: 'Test server' }).click();
  await page
    .getByRole('navigation')
    .filter({ hasText: 'ServerDashboardModulesSettings' })
    .getByRole('link', { name: 'Settings' })
    .click();

  await page.getByLabel('serverChatName').fill('My cool server');
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByRole('link', { name: 'Takaro' }).click();
  await page.getByRole('link', { name: 'Servers' }).click();
  await page.getByRole('heading', { name: 'Second Server' }).click();
  await page
    .getByRole('navigation')
    .filter({ hasText: 'ServerDashboardModulesSettings' })
    .getByRole('link', { name: 'Settings' })
    .click();

  await expect(page.getByLabel('serverChatName')).toHaveValue('Takaro');
});
