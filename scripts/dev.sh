#!/bin/bash

# Development startup script
echo "Starting AIToolbox development environment..."

# Copy .env.example to .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

# Build and start all services
docker-compose up --build
