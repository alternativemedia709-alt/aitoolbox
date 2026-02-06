from fastapi import FastAPI
from app.api.v1 import router as api_router

app = FastAPI(
    title="Social API",
    description="Social media integration service",
    version="1.0.0"
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
