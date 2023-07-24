import playwright from '@playwright/test';
import { basicTest, test } from '../fixtures/index.js';

const { expect, test: pwTest } = playwright;

basicTest('Can create module', async ({ page }) => {
  // open modules page
  await page.getByRole('link', { name: 'Modules' }).click();
  await page.getByText('new module').click();

  const newModuleName = 'My new module';
  const moduleNameInput = page.getByPlaceholder('My cool module');

  await moduleNameInput.click();
  await moduleNameInput.fill(newModuleName);

  await page.getByRole('button', { name: 'Save changes' }).click();

  await expect(page.getByText(newModuleName)).toBeVisible();
});

basicTest('Creating module with config, saves the config', async ({ page }) => {
  await page.getByRole('link', { name: 'Modules' }).click();
  await page.getByText('new module').click();

  const moduleName = 'My new module';

  await page.getByPlaceholder('My cool module').fill(moduleName);

  await page.getByRole('button', { name: 'Config Field' }).click();
  await page.locator('input[name="configFields\\.0\\.name"]').fill('Cool string');
  await page.getByLabel('Default value').fill('my string default value');

  await page.getByRole('button', { name: 'Save changes' }).click();

  await page.getByRole('link', { name: 'Modules' }).click();

  await expect(page.getByText(moduleName)).toBeVisible();
  await page
    .getByRole('link', { name: 'My new module Edit module Delete module No description provided.' })
    .getByRole('button', { name: 'Edit module' })
    .click();

  await expect(page.getByText('Cool string')).toBeVisible();
});

basicTest('Creating a module but providing too short name, shows an error', async ({ page }) => {
  await page.getByRole('link', { name: 'Modules' }).click();
  await page.getByText('new module').click();

  await page.getByPlaceholder('My cool module').fill('a');

  await page.getByRole('button', { name: 'Save changes' }).click();

  await expect(page.getByText('name must be longer than or equal to 3 characters')).toBeVisible();
});

basicTest('Creating a module with config but not providing a default value, shows an error', async ({ page }) => {
  await page.getByRole('link', { name: 'Modules' }).click();
  await page.getByText('new module').click();

  await page.getByPlaceholder('My cool module').fill('My new module');

  await page.getByRole('button', { name: 'Config Field' }).click();
  await page.locator('input[name="configFields\\.0\\.name"]').fill('Cool string');

  await page.getByRole('button', { name: 'Save changes' }).click();

  await expect(
    page
      .locator('div')
      .filter({ hasText: /^Required$/ })
      .locator('span')
  ).toBeVisible();
});

basicTest('Can edit module', async ({ page, takaro }) => {
  const oldModuleName = 'edit this module';

  await takaro.client.module.moduleControllerCreate({
    name: oldModuleName,
    description: 'Modules are the building blocks of your game server. They consist of commands, c',
    configSchema: JSON.stringify({}),
  });

  // open modules page
  await page.getByRole('link', { name: 'Modules' }).click();

  await page.getByRole('link', { name: oldModuleName }).getByRole('button', { name: 'Edit module' }).click();

  const newModuleName = 'My edited module';
  const moduleNameInput = page.getByPlaceholder('My cool module');
  await moduleNameInput.click();
  await moduleNameInput.fill(newModuleName);

  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.getByRole('link', { name: newModuleName })).toBeVisible();
});

basicTest('Can delete module', async ({ page, takaro }) => {
  const moduleName = 'delete this module';
  await takaro.client.module.moduleControllerCreate({
    name: moduleName,
    description: 'Modules are the building blocks of your game server. They consist of commands, c',
    configSchema: JSON.stringify({}),
  });

  // open modules page
  await page.getByRole('link', { name: 'Modules' }).click();
  const cardDeleteButton = page.getByRole('link', { name: moduleName }).getByRole('button', { name: 'Delete module' });
  await cardDeleteButton.click();

  // dialog
  await page.getByRole('button', { name: 'Delete module' }).click();

  await expect(page.getByText(moduleName)).toHaveCount(0);
});

test('Can install module with empty config', async ({ page }) => {
  await page.getByRole('link', { name: 'Servers' }).click();
  await page.getByText('Test server').click();
  await page.getByText('Server Modules').click();

  await page
    .getByRole('list')
    .locator('div')
    .filter({ hasText: 'Module without functionsEmpty module with no functions Install' })
    .getByRole('button', { name: 'Install' })
    .click();

  await page.getByRole('button', { name: 'Install' }).click();

  await expect(
    page
      .getByRole('list')
      .locator('div')
      .filter({ hasText: 'Module without functionsEmpty module with no functions Install' })
  ).toHaveCount(0);
});

pwTest.describe('Module config', () => {
  test('Can create string field', async ({}) => {
    /*
    await page.getByRole('link', { name: 'Modules' }).click();

    await page.locator('a').filter({ hasText: 'new module' }).click();

    const newModuleName = 'My new module';
    const moduleNameInput = page.getByPlaceholder('My cool module');

    await moduleNameInput.click();
    await moduleNameInput.fill(newModuleName);

    const moduleDescriptionInput = page.getByPlaceholder(
      'This module does cool stuff'
    );
    moduleDescriptionInput.click();
    moduleDescriptionInput.fill('My module description');

    const configFieldNameInput = page.locator(
      'input[name="configFields.0.name"]'
    );
    await configFieldNameInput.click();
    await configFieldNameInput.fill('My string field');

    const configFieldDescriptionInput = page.locator(
      'input[name="configFields.0.description"]'
    );
    await configFieldDescriptionInput.click();
    await configFieldDescriptionInput.fill('My string description');

    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'string' }).click();

    const configFieldDefaultValueInput = page.getByLabel('Default value');
    await configFieldDefaultValueInput.click();
    await configFieldDefaultValueInput.fill('my string default value');

    const configFieldMinLength = page.getByLabel('Minimum length');
    await configFieldMinLength.click();
    await configFieldMinLength.fill('0');

    const configFieldMaxLength = page.getByLabel('Maximum length');
    configFieldMaxLength.click();
    configFieldMaxLength.fill('20');

    const configFieldRequired = page.getByRole('checkbox');
    configFieldRequired.click();

    await page.getByRole('button', { name: 'Save changes' }).click();

    // we add a button press here because the cache for the moduleData is not updated yet.
    await page.getByRole('link', { name: 'Modules' }).click();

    await expect(page.getByText(newModuleName)).toBeVisible();

    // open edit module page
    await page
      .locator('a', { hasText: newModuleName })
      .getByRole('button')
      .first()
      .click();

    await expect(page.getByPlaceholder('My cool module')).toHaveValue(
      newModuleName
    );

    await expect(configFieldNameInput).toHaveValue('My string field');

    await expect(
      page.locator('input[name="configFields.0.description"]')
    ).toHaveValue('My string description');

    await expect(page.getByRole('combobox')).toHaveValue('string');
    await expect(page.getByLabel('Default value')).toHaveValue(
      'my string default value'
    );
    await expect(page.getByLabel('Minimum length')).toHaveValue('0');
    await expect(page.getByLabel('Maximum length')).toHaveValue('20');
    */
  });

  test.fixme('Can create number field', async ({}) => {});

  test.fixme('Can create boolean field', async ({}) => {});

  test.fixme('Can create array field', async ({}) => {});

  test.fixme('Can create enum field', async ({}) => {});
});
