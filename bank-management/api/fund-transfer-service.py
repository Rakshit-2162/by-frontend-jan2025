from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

class FundTransfer(BaseModel):
    sourceAccountId: int
    targetAccountId: int
    amount: float
    description: str
    transactionTimestamp: datetime

fund_transfers_db = []

@app.post("/fundTransfers")
def fund_transfer(transfer: FundTransfer):
    # In a real-world app, validate accounts and update their balances in a database
    fund_transfers_db.append(transfer)
    return {"message": "Fund transfer initiated successfully"}
