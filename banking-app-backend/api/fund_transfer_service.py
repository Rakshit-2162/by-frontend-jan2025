from typing import List
from fastapi import APIRouter, HTTPException
from models.Models import FundTransfer
from services.FundTransferServices import FundTransferServices
from services.AccountServices import AccountServices

router = APIRouter()
fund_transfer_service = FundTransferServices()
account_services = AccountServices()


@router.get('/fundTransfers', response_model=List[FundTransfer])
async def get_fund_transfers():
    return await fund_transfer_service.get_all_fund_transfers()


@router.post("/fundTransfers")
async def fund_transfer(fundTransfer: FundTransfer):
    source = await account_services.get_account_by_id(fundTransfer.sourceAccountId)
    if source == None:
        raise HTTPException(status_code=400, detail='Source account does not exists!')
    
    if not source.active:
        raise HTTPException(status_code=400, detail='Source Account is disabled!')

    target = await account_services.get_account_by_id(fundTransfer.targetAccountId)
    if target == None:
        raise HTTPException(status_code=400, detail='Target account does not exists!')
    
    if not target.active:
        raise HTTPException(status_code=400, detail='Target Account is disabled!')

    success = await fund_transfer_service.process_fund_transfer(fundTransfer)
    if not success:
        raise HTTPException(status_code=400, detail="Fund transfer failed")
        
    return {"message": "Fund transfer completed successfully"}
