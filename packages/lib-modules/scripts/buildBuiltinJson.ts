import 'reflect-metadata';
import { getModules } from '@takaro/modules';
import { writeFile } from 'fs/promises';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function main() {
  // Built in modules
  // TODO: we should probably 'export' them in CI and save it as JSON so it's consistent with the community modules
  const modules = getModules();
  const modulesJson = JSON.stringify(modules, null, 2);
  await writeFile('dist/modules.json', modulesJson);
  await writeFile('../web-docs/docs/modules/modules.json', modulesJson);
  await writeFile('../e2e/src/web-main/fixtures/modules.json', modulesJson);

  // Community modules
  const files = await readdir(`${__dirname}/../src/community-modules/modules`);
  const communityModules: Array<string> = [];

  for (const file of files) {
    const content = await readFile(`${__dirname}/../src/community-modules/modules/${file}`, 'utf-8');
    communityModules.push(JSON.parse(content));
  }

  const communityModulesJson = JSON.stringify(communityModules, null, 2);
  await writeFile('dist/community-modules.json', communityModulesJson);
  await writeFile('../web-docs/docs/community-modules.json', communityModulesJson);
  await writeFile('../e2e/src/web-main/fixtures/community-modules.json', communityModulesJson);

  const startMarker = '{/* AUTO-GENERATED CONTENT () */}';
  const endMarker = '{/* END AUTO-GENERATED CONTENT */}';

  // Generate docs pages for each builtin module
  for (const mod of modules) {
    const fileExists = await stat(`../web-docs/docs/modules/${mod.name}.mdx`).catch(() => null);
    // This is also generated, but docusaurus takes the first content of the page as the title, so we cannot put the auto-generated content at the top
    const autoGeneratedContent = `---
description: ${mod.versions.find((v) => v.tag === 'latest')?.description}
---

${startMarker}

import { Commands, Config, CronJobs, Hooks } from './helpers';

# ${mod.name}

export function Module() {
  const mod = ${JSON.stringify(mod, null, 2)};

  return (
    <div>
      <p>{mod.versions[0].description}</p>
      <Commands commands={mod.versions[0].commands} />
      <CronJobs cronJobs={mod.versions[0].cronJobs} />
      <Hooks hooks={mod.versions[0].hooks} />
      <Config configSchema={mod.versions[0].configSchema} />
    </div>
  )
}

<Module />

${endMarker}`;

    // If file doesnt exist yet, create it
    if (!fileExists) {
      await writeFile(`../web-docs/docs/modules/${mod.name}.mdx`, autoGeneratedContent);
    } else {
      const existingFile = await readFile(`../web-docs/docs/modules/${mod.name}.mdx`, 'utf-8');
      // Otherwise, fine the auto generated content markers and replace it
      const end = existingFile.indexOf(endMarker) + endMarker.length;

      const newFile = autoGeneratedContent + existingFile.slice(end);
      await writeFile(`../web-docs/docs/modules/${mod.name}.mdx`, newFile);
    }
  }
}

main().catch(console.error);
