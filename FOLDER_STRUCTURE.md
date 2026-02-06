# Docker-based Monorepo Folder Structure

```
aitoolbox/
├── .env.example
├── .gitignore
├── README.md
├── docker-compose.yml
├── package.json
│
├── apps/
│   └── web/                           # Next.js + Payload CMS
│       ├── Dockerfile
│       ├── next.config.js
│       ├── package.json
│       ├── tsconfig.json
│       ├── public/
│       └── src/
│           ├── app/
│           ├── components/
│           ├── lib/
│           └── payload/
│               ├── collections/
│               └── globals/
│
├── services/
│   ├── flux-api/                      # FastAPI - Flux AI Service
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── app/
│   │   │   ├── __init__.py
│   │   │   ├── main.py
│   │   │   ├── api/
│   │   │   │   ├── __init__.py
│   │   │   │   └── v1/
│   │   │   │       └── __init__.py
│   │   │   ├── core/
│   │   │   │   └── __init__.py
│   │   │   ├── models/
│   │   │   │   └── __init__.py
│   │   │   ├── schemas/
│   │   │   │   └── __init__.py
│   │   │   └── services/
│   │   │       └── __init__.py
│   │   └── tests/
│   │
│   └── social-api/                    # FastAPI - Social Media Service
│       ├── Dockerfile
│       ├── requirements.txt
│       ├── app/
│       │   ├── __init__.py
│       │   ├── main.py
│       │   ├── api/
│       │   │   ├── __init__.py
│       │   │   └── v1/
│       │   │       └── __init__.py
│       │   ├── core/
│       │   │   └── __init__.py
│       │   ├── models/
│       │   │   └── __init__.py
│       │   ├── schemas/
│       │   │   └── __init__.py
│       │   └── services/
│       │       └── __init__.py
│       └── tests/
│
├── worker/                            # Celery Background Worker
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── src/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── handlers/
│   │   │   └── __init__.py
│   │   └── tasks/
│   │       └── __init__.py
│   └── tests/
│
├── infrastructure/
│   ├── traefik/                       # Traefik Reverse Proxy
│   │   └── config/
│   │       └── traefik.toml
│   ├── postgres/                      # PostgreSQL Database
│   │   └── init.sql
│   └── redis/                         # Redis Cache
│       └── redis.conf
│
├── shared/                            # Shared Code
│   ├── lib/
│   │   └── README.md
│   ├── types/
│   │   └── README.md
│   └── config/
│       └── README.md
│
├── scripts/                           # Utility Scripts
│   ├── dev.sh
│   └── build.sh
│
└── docs/                              # Documentation
    └── README.md
```

## Summary

This Docker-based monorepo structure includes:

### Applications (apps/)
- **web**: Next.js 14 + Payload CMS application

### Services (services/)
- **flux-api**: FastAPI service for AI generation (Flux)
- **social-api**: FastAPI service for social media integration

### Worker (worker/)
- **Celery worker**: Background task processing

### Infrastructure (infrastructure/)
- **Traefik**: Reverse proxy and load balancer
- **PostgreSQL**: Primary database
- **Redis**: Cache and message broker

### Shared (shared/)
- Common libraries, types, and configuration

### Configuration Files
- `docker-compose.yml`: Orchestrates all services
- `.env.example`: Environment variables template
- `package.json`: Root workspace configuration
- `.gitignore`: Git ignore rules

### Scripts
- `dev.sh`: Start development environment
- `build.sh`: Build production images

All services are containerized with Docker and orchestrated using Docker Compose, providing a complete microservices architecture ready for development and deployment.
