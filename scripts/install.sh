#!/bin/bash
# Agency Designer installation script

set -e

echo "Initializing Agency Designer environment..."

# Check for Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "Error: Node.js is not installed. Please install Node.js >= 18."
    exit 1
fi

# Check for npm
if ! command -v npm >/dev/null 2>&1; then
    echo "Error: npm is not installed."
    exit 1
fi

echo "Environment check passed."

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "Installing dependencies..."
    npm install --quiet
fi

if [ -f "bin/cli.js" ]; then
    chmod +x bin/cli.js
    echo "CLI binary permissions granted."
fi

if [ -f "scripts/install-hooks.sh" ]; then
    bash scripts/install-hooks.sh
fi

if [ -f "scripts/build-knowledge-graph.js" ]; then
    node scripts/build-knowledge-graph.js
fi

if [ -f "scripts/validate-docs.js" ]; then
    node scripts/validate-docs.js
fi

echo "Agency Designer is ready for development."
