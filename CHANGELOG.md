# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.2] - 2026-04-15
### Added
- Three top-level slash commands: `/web-design`, `/agents-make`, `/marketing-pro`
- Five individual agent role files: `@visual-director`, `@motion-engineer`, `@copy-strategist`, `@quality-auditor`, `@brief-analyst`
- `skills/web-design/`, `skills/agents-make/`, `skills/marketing-pro/` — one folder per skill namespace
- `GEMINI.md` Gemini platform adapter
- `.claude-plugin/plugin.json` with proper command registrations
- `design.md` generation built into `/web-design` workflow

### Changed
- Unified naming to `agency-skill` everywhere — removed `agency-designer` bin alias
- `skills/agency-designer/` replaced by three focused skill folders
- All platform adapters (CLAUDE.md, .cursorrules, copilot-instructions.md) updated to new structure
- CLI `init` now copies commands to `.claude/commands/` for native Claude Code slash command support
- `/agents-make` now outputs full Anthropic Managed Agents schema (name, model, system, tools, mcp_servers, skills, callable_agents)

### Removed
- Duplicate root-level `core/`, `animations/`, `psychology/`, `styles/` folders
- Root-level `SKILL.md` and `AGENCY_DESIGNER.md` (replaced by skill-namespaced files)
- `commands/SLASH_COMMANDS.md` (replaced by individual command files)

## [2.0.1] - 2026-04-10
### Changed
- Bumped package version after npm publish conflict on `2.0.0`.
- Updated package metadata to better reflect full agency workflow coverage.
- Applied npm package.json publish-time normalization.

## [2.0.0] - 2026-04-10
### Added
- Complete professional repository structuring.
- New configurations for Cursor, Claude, Codex, OpenCode, and Gemini.
- Comprehensive documentation overhaul and SEO optimization.
