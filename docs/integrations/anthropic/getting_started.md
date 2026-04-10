# Get started with Claude Managed Agents

Create your first autonomous agent.

---

This guide walks you through creating an agent, setting up an environment, starting a session, and streaming agent responses.

## Core concepts

| Concept | Description |
|---------|-------------|
| **Agent** | The model, system prompt, tools, MCP servers, and skills |
| **Environment** | A configured container template (packages, network access) |
| **Session** | A running agent instance within an environment, performing a specific task and generating outputs |
| **Events** | Messages exchanged between your application and the agent (user turns, tool results, status updates) |

## Prerequisites

- An Anthropic Console account
- An API key

## Install the CLI

### Homebrew (macOS)
```bash
brew install anthropics/tap/ant
xattr -d com.apple.quarantine "$(brew --prefix)/bin/ant"
```

### curl (Linux/WSL)
```bash
VERSION=1.0.0
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m | sed -e 's/x86_64/amd64/' -e 's/aarch64/arm64/')
curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION}_${OS}_${ARCH}.tar.gz" \
  | sudo tar -xz -C /usr/local/bin ant
```

Check the installation:
```bash
ant --version
```

## Install the SDK (TypeScript)
```bash
npm install @anthropic-ai/sdk
```

Set your API key as an environment variable:
```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```
