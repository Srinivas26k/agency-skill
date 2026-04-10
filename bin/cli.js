#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

const BRAND = chalk.bold.magenta('Agency Designer Skill');
const AUTHOR = chalk.dim('by Srinivas Nampalli');

program
  .name('agency-designer')
  .description('The elite agency-grade design system for AI-assisted development.')
  .version('2.0.0');

program
  .command('init')
  .description('Bootstrap your project with Agency Designer rules and assets.')
  .argument('[dir]', 'Project directory', '.')
  .action(async (dir) => {
    console.log(`\n🚀 Initializing ${BRAND} ${AUTHOR} in ${chalk.blue(dir)}...\n`);

    const targetDir = path.resolve(process.cwd(), dir);
    const sourceDir = path.resolve(__dirname, '..');

    // Files/Folders to copy during initialization
    const filesToCopy = [
      { src: 'skills/agency-designer/SKILL.md', dest: 'SKILL.md' },
      { src: '.cursorrules', dest: '.cursorrules' },
      { src: '.claude-plugin/instructions.md', dest: 'CLAUDE.md' },
      { src: 'docs/AGENCY_DESIGNER.md', dest: 'AGENCY_DESIGNER.md' },
      { src: 'skills/agency-designer/resources/core', dest: 'core' },
      { src: 'agents', dest: 'agents' },
      { src: 'skills/agency-designer/resources/commands', dest: 'commands' },
      { src: 'skills/agency-designer/resources/animations', dest: 'animations' },
      { src: 'skills/agency-designer/resources/psychology', dest: 'psychology' },
      { src: 'skills/agency-designer/resources/styles', dest: 'styles' }
    ];

    try {
      await fs.ensureDir(targetDir);

      for (const item of filesToCopy) {
        const src = path.join(sourceDir, item.src);
        const dest = path.join(targetDir, item.dest);

        if (await fs.pathExists(src)) {
          console.log(`  ${chalk.green('✔')} Copying ${item.dest}...`);
          await fs.copy(src, dest);
        }
      }

      console.log(`\n✨ ${BRAND} successfully initialized!`);
      console.log(`\n${chalk.bold('Next Steps:')}`);
      console.log(`1. Open this folder in ${chalk.cyan('Cursor')}, ${chalk.cyan('Windsurf')}, or ${chalk.cyan('VS Code')}.`);
      console.log(`2. Trigger your AI with ${chalk.magenta('/design')} or ${chalk.magenta('/animate')}.`);
      console.log(`3. Build something premium. 💎\n`);

    } catch (err) {
      console.error(chalk.red('\n✖ Error during initialization:'), err.message);
    }
  });

program
  .command('audit')
  .description('Audit your project against the Agency Designer Premium Rubric.')
  .action(() => {
    console.log(`\n🛡 Running ${BRAND} quality audit...\n`);
    console.log(chalk.yellow('  Coming soon: Full automated project scanning.'));
    console.log(`  For now, use ${chalk.bold('/evaluate')} within your AI IDE.\n`);
  });

program.parse();
