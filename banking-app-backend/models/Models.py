from datetime import datetime
from enum import Enum
from pydantic import BaseModel

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

class FundTransfer(BaseModel):
    sourceAccountId: int
    targetAccountId: int
    amount: float
    description: str
    transactionTimestamp: datetime

class TransactionType(str, Enum):
    CREDIT = "Credit"
    DEBIT = "Debit"

class Transaction(BaseModel):
    id: int
    type: TransactionType
    description: str
    amount: float
    accountId: int
    transactionTimeStamp: datetime

class TransferRequest(BaseModel):
    id: int
    amount: float
    description: str

class Admin(BaseModel):
    email: str
    password: str