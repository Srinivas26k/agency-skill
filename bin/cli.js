#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

const BRAND = 'Agency Designer Skill';
const AUTHOR = 'by Srinivas Nampalli';

program
  .name('agency-designer')
  .description('The elite agency-grade design system for AI-assisted development.')
  .version('2.0.0');

program
  .command('init')
  .description('Bootstrap your project with Agency Designer rules and assets.')
  .argument('[dir]', 'Project directory', '.')
  .action(async (dir) => {
    console.log(`\nInitializing ${BRAND} ${AUTHOR} in ${dir}...\n`);

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
          console.log(`  [ok] Copying ${item.dest}...`);
          await fs.copy(src, dest);
        }
      }

      console.log(`\n${BRAND} successfully initialized.`);
      console.log(`\nNext steps:`);
      console.log(`1. Open this folder in Cursor, VS Code with Copilot, Kiro, Windsurf, Goose, or another supported IDE.`);
      console.log(`2. Load the local rules, skill files, or managed-agent docs for your platform.`);
      console.log(`3. Trigger your AI with /design, /animate, or a platform-specific agent workflow.\n`);

    } catch (err) {
      console.error('\nError during initialization:', err.message);
    }
  });

program
  .command('audit')
  .description('Audit your project against the Agency Designer Premium Rubric.')
  .action(() => {
    console.log(`\nRunning ${BRAND} quality audit...\n`);
    console.log('  Coming soon: full automated project scanning.');
    console.log('  For now, use /evaluate within your AI IDE.\n');
  });

program.parse();
