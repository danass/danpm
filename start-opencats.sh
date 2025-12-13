#!/bin/bash

# Script to start OpenCATS for CV testing

echo "🚀 Starting OpenCATS..."

cd opencats/docker

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! docker ps &> /dev/null; then
    echo "❌ Docker is not running!"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "📦 Starting OpenCATS containers..."
docker-compose up -d

echo ""
echo "✅ OpenCATS is starting!"
echo ""
echo "🌐 Access OpenCATS at: http://localhost"
echo ""
echo "📝 Next steps:"
echo "   1. Wait a few seconds for containers to start"
echo "   2. Open http://localhost in your browser"
echo "   3. Follow the installation wizard"
echo "   4. Upload your CV PDF to test ATS parsing"
echo ""
echo "🛑 To stop OpenCATS, run: ./stop-opencats.sh"
