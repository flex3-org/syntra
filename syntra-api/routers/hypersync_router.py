from fastapi import APIRouter
from functions.txn_by_id import txn_by_id
from pydantic import BaseModel, Field

router = APIRouter()

class TxnByIdRequest(BaseModel):
    tx_hash: str = Field(..., description="Hash of the transaction", example="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")


@router.post("/txn_by_id", operation_id="txn_by_id", description="Get a transaction by its hash")
async def txn_by_id_route(request: TxnByIdRequest):
    return await txn_by_id(tx_hash=request.tx_hash)