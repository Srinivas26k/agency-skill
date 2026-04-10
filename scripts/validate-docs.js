const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const requiredFiles = [
  'README.md',
  'agents/AGENT.md',
  'docs/integrations/UNIVERSAL_AGENT_PLAYBOOK.md',
  'docs/integrations/MANAGED_AGENTS_AND_MODEL_ROUTING.md',
  'docs/integrations/anthropic/managed_agents_overview.md',
  'docs/integrations/anthropic/tools.md',
  'docs/integrations/anthropic/mcp_connector.md',
  '.github/copilot-instructions.md',
  'skills/agency-designer/SKILL.md'
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