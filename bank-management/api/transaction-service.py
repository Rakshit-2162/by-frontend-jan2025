from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()

class TransactionType(str):
    CREDIT = "Credit"
    DEBIT = "Debit"

class Transaction(BaseModel):
    id: int
    type: TransactionType
    description: str
    amount: float
    accountId: int
    transactionTimeStamp: datetime

transactions_db = {}

@app.get("/transactions", response_model=List[Transaction])
def get_transactions():
    return list(transactions_db.values())

@app.get("/transactions/{id}", response_model=Transaction)
def get_transaction(id: int):
    if id not in transactions_db:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transactions_db[id]

@app.post("/transactions", response_model=Transaction)
def create_transaction(transaction: Transaction):
    if transaction.id in transactions_db:
        raise HTTPException(status_code=400, detail="Transaction already exists")
    transactions_db[transaction.id] = transaction
    return transaction