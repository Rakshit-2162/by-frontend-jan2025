from motor.motor_asyncio import AsyncIOMotorClient
from models.Models import Admin
from auth import create_jwt_token
import os
from dotenv import load_dotenv

load_dotenv()

class AdminServices:
    def __init__(self):
        mongo_url = os.getenv("MONGODB_URL")
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client['bankingapp']
        self.collection = self.db['admin-services']

    async def check_email(self, email: str):
        """Check if an email exists in the database."""
        email_found = await self.collection.find_one({'email': email})
        return email_found is not None

    async def sign_up(self, admin: Admin):
        """Registers a new user WITHOUT hashing the password."""
        email_exists = await self.check_email(admin.email)
        if email_exists:
            return None  # Email already exists

        admin_dict = admin.model_dump()  # Convert Pydantic model to dictionary
        
        await self.collection.insert_one(admin_dict)  # Store user with plaintext password

        return create_jwt_token(admin.email)  # Return JWT on signup (optional)

    async def login(self, email: str, password: str):
        """Validates user login WITHOUT password hashing."""
        existing_doc = await self.collection.find_one({'email': email})
        if not existing_doc:
            return None  # User not found

        stored_password = existing_doc['password']
        if stored_password == password:  # Compare plaintext password
            return create_jwt_token(email)  # Return JWT token on successful login
        
        return None  # Invalid password
