from fastapi import APIRouter, HTTPException
from typing import List
from models.Models import Transaction
from services.TransactionServices import TransactionServices

router = APIRouter()
transaction_services = TransactionServices()

@router.get("/transactions", response_model=List[Transaction])
async def get_transactions():
    return await transaction_services.get_all_transactions()

@router.get("/transactions/{id}", response_model=List[Transaction])
async def get_transactions(id: int):
    transactions = await transaction_services.get_transactions_by_id(id)
    if not transactions:
        raise HTTPException(status_code=404, detail="No transactions found")
    return transactions

@router.post("/transactions", response_model=Transaction)
async def create_transaction(transaction: Transaction):
    created_transaction = await transaction_services.create_transaction(transaction)
    if not created_transaction:
        raise HTTPException(status_code=400, detail="Transaction already exists")
    return created_transaction
