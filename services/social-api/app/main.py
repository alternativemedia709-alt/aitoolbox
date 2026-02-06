import os
from typing import Any

import httpx
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "bggpt9")
FLUX_API_URL = os.getenv("FLUX_API_URL", "http://flux-api:8000")


class GenerateRequest(BaseModel):
    prompt: str
    include_image: bool = False
    image_prompt: str | None = None


class GenerateResponse(BaseModel):
    text: str
    image: dict[str, Any] | None = None


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.post("/generate", response_model=GenerateResponse)
async def generate(request: GenerateRequest) -> GenerateResponse:
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": request.prompt,
        "stream": False,
    }

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(f"{OLLAMA_URL}/api/generate", json=payload)
            response.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Ollama request failed: {exc}",
        ) from exc

    data = response.json()
    text = data.get("response")
    if not text:
        raise HTTPException(status_code=502, detail="Ollama returned an empty response.")

    image_payload = None
    if request.include_image:
        flux_prompt = request.image_prompt or request.prompt
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                flux_response = await client.post(
                    f"{FLUX_API_URL}/generate",
                    json={"prompt": flux_prompt},
                )
                flux_response.raise_for_status()
                image_payload = flux_response.json()
        except httpx.HTTPError as exc:
            raise HTTPException(
                status_code=502,
                detail=f"Flux API request failed: {exc}",
            ) from exc

    return GenerateResponse(text=text, image=image_payload)
