from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

MODEL_DIR = Path("/models/flux")


class GenerateRequest(BaseModel):
    prompt: str


def verify_model_dir() -> None:
    if not MODEL_DIR.exists() or not MODEL_DIR.is_dir():
        raise HTTPException(
            status_code=500,
            detail="FLUX model directory is missing. Mount a host path to /models/flux.",
        )
    if not any(MODEL_DIR.iterdir()):
        raise HTTPException(
            status_code=500,
            detail="FLUX model directory is empty. Provide offline model files.",
        )


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.post("/generate")
async def generate(request: GenerateRequest) -> dict:
    verify_model_dir()
    return {
        "status": "ok",
        "message": "Offline FLUX model available.",
        "prompt": request.prompt,
    }
