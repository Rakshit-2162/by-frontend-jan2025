from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from models.Models import FundTransfer
from services.AccountServices import AccountServices

class FundTransferServices:
    def __init__(self):
        self.client = AsyncIOMotorClient("MongoURL")
        self.db = self.client['bankingapp']
        self.collection = self.db['fund-transfers']
        self.account_services = AccountServices()

    async def process_fund_transfer(self, fundTransfer: FundTransfer):        
        withdrawal_success = await self.account_services.withdraw(fundTransfer.sourceAccountId, fundTransfer.amount)
        if not withdrawal_success:
            return False
        
        deposit_success = await self.account_services.deposit(fundTransfer.targetAccountId, fundTransfer.amount)
        if not deposit_success:
            await self.account_services.deposit(fundTransfer.targetAccountId, fundTransfer.amount)
            return False
        
        await self.collection.insert_one(fundTransfer.model_dump())
        return True
