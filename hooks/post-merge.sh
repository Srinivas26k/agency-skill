#!/bin/bash

set -e

echo "Refreshing Agency Designer graph after merge..."
node scripts/build-knowledge-graph.js
node scripts/validate-docs.js