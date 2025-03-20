import uvicorn
from fastapi import FastAPI
from api.account_service import router as account_router
from api.fund_transfer_service import router as fund_transfer_router
from api.transaction_service import router as transaction_router

app = FastAPI()

app.include_router(account_router, prefix='/account_service', tags=['Account Services'])
app.include_router(transaction_router, prefix='/transaction_service', tags=['Transaction Services'])
app.include_router(fund_transfer_router, prefix='/fund_transfer_service', tags=['Fund Transfer Services'])

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)