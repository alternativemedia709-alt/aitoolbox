from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Social API v1"}
