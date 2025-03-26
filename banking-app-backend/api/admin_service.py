from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from services.AdminServices import AdminServices
from models.Models import Admin

router = APIRouter()
admin_services = AdminServices()

@router.post("/sign_up")
async def sign_up(admin: Admin):
    token = await admin_services.sign_up(admin)
    if not token:
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"token": token}

@router.post("/login")
async def login(data: dict):
    email = data.get("email")
    password = data.get("password")
    token = await admin_services.login(email, password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": token}

@router.get("/protected-route")
async def protected_route(user: str = Depends(get_current_user)):
    return {"message": "Welcome to the protected route!", "user": user}
    
    