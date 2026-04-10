#!/bin/bash

set -e

echo "Running pre-commit checks..."
npm test
node scripts/validate-docs.js
node scripts/build-knowledge-graph.js