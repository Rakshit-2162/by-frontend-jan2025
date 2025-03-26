from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from models.Models import Account, Transaction, TransactionType
from services.TransactionServices import TransactionServices
import os
from dotenv import load_dotenv

load_dotenv()

class AccountServices:
    def __init__(self):
        mongo_url = os.getenv("MONGODB_URL")
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client['bankingapp']
        self.collection = self.db['accounts']
        self.transaction_services = TransactionServices()

    async def get_all_accounts(self):
        accounts = await self.collection.find().to_list(length=None)
        return [Account(**account) for account in accounts]

    async def get_account_by_id(self, id: int):
        account = await self.collection.find_one({"id": id})
        if not account:
            return None
        return Account(**account)

    async def create_account(self, account: Account):
        existing_account = await self.collection.find_one({"id": account.id})
        if existing_account:
            return False
        account_dict = account.model_dump()
        account_dict["createTimeStamp"] = datetime.now()
        account_dict["updateTimeStamp"] = datetime.now()
        await self.collection.insert_one(account_dict)
        return account

    async def update_account(self, id: int, account: Account):
        account_dict = account.model_dump()
        account_dict["updateTimeStamp"] = datetime.now()
        result = await self.collection.replace_one({"id": id}, account_dict)
        return account if result.modified_count > 0 else None

    async def delete_account(self, id: int):
        result = await self.collection.delete_one({"id": id})
        return result.deleted_count > 0

    async def deposit(self, id: int, amount: float, description: str):
        account = await self.collection.find_one({"id": id})
        if not account:
            return None

        balance = account.get("balance", 0)
        new_balance = balance + amount

        await self.collection.update_one(
            {"id": id}, 
            {"$set": {"balance": new_balance, "updateTimeStamp": datetime.now()}}
        )

        transaction = Transaction(
            id=int(datetime.now().timestamp()),
            type=TransactionType.CREDIT,
            description=description,
            amount=amount,
            accountId=id,
            transactionTimeStamp=datetime.now(),
        )
        await self.transaction_services.create_transaction(transaction)

        return new_balance

    async def withdraw(self, id: int, amount: float, description: str):
        account = await self.collection.find_one({"id": id})
        if not account:
            return None

        balance = account.get("balance", 0)
        if balance < amount:
            return -1

        new_balance = balance - amount

        await self.collection.update_one(
            {"id": id}, 
            {"$set": {"balance": new_balance, "updateTimeStamp": datetime.now()}}
        )

        transaction = Transaction(
            id=int(datetime.now().timestamp()),
            type=TransactionType.DEBIT,
            description=description,
            amount=amount,
            accountId=id,
            transactionTimeStamp=datetime.now(),
        )
        await self.transaction_services.create_transaction(transaction)

        return new_balance
