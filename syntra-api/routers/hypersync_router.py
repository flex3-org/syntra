from fastapi import APIRouter
from functions.txn_by_id import txn_by_id
from functions.blocks_transactions_hashes import blocks_transactions_hashes
from pydantic import BaseModel, Field

router = APIRouter()

class TxnByIdRequest(BaseModel):
    tx_hash: str = Field(..., description="Hash of the transaction", example="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")

class BlocksTransactionsHashesRequest(BaseModel):
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: int = Field(..., description="End block", example=17000050)


@router.post("/txn_by_id", operation_id="txn_by_id", description="Get a transaction by its hash")
async def txn_by_id_route(request: TxnByIdRequest):
    return await txn_by_id(tx_hash=request.tx_hash)

@router.post("/blocks_transactions_hashes", operation_id="blocks_transactions_hashes", description="Get all blocks and the hashes of the transactions within a block range")
async def blocks_transactions_hashes_route(request: BlocksTransactionsHashesRequest):
    return await blocks_transactions_hashes(from_block=request.from_block, to_block=request.to_block)