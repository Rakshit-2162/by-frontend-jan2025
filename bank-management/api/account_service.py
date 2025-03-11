from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime
from enum import Enum

app = FastAPI()

class AccountType(str, Enum):
    SAVINGS = "Savings"
    CURRENT = "Current"
    LOAN = "Loan"

class Account(BaseModel):
    id: int
    name: str
    type: AccountType
    balance: float
    roi: float
    active: bool
    createTimeStamp: datetime
    updateTimeStamp: datetime

account_db = {}

@app.get('/accounts', response_model=List[Account])
def get_account():
    return list(account_db.values())

@app.get('/accounts/{id}', response_model=Account)
def get_account(id: int):
    if id not in account_db:
        raise HTTPException(status_code=404, detail="Account not found")
    return account_db[id]

@app.post('/accounts', response_model=Account)
def create_account(account: Account):
    if account.id in account_db:
        raise HTTPException(status_code=400, detail="Account already exists!")
    account_db[account.id] = account
    return account

@app.put('/accounts/{id}', response_model=Account)
def update_account(id: int, account: Account):
    if id not in account_db:
        raise HTTPException(status_code=404, detail="Account not found!")
    account_db[id] = account
    return account

@app.delete('/accounts/{id}')
def delete_account(id: int):
    if id not in account_db:
        raise HTTPException(status_code=404, detail="Account not found!")
    del account_db[id]
    return {"message": "Account deleted successfully!"}

@app.post('/account/{id}/deposits')
def deposit(id: int, amount: float):
    if id not in account_db:
        raise HTTPException(status_code=404, detail="Account not found!")
    account_db[id].balance += amount
    return {'message': 'Deposit successful', 'balance': account_db[id].balance}

@app.post('/accounts/{id}/withdrawal')
def withdraw(id: int, amount: float):
    if id not in account_db:
        raise HTTPException(status_code=404, detail="Account not found!")
    if account_db[id].balance < amount:
        raise HTTPException(status_code=400, detail="Insuffecient balance!")
    account_db[id].balance -= amount
    return {'message': 'Withdrawal successful', 'balance': account_db[id].balance}
