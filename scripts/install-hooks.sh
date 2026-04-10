#!/bin/bash

set -e

if [ ! -d ".git/hooks" ]; then
    echo "Git hooks directory not found. Skipping hook installation."
    exit 0
fi

for hook in hooks/*.sh; do
    [ -e "$hook" ] || continue

    hook_name=$(basename "$hook" .sh)
    target=".git/hooks/$hook_name"
    cp "$hook" "$target"
    chmod +x "$target"
    echo "Installed hook: $hook_name"
done