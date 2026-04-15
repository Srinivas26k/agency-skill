#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

const BRAND = 'Agency Designer';
const AUTHOR = 'by Srinivas Nampalli';

program
  .name('agency-skill')
  .description('Agency Designer — premium UI/UX, agent orchestration, and marketing for AI IDEs.')
  .version('2.0.2');

program
  .command('init')
  .description('Bootstrap your project with Agency Designer skill files.')
  .argument('[dir]', 'Target directory', '.')
  .action(async (dir) => {
    console.log(`\nInitializing ${BRAND} ${AUTHOR} in ${dir}...\n`);

    const targetDir = path.resolve(process.cwd(), dir);
    const sourceDir = path.resolve(__dirname, '..');

    const filesToCopy = [
      // Core skill entry points
      { src: 'skills/web-design/SKILL.md',      dest: 'SKILL.md' },
      { src: 'CLAUDE.md',                        dest: 'CLAUDE.md' },
      { src: 'GEMINI.md',                        dest: 'GEMINI.md' },
      { src: '.cursorrules',                     dest: '.cursorrules' },
      // Slash commands → .claude/commands/ for Claude Code native slash commands
      { src: 'commands/web-design.md',           dest: '.claude/commands/web-design.md' },
      { src: 'commands/agents-make.md',          dest: '.claude/commands/agents-make.md' },
      { src: 'commands/marketing-pro.md',        dest: '.claude/commands/marketing-pro.md' },
      // Agent definitions
      { src: 'agents',                           dest: 'agents' },
      // Design resource folder
      { src: 'skills/web-design/resources',      dest: 'agency-designer/resources' },
    ];

    try {
      await fs.ensureDir(targetDir);

      for (const item of filesToCopy) {
        const src = path.join(sourceDir, item.src);
        const dest = path.join(targetDir, item.dest);

        if (path.resolve(src) === path.resolve(dest)) {
          console.log(`  [skip] ${item.dest} — already in source repo`);
          continue;
        }

        if (await fs.pathExists(dest)) {
          console.log(`  [skip] ${item.dest} — already exists`);
          continue;
        }

        if (await fs.pathExists(src)) {
          await fs.ensureDir(path.dirname(dest));
          console.log(`  [ok]   ${item.dest}`);
          await fs.copy(src, dest);
        } else {
          console.log(`  [warn] ${item.src} not found — skipping`);
        }
      }

      console.log(`\n${BRAND} initialized.\n`);
      console.log(`Next steps:`);
      console.log(`  1. Open in Claude Code, Cursor, Copilot, Gemini, or any supported IDE`);
      console.log(`  2. Type /web-design, /agents-make, or /marketing-pro to activate a workflow\n`);

    } catch (err) {
      console.error('\nError during init:', err.message);
      process.exit(1);
    }
  });

program
  .command('audit')
  .description('Audit your project against Agency Designer Premium Standards.')
  .action(() => {
    console.log(`\nRunning ${BRAND} quality audit...\n`);
    console.log('  Use /web-design → @quality-auditor within your AI IDE for a full scored audit.\n');
  });

program.parse();
