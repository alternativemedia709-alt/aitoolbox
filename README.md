# AIToolbox - Docker-based Monorepo

A comprehensive Docker-based monorepo with Next.js + Payload, FastAPI services, worker, Traefik, PostgreSQL, and Redis.

## Folder Structure

```
aitoolbox/
├── apps/
│   └── web/                        # Next.js + Payload CMS application
│       ├── src/
│       │   ├── app/                # Next.js app directory
│       │   ├── components/         # React components
│       │   ├── lib/                # Utility libraries
│       │   └── payload/            # Payload CMS configuration
│       │       ├── collections/    # Payload collections
│       │       └── globals/        # Payload globals
│       ├── public/                 # Static assets
│       ├── Dockerfile
│       ├── package.json
│       ├── tsconfig.json
│       └── next.config.js
│
├── services/
│   ├── flux-api/                   # FastAPI - Flux AI service
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   └── v1/            # API v1 endpoints
│   │   │   ├── core/              # Core functionality
│   │   │   ├── models/            # Database models
│   │   │   ├── schemas/           # Pydantic schemas
│   │   │   ├── services/          # Business logic
│   │   │   └── main.py            # FastAPI app entry
│   │   ├── tests/                 # Unit tests
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── social-api/                 # FastAPI - Social media service
│       ├── app/
│       │   ├── api/
│       │   │   └── v1/            # API v1 endpoints
│       │   ├── core/              # Core functionality
│       │   ├── models/            # Database models
│       │   ├── schemas/           # Pydantic schemas
│       │   ├── services/          # Business logic
│       │   └── main.py            # FastAPI app entry
│       ├── tests/                 # Unit tests
│       ├── Dockerfile
│       └── requirements.txt
│
├── worker/                         # Background worker service
│   ├── src/
│   │   ├── tasks/                 # Celery tasks
│   │   ├── handlers/              # Task handlers
│   │   └── main.py                # Worker entry point
│   ├── tests/
│   ├── Dockerfile
│   └── requirements.txt
│
├── infrastructure/                 # Infrastructure configuration
│   ├── traefik/
│   │   └── config/
│   │       └── traefik.toml       # Traefik configuration
│   ├── postgres/
│   │   └── init.sql               # Database initialization
│   └── redis/
│       └── redis.conf             # Redis configuration
│
├── shared/                         # Shared code across services
│   ├── lib/                       # Shared libraries
│   ├── types/                     # Shared TypeScript types
│   └── config/                    # Shared configuration
│
├── scripts/                        # Utility scripts
│   ├── dev.sh                     # Development startup
│   └── build.sh                   # Production build
│
├── docs/                          # Documentation
│   └── README.md
│
├── docker-compose.yml             # Docker Compose configuration
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── package.json                   # Root package.json (workspace)
└── README.md                      # This file
```

## Services

### 1. **Web App** (Next.js + Payload CMS)
- **Port**: 3000
- **Framework**: Next.js 14 with React 18
- **CMS**: Payload CMS for content management
- **Purpose**: Frontend application with integrated CMS

### 2. **Flux API** (FastAPI)
- **Port**: 8000
- **Framework**: FastAPI with Python 3.11
- **Purpose**: AI generation service (Flux)
- **Endpoints**: `/api/flux/*`

### 3. **Social API** (FastAPI)
- **Port**: 8001
- **Framework**: FastAPI with Python 3.11
- **Purpose**: Social media integration service
- **Endpoints**: `/api/social/*`

### 4. **Worker** (Celery)
- **Framework**: Celery with Redis broker
- **Purpose**: Background task processing
- **Tasks**: Async job processing, scheduled tasks

### 5. **Traefik** (Reverse Proxy)
- **Port**: 80 (HTTP), 8080 (Dashboard)
- **Purpose**: Reverse proxy and load balancer
- **Features**: Automatic service discovery, routing

### 6. **PostgreSQL**
- **Port**: 5432
- **Version**: 15 Alpine
- **Purpose**: Primary database
- **Features**: Persistent data storage

### 7. **Redis**
- **Port**: 6379
- **Version**: 7 Alpine
- **Purpose**: Cache and message broker
- **Features**: Session storage, task queue

## Getting Started

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aitoolbox
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the development environment**
   ```bash
   docker-compose up --build
   ```

4. **Access services**
   - Web App: http://localhost:3000
   - Flux API: http://localhost:8000/docs
   - Social API: http://localhost:8001/docs
   - Traefik Dashboard: http://localhost:8080

### Development Scripts

```bash
# Start all services
npm run dev
# or
./scripts/dev.sh

# Build all services
npm run build
# or
./scripts/build.sh

# Stop all services
npm run down

# Clean up (remove volumes)
npm run clean

# View logs
npm run logs
```

## Architecture

This monorepo follows a microservices architecture with:

- **Frontend**: Next.js app with Payload CMS
- **Backend Services**: Multiple FastAPI services for different domains
- **Worker**: Background task processing with Celery
- **Infrastructure**: Traefik for routing, PostgreSQL for data, Redis for caching
- **Networking**: All services communicate through a Docker network

## Development

### Adding a New Service

1. Create service directory under `services/`
2. Add Dockerfile and requirements
3. Update `docker-compose.yml`
4. Configure Traefik labels for routing

### Shared Code

Place reusable code in the `shared/` directory:
- `shared/lib/` - Utility functions
- `shared/types/` - TypeScript type definitions
- `shared/config/` - Configuration files

## Testing

Each service has its own test suite:

```bash
# Test web app
cd apps/web && npm test

# Test API service
cd services/flux-api && pytest

# Test worker
cd worker && pytest
```

## Deployment

Build production images:

```bash
docker-compose build --no-cache
```

Push to registry:

```bash
docker-compose push
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally with Docker Compose
4. Submit a pull request

## License

[Your License Here]
