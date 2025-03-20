from datetime import datetime
from fastapi import APIRouter, HTTPException
from typing import List
from services.AccountServices import AccountServices
from services.TransactionServices import TransactionServices
from models.Models import Account, Transaction, TransactionType

router = APIRouter()
account_services = AccountServices()
transaction_services = TransactionServices()

@router.get('/accounts', response_model=List[Account])
async def get_accounts():
    return await account_services.get_all_accounts()

@router.get('/accounts/{id}', response_model=Account)
async def get_account(id: int):
    account = await account_services.get_account_by_id(id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return account

@router.post('/accounts', response_model=Account)
async def create_account(account: Account):
    return await account_services.create_account(account)

@router.put('/accounts/{id}', response_model=Account)
async def update_account(id: int, account: Account):
    updated_account = await account_services.update_account(id, account)
    if not updated_account:
        raise HTTPException(status_code=404, detail="Account not found!")
    return updated_account

@router.delete('/accounts/{id}')
async def delete_account(id: int):
    success = await account_services.delete_account(id)
    if not success:
        raise HTTPException(status_code=404, detail="Account not found!")
    return {"message": "Account deleted successfully!"}

@router.post("/accounts/{id}/deposit")
async def deposit(id: int, amount: float):
    updated_balance = await account_services.deposit(id, amount)
    if not updated_balance:
        raise HTTPException(status_code=404, detail="Account not found!")

    return {'message': 'Deposit successful', 'balance': updated_balance}

@router.post("/accounts/{id}/withdraw")
async def withdraw(id: int, amount: float):
    updated_balance = await account_services.withdraw(id, amount)
    if not updated_balance:
        raise HTTPException(status_code=404, detail="Account not found!")

    return {'message': 'Withdrawal successful', 'balance': updated_balance}
