#!/bin/bash

# Production build script
echo "Building AIToolbox for production..."

# Build all services
docker-compose -f docker-compose.yml build --no-cache

echo "Build complete!"
