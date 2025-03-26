from motor.motor_asyncio import AsyncIOMotorClient
from models.Models import FundTransfer
from services.AccountServices import AccountServices
import os
from dotenv import load_dotenv

load_dotenv()

class FundTransferServices:
    def __init__(self):
<<<<<<< HEAD:bank-management/services/FundTransferServices.py
        self.client = AsyncIOMotorClient("MongoURL")
=======
        mongo_url = os.getenv("MONGODB_URL")
        self.client = AsyncIOMotorClient(mongo_url)
>>>>>>> d6c0024 (Final Commit):banking-app-backend/services/FundTransferServices.py
        self.db = self.client['bankingapp']
        self.collection = self.db['fund-transfers']
        self.account_services = AccountServices()

    async def get_all_fund_transfers(self):
        fund_transfers = await self.collection.find().to_list(length=None)
        return [FundTransfer(**transfer) for transfer in fund_transfers]

    async def process_fund_transfer(self, fundTransfer: FundTransfer):
                
        withdrawal_success = await self.account_services.withdraw(fundTransfer.sourceAccountId, fundTransfer.amount, fundTransfer.description)
        if not withdrawal_success:
            return False
        
        deposit_success = await self.account_services.deposit(fundTransfer.targetAccountId, fundTransfer.amount, fundTransfer.description)
        if not deposit_success:
            return False
        
        await self.collection.insert_one(fundTransfer.model_dump())
        return True
