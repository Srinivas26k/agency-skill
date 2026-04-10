#!/bin/bash
# High-End Agency Designer Installation Script
# Check environment and setup local binaries

set -e

echo "🚀 Initializing Agency Designer Environment..."

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

echo "✔ Environment check passed."

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "✔ Installing dependencies..."
    npm install --quiet
fi

# Setup local bin symlink if possible
if [ -f "bin/cli.js" ]; then
    chmod +x bin/cli.js
    echo "✔ CLI binary permissions granted."
fi

echo "✨ Agency Designer System is ready for development."
