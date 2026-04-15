const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const requiredFiles = [
  'README.md',
  'CLAUDE.md',
  'GEMINI.md',
  'skill.json',
  'commands/web-design.md',
  'commands/agents-make.md',
  'commands/marketing-pro.md',
  'skills/web-design/SKILL.md',
  'skills/agents-make/SKILL.md',
  'skills/marketing-pro/SKILL.md',
  'agents/visual-director.md',
  'agents/quality-auditor.md',
  'docs/integrations/UNIVERSAL_AGENT_PLAYBOOK.md',
  '.github/copilot-instructions.md',
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(repoRoot, file)));

if (missing.length > 0) {
  console.error('Missing required documentation files:');
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log('Documentation validation passed.');