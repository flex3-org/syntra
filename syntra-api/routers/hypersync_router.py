from fastapi import APIRouter
from functions.txn_by_id import txn_by_id
from functions.blocks_transactions_hashes import blocks_transactions_hashes
from functions.erc20_transfers import erc20_transfers
from functions.contract_logs import contract_logs
from functions.block_data import block_data
from functions.chain_info import chain_info
from functions.wallet_activity import wallet_activity
from functions.erc20_transfers_and_approvals import erc20_transfers_and_approvals
from functions.block_rewards import block_rewards
from functions.blocks_and_transactions import blocks_and_transactions
from functions.event_logs import event_logs
from functions.uniswap_swaps import uniswap_swaps
from functions.call_decoder import call_decoder
from pydantic import BaseModel, Field
from typing import Optional

router = APIRouter()

class TxnByIdRequest(BaseModel):
    tx_hash: str = Field(..., description="Hash of the transaction", example="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")

class BlocksTransactionsHashesRequest(BaseModel):
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: int = Field(..., description="End block", example=17000050)

class ERC20TransfersRequest(BaseModel):
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: int = Field(..., description="End block", example=17000050)
    contract_address: Optional[str] = Field(None, description="Optional contract address to filter transfers", example="0xdAC17F958D2ee523a2206206994597C13D831ec7")

class ContractLogsRequest(BaseModel):
    contract_address: str = Field(..., description="Contract address to get logs from", example="0xdAC17F958D2ee523a2206206994597C13D831ec7")
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: int = Field(..., description="End block", example=17000050)
    event_topic: Optional[str] = Field(None, description="Optional event topic to filter logs", example="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef")

class BlockDataRequest(BaseModel):
    block_number: int = Field(..., description="Block number to get data for", example=17000000)
    include_transactions: bool = Field(True, description="Include transaction data")
    include_logs: bool = Field(True, description="Include log data")

class WalletActivityRequest(BaseModel):
    wallet_address: str = Field(..., description="Wallet address to get activity for", example="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: int = Field(..., description="End block", example=17000050)
    include_erc20: bool = Field(True, description="Include ERC20 transfer data")

class ERC20TransfersAndApprovalsRequest(BaseModel):
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: int = Field(..., description="End block", example=17000050)
    contract_address: Optional[str] = Field(None, description="Optional contract address to filter events", example="0xdAC17F958D2ee523a2206206994597C13D831ec7")

class BlockRewardsRequest(BaseModel):
    miner_address: str = Field(..., description="Miner address to calculate rewards for", example="0xe43Cc5b6FF052f5Aa931A4F9eF2bfA0C500014CA")
    from_block: int = Field(..., description="Start block", example=15537394)
    to_block: Optional[int] = Field(None, description="End block (optional, defaults to current height)", example=15537500)

class BlocksAndTransactionsRequest(BaseModel):
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: int = Field(..., description="End block", example=17000050)

class EventLogsRequest(BaseModel):
    contract_address: str = Field(..., description="Contract address to get event logs from", example="0xdAC17F958D2ee523a2206206994597C13D831ec7")
    event_topic: str = Field(..., description="Event topic signature", example="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef")
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: int = Field(..., description="End block", example=17000050)

class UniswapSwapsRequest(BaseModel):
    pool_address: str = Field(..., description="Uniswap pool address", example="0x3e47D7B7867BAbB558B163F92fBE352161ACcb49")
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: int = Field(..., description="End block", example=17000050)

class CallDecoderRequest(BaseModel):
    contract_address: str = Field(..., description="Contract address to decode calls for", example="0x6B175474E89094C44Da98b954EedeAC495271d0F")
    function_signature: str = Field(..., description="Function signature to decode", example="transfer(address dst, uint256 wad)")
    from_block: int = Field(..., description="Start block", example=17000000)
    to_block: Optional[int] = Field(None, description="End block (optional, defaults to current height)", example=17000050)


@router.post("/txn_by_id", operation_id="txn_by_id", description="Get a transaction by its hash")
async def txn_by_id_route(request: TxnByIdRequest):
    return await txn_by_id(tx_hash=request.tx_hash)

@router.post("/blocks_transactions_hashes", operation_id="blocks_transactions_hashes", description="Get all blocks and the hashes of the transactions within a block range")
async def blocks_transactions_hashes_route(request: BlocksTransactionsHashesRequest):
    return await blocks_transactions_hashes(from_block=request.from_block, to_block=request.to_block)

@router.post("/erc20_transfers", operation_id="erc20_transfers", description="Get all ERC20 transfer events within a block range")
async def erc20_transfers_route(request: ERC20TransfersRequest):
    return await erc20_transfers(
        from_block=request.from_block,
        to_block=request.to_block,
        contract_address=request.contract_address
    )

@router.post("/contract_logs", operation_id="contract_logs", description="Get all logs from a specific contract within a block range")
async def contract_logs_route(request: ContractLogsRequest):
    return await contract_logs(
        contract_address=request.contract_address,
        from_block=request.from_block,
        to_block=request.to_block,
        event_topic=request.event_topic
    )

@router.post("/block_data", operation_id="block_data", description="Get detailed block data including transactions and logs")
async def block_data_route(request: BlockDataRequest):
    return await block_data(
        block_number=request.block_number,
        include_transactions=request.include_transactions,
        include_logs=request.include_logs
    )

@router.get("/chain_info", operation_id="chain_info", description="Get chain information including chain ID and current height")
async def chain_info_route():
    return await chain_info()

@router.post("/wallet_activity", operation_id="wallet_activity", description="Get all transaction activity for a specific wallet address")
async def wallet_activity_route(request: WalletActivityRequest):
    return await wallet_activity(
        wallet_address=request.wallet_address,
        from_block=request.from_block,
        to_block=request.to_block,
        include_erc20=request.include_erc20
    )

@router.post("/erc20_transfers_and_approvals", operation_id="erc20_transfers_and_approvals", description="Get all ERC20 transfer and approval events within a block range")
async def erc20_transfers_and_approvals_route(request: ERC20TransfersAndApprovalsRequest):
    return await erc20_transfers_and_approvals(
        from_block=request.from_block,
        to_block=request.to_block,
        contract_address=request.contract_address
    )

@router.post("/block_rewards", operation_id="block_rewards", description="Calculate block rewards for a specific miner address")
async def block_rewards_route(request: BlockRewardsRequest):
    return await block_rewards(
        miner_address=request.miner_address,
        from_block=request.from_block,
        to_block=request.to_block
    )

@router.post("/blocks_and_transactions", operation_id="blocks_and_transactions", description="Get all block and transaction objects within a block range")
async def blocks_and_transactions_route(request: BlocksAndTransactionsRequest):
    return await blocks_and_transactions(
        from_block=request.from_block,
        to_block=request.to_block
    )

@router.post("/event_logs", operation_id="event_logs", description="Get all logs of a specific event from a contract within a block range")
async def event_logs_route(request: EventLogsRequest):
    return await event_logs(
        contract_address=request.contract_address,
        event_topic=request.event_topic,
        from_block=request.from_block,
        to_block=request.to_block
    )

@router.post("/uniswap_swaps", operation_id="uniswap_swaps", description="Get all Uniswap V2 swap events from a specific pool")
async def uniswap_swaps_route(request: UniswapSwapsRequest):
    return await uniswap_swaps(
        pool_address=request.pool_address,
        from_block=request.from_block,
        to_block=request.to_block
    )

@router.post("/call_decoder", operation_id="call_decoder", description="Decode function calls to a specific contract within a block range")
async def call_decoder_route(request: CallDecoderRequest):
    return await call_decoder(
        contract_address=request.contract_address,
        function_signature=request.function_signature,
        from_block=request.from_block,
        to_block=request.to_block
    )