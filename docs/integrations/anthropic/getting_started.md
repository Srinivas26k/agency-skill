# Get Started with Claude Managed Agents

This guide walks through the minimum path to a working managed-agent flow: create an agent, create an environment, start a session, send an event, and stream the result.

## Prerequisites

- An Anthropic account.
- An API key exported as `ANTHROPIC_API_KEY`.
- The Managed Agents beta enabled, which is on by default for supported API accounts.

## Install the CLI

### macOS

```bash
brew install anthropics/tap/ant
xattr -d com.apple.quarantine "$(brew --prefix)/bin/ant"
```

### Linux or WSL

```bash
VERSION=1.0.0
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m | sed -e 's/x86_64/amd64/' -e 's/aarch64/arm64/')
curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION}_${OS}_${ARCH}.tar.gz" \
  | sudo tar -xz -C /usr/local/bin ant
```

### Go install

```bash
go install github.com/anthropics/anthropic-cli/cmd/ant@latest
export PATH="$PATH:$(go env GOPATH)/bin"
```

Verify the installation:

```bash
ant --version
```

## Install an SDK

Common options:

- Python: `pip install anthropic`
- TypeScript: `npm install @anthropic-ai/sdk`
- Go: `go get github.com/anthropics/anthropic-sdk-go`
- Java: `implementation("com.anthropic:anthropic-java:2.20.0")`
- C#: `dotnet add package Anthropic`

Export your API key:

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

## Beta header requirement

All raw HTTP requests must include:

```text
anthropic-beta: managed-agents-2026-04-01
```

Official SDKs handle this automatically.

## Quickstart flow

### 1. Create an agent

```bash
agent=$(
  curl -sS --fail-with-body https://api.anthropic.com/v1/agents \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: managed-agents-2026-04-01" \
    -H "content-type: application/json" \
    -d @- <<'EOF'
{
  "name": "Coding Assistant",
  "model": "claude-sonnet-4-6",
  "system": "You are a helpful coding assistant. Write clean, well-documented code.",
  "tools": [
    {"type": "agent_toolset_20260401"}
  ]
}
EOF
)

AGENT_ID=$(jq -er '.id' <<<"$agent")
AGENT_VERSION=$(jq -er '.version' <<<"$agent")
echo "Agent ID: $AGENT_ID, version: $AGENT_VERSION"
```

### 2. Create an environment

```bash
environment=$(
  curl -sS --fail-with-body https://api.anthropic.com/v1/environments \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: managed-agents-2026-04-01" \
    -H "content-type: application/json" \
    -d @- <<'EOF'
{
  "name": "quickstart-env",
  "config": {
    "type": "cloud",
    "networking": {"type": "unrestricted"}
  }
}
EOF
)

ENVIRONMENT_ID=$(jq -er '.id' <<<"$environment")
echo "Environment ID: $ENVIRONMENT_ID"
```

### 3. Start a session

```bash
session=$(
  curl -sS --fail-with-body https://api.anthropic.com/v1/sessions \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: managed-agents-2026-04-01" \
    -H "content-type: application/json" \
    -d @- <<EOF
{
  "agent": "$AGENT_ID",
  "environment_id": "$ENVIRONMENT_ID",
  "title": "Quickstart session"
}
EOF
)

SESSION_ID=$(jq -er '.id' <<<"$session")
echo "Session ID: $SESSION_ID"
```

### 4. Send a message and stream events

```bash
curl -sS --fail-with-body \
  "https://api.anthropic.com/v1/sessions/$SESSION_ID/events" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d @- >/dev/null <<'EOF'
{
  "events": [
    {
      "type": "user.message",
      "content": [
        {
          "type": "text",
          "text": "Create a Python script that generates the first 20 Fibonacci numbers and saves them to fibonacci.txt"
        }
      ]
    }
  ]
}
EOF

while IFS= read -r line; do
  [[ $line == data:* ]] || continue
  json=${line#data: }
  case $(jq -r '.type' <<<"$json") in
    agent.message)
      jq -j '.content[] | select(.type == "text") | .text' <<<"$json"
      ;;
    agent.tool_use)
      printf '\n[Using tool: %s]\n' "$(jq -r '.name' <<<"$json")"
      ;;
    session.status_idle)
      printf '\n\nAgent finished.\n'
      break
      ;;
  esac
done < <(
  curl -sS -N --fail-with-body \
    "https://api.anthropic.com/v1/sessions/$SESSION_ID/stream" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: managed-agents-2026-04-01" \
    -H "Accept: text/event-stream"
)
```

## What happens next

When the event is sent, the runtime:

1. Provisions the container from the selected environment.
2. Runs the agent loop.
3. Executes tools inside the container.
4. Streams messages, tool uses, and status changes.
5. Emits `session.status_idle` when work is complete.

## Recommended follow-up docs

- `define_your_agent.md`
- `tools.md`
- `mcp_connector.md`
- `skills.md`
- `container_reference.md`
