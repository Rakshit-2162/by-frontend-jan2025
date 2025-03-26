import os
from dotenv import load_dotenv
import jwt
import datetime
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")
ALGORITHM = "HS256"
TOKEN_EXPIRY_MINUTES = 30

security = HTTPBearer()

def create_jwt_token(email: str):
    """Generate JWT token."""
    expiration = datetime.datetime.now() + datetime.timedelta(minutes=TOKEN_EXPIRY_MINUTES)
    payload = {"sub": email, "exp": expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_jwt_token(token: str):
    """Decode JWT and return user email."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Extract current user from JWT token in request headers."""
    return decode_jwt_token(credentials.credentials)
