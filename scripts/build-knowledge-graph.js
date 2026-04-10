const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const outputPath = path.join(repoRoot, 'skills', 'agency-designer', 'knowledge-graph.json');

const nodes = [
  {
    id: 'skill-core',
    type: 'skill',
    label: 'Agency Designer Core',
    path: 'skills/agency-designer/SKILL.md',
    tags: ['frontend', 'design-system', 'agency', 'ux']
  },
  {
    id: 'agent-orchestration',
    type: 'agent',
    label: 'Agent Orchestration',
    path: 'agents/AGENT.md',
    tags: ['delegation', 'planning', 'quality-gates']
  },
  {
    id: 'universal-playbook',
    type: 'integration',
    label: 'Universal Agent Playbook',
    path: 'docs/integrations/UNIVERSAL_AGENT_PLAYBOOK.md',
    tags: ['adapter-model', 'platforms', 'runtime']
  },
  {
    id: 'managed-agents',
    type: 'integration',
    label: 'Claude Managed Agents',
    path: 'docs/integrations/anthropic/managed_agents_overview.md',
    tags: ['managed-runtime', 'anthropic', 'sessions', 'tools']
  },
  {
    id: 'model-routing',
    type: 'integration',
    label: 'Managed Agents and Model Routing',
    path: 'docs/integrations/MANAGED_AGENTS_AND_MODEL_ROUTING.md',
    tags: ['multi-model', 'mcp', 'custom-tools', 'routing']
  },
  {
    id: 'copilot-adapter',
    type: 'platform',
    label: 'GitHub Copilot Adapter',
    path: '.github/copilot-instructions.md',
    tags: ['copilot', 'vscode', 'repo-guidance']
  },
  {
    id: 'gemini-adapter',
    type: 'platform',
    label: 'Gemini Adapter',
    path: 'docs/integrations/GEMINI.md',
    tags: ['gemini', 'adapter']
  },
  {
    id: 'motion-library',
    type: 'resource',
    label: 'Motion Patterns',
    path: 'skills/agency-designer/resources/animations/GSAP_ANIMATIONS.md',
    tags: ['gsap', 'framer-motion', 'animejs', 'frontend']
  },
  {
    id: 'color-psychology',
    type: 'resource',
    label: 'Color Psychology',
    path: 'skills/agency-designer/resources/psychology/COLOR_PSYCHOLOGY.md',
    tags: ['branding', 'palette', 'conversion']
  }
];

const edges = [
  ['skill-core', 'agent-orchestration', 'drives'],
  ['skill-core', 'motion-library', 'includes'],
  ['skill-core', 'color-psychology', 'includes'],
  ['universal-playbook', 'managed-agents', 'maps-runtime'],
  ['universal-playbook', 'copilot-adapter', 'maps-platform'],
  ['universal-playbook', 'gemini-adapter', 'maps-platform'],
  ['managed-agents', 'model-routing', 'extends-with'],
  ['managed-agents', 'agent-orchestration', 'hosts'],
  ['copilot-adapter', 'skill-core', 'loads'],
  ['gemini-adapter', 'skill-core', 'loads']
].map(([from, to, relation]) => ({ from, to, relation }));

const graph = {
  generatedAt: new Date().toISOString(),
  description: 'Graph-oriented context map for Agency Designer. Use connected nodes instead of flat repo-wide indexing to reduce context load.',
  nodes,
  edges
};

fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2));
console.log(`Knowledge graph written to ${outputPath}`);