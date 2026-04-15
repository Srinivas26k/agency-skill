const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const outputPath = path.join(repoRoot, 'skills', 'web-design', 'knowledge-graph.json');

const nodes = [
  { id: 'web-design-skill', type: 'skill', label: 'Web Design', path: 'skills/web-design/SKILL.md', tags: ['frontend', 'design-system', 'ux'] },
  { id: 'agents-make-skill', type: 'skill', label: 'Agents Make', path: 'skills/agents-make/SKILL.md', tags: ['agents', 'orchestration', 'delegation'] },
  { id: 'marketing-pro-skill', type: 'skill', label: 'Marketing Pro', path: 'skills/marketing-pro/SKILL.md', tags: ['marketing', 'copy', 'conversion'] },
  { id: 'cmd-web-design', type: 'command', label: '/web-design', path: 'commands/web-design.md', tags: ['slash-command'] },
  { id: 'cmd-agents-make', type: 'command', label: '/agents-make', path: 'commands/agents-make.md', tags: ['slash-command'] },
  { id: 'cmd-marketing-pro', type: 'command', label: '/marketing-pro', path: 'commands/marketing-pro.md', tags: ['slash-command'] },
  { id: 'visual-director', type: 'agent', label: 'Visual Director', path: 'agents/visual-director.md', tags: ['design', 'palette', 'typography'] },
  { id: 'motion-engineer', type: 'agent', label: 'Motion Engineer', path: 'agents/motion-engineer.md', tags: ['gsap', 'animation', 'scroll'] },
  { id: 'copy-strategist', type: 'agent', label: 'Copy Strategist', path: 'agents/copy-strategist.md', tags: ['copy', 'cta', 'headlines'] },
  { id: 'quality-auditor', type: 'agent', label: 'Quality Auditor', path: 'agents/quality-auditor.md', tags: ['rubric', 'audit', 'quality'] },
  { id: 'universal-playbook', type: 'integration', label: 'Universal Playbook', path: 'docs/integrations/UNIVERSAL_AGENT_PLAYBOOK.md', tags: ['platforms', 'adapters'] },
];

const edges = [
  ['cmd-web-design', 'web-design-skill', 'activates'],
  ['cmd-agents-make', 'agents-make-skill', 'activates'],
  ['cmd-marketing-pro', 'marketing-pro-skill', 'activates'],
  ['web-design-skill', 'visual-director', 'spawns'],
  ['web-design-skill', 'motion-engineer', 'spawns'],
  ['web-design-skill', 'copy-strategist', 'spawns'],
  ['web-design-skill', 'quality-auditor', 'spawns'],
  ['agents-make-skill', 'quality-auditor', 'spawns'],
  ['marketing-pro-skill', 'copy-strategist', 'spawns'],
  ['marketing-pro-skill', 'quality-auditor', 'spawns'],
].map(([from, to, relation]) => ({ from, to, relation }));

const graph = {
  generatedAt: new Date().toISOString(),
  description: 'Graph-oriented context map for Agency Designer. Use connected nodes instead of flat repo-wide indexing to reduce context load.',
  nodes,
  edges
};

fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2));
console.log(`Knowledge graph written to ${outputPath}`);