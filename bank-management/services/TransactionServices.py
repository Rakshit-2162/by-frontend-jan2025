from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from models.Models import Transaction

class TransactionServices:
    def __init__(self):
        self.client = AsyncIOMotorClient("mongodb+srv://rakshitvaja2162:maRcsyvVpC5nbIV9@cluster0.ybcc8.mongodb.net/")
        self.db = self.client['bankingapp']
        self.collection = self.db['transactions']

    async def get_all_transactions(self):
        transactions = await self.collection.find().to_list()
        return [Transaction(**transaction) for transaction in transactions]

    async def get_transactions_by_id(self, account_id: int):
        transactions_cursor = self.collection.find({"accountId": account_id})
        transactions_list = await transactions_cursor.to_list(None)
        return [Transaction(**transaction).model_dump() for transaction in transactions_list]

    async def create_transaction(self, transaction: Transaction):
        existing_transaction = await self.collection.find_one({"id": transaction.id})
        if existing_transaction:
            return None
        transaction_dict = transaction.model_dump()
        transaction_dict["transactionTimeStamp"] = datetime.now()
        await self.collection.insert_one(transaction_dict)
        return transaction
