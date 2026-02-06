# aitoolbox

Docker-based monorepo for a Next.js web app, Payload CMS, FastAPI services, and background workers.

## Quick start

1. Copy env file and edit values:

```bash
cp .env.example .env
```

2. Start the stack:

```bash
docker compose up --build
```

To run GPU-dependent services (flux-api, worker, gpu-check), enable the gpu profile:

```bash
docker compose --profile gpu up --build
```

## Services

- `web`: Next.js app with Payload CMS exposed via Traefik
- `flux-api`: FastAPI service for FLUX (internal, offline models)
- `social-api`: FastAPI service (internal)
- `worker`: Python RQ worker (internal)
- `traefik`: edge router for the web app only
- `postgres`: database
- `redis`: cache/queue
- `ollama`: local LLM runtime
- `ollama-init`: one-shot model pull for `bggpt9`
- `gpu-check`: prints `nvidia-smi` to verify GPU access

## Offline FLUX models

The `flux-api` and `worker` containers mount your local model directory as read-only:

```
${FLUX_MODEL_DIR} -> /models/flux:ro
```

Set `FLUX_MODEL_DIR` in your `.env` to a host path that already contains FLUX model weights.
The containers run in offline mode and do not call Hugging Face.

## Traefik routing

Traefik only exposes the `web` service. Internal APIs are not routed externally.
