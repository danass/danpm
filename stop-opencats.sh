#!/bin/bash

# Script to stop OpenCATS

echo "🛑 Stopping OpenCATS..."

cd opencats/docker

if [ -f docker-compose.yml ]; then
    docker-compose down
    echo "✅ OpenCATS stopped!"
else
    echo "❌ OpenCATS not found. Make sure you've cloned the repository."
fi
