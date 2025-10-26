import hypersync
from hypersync import BlockField, TransactionField, LogField, FieldSelection, LogSelection
from config.hypersync_client import get_hypersync_client, Chain
from typing import Optional

async def erc20_transfers(from_block: int, to_block: int, contract_address: str = None, chain: Optional[Chain] = None):
    """
    Get all ERC20 transfer events within a block range.
    Optionally filter by contract address.
    """
    client = get_hypersync_client(chain)

    # ERC20 Transfer event signature
    transfer_topic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

    log_selection = LogSelection(
        topics=[[transfer_topic]]
    )
    
    # Add contract address filter if provided
    if contract_address:
        log_selection.address = [contract_address]

    query = hypersync.Query(
        from_block=from_block,
        to_block=to_block,
        logs=[log_selection],
        field_selection=FieldSelection(
            block=[BlockField.NUMBER, BlockField.TIMESTAMP, BlockField.HASH],
            log=[
                LogField.LOG_INDEX,
                LogField.TRANSACTION_INDEX,
                LogField.TRANSACTION_HASH,
                LogField.DATA,
                LogField.ADDRESS,
                LogField.TOPIC0,
                LogField.TOPIC1,
                LogField.TOPIC2,
                LogField.TOPIC3,
            ],
            transaction=[
                TransactionField.BLOCK_NUMBER,
                TransactionField.TRANSACTION_INDEX,
                TransactionField.HASH,
                TransactionField.FROM,
                TransactionField.TO,
                TransactionField.VALUE,
            ],
        ),
    )

    print("Running ERC20 transfers query...")
    res = await client.get(query)

    # Create decoder for Transfer events
    decoder = hypersync.Decoder([
        "Transfer(address indexed from, address indexed to, uint256 value)"
    ])

    # Decode the logs
    decoded_logs = await decoder.decode_logs(res.data.logs)

    transfers = []
    for i, log in enumerate(res.data.logs):
        decoded_log = decoded_logs[i] if i < len(decoded_logs) else None
        
        transfer_data = {
            "log_index": log.log_index,
            "transaction_hash": log.transaction_hash,
            "contract_address": log.address,
            "block_number": log.block_number,
            "transaction_index": log.transaction_index,
        }
        
        if decoded_log and decoded_log.indexed and decoded_log.body:
            transfer_data.update({
                "from_address": decoded_log.indexed[0].val,
                "to_address": decoded_log.indexed[1].val,
                "value": str(decoded_log.body[0].val),
            })
        
        transfers.append(transfer_data)

    return {
        "transfers": transfers,
        "total_transfers": len(transfers),
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }
