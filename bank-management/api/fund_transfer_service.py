from fastapi import APIRouter, HTTPException
from models.Models import FundTransfer
from services.FundTransferServices import FundTransferServices

router = APIRouter()
fund_transfer_service = FundTransferServices()

@router.post("/fundTransfers")
async def fund_transfer(transfer: FundTransfer):
    success = await fund_transfer_service.process_fund_transfer(transfer)

    if not success:
        raise HTTPException(status_code=400, detail="Fund transfer failed")
        
    return {"message": "Fund transfer completed successfully"}
