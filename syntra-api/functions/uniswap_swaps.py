import hypersync
from hypersync import BlockField, TransactionField, LogField, FieldSelection, LogSelection
from config.hypersync_client import get_hypersync_client

async def uniswap_swaps(pool_address: str, from_block: int, to_block: int):
    """
    Get all Uniswap V2 swap events from a specific pool within a block range.
    """
    client = get_hypersync_client()

    # Uniswap V2 Swap event signature
    # Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)
    swap_topic = "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822"

    query = hypersync.Query(
        from_block=from_block,
        to_block=to_block,
        logs=[LogSelection(
            address=[pool_address],
            topics=[[swap_topic]]
        )],
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
                TransactionField.GAS_USED,
            ],
        ),
    )

    print(f"Running Uniswap swaps query for pool {pool_address}...")
    res = await client.get(query)

    # Create decoder for Swap events
    decoder = hypersync.Decoder([
        "Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)"
    ])

    # Decode the logs
    decoded_logs = await decoder.decode_logs(res.data.logs)

    swaps = []
    total_swaps = 0

    for i, log in enumerate(res.data.logs):
        decoded_log = decoded_logs[i] if i < len(decoded_logs) else None
        
        swap_data = {
            "log_index": log.log_index,
            "transaction_hash": log.transaction_hash,
            "pool_address": log.address,
            "block_number": log.block_number,
            "transaction_index": log.transaction_index,
        }
        
        if decoded_log and decoded_log.indexed and decoded_log.body:
            swap_data.update({
                "sender": decoded_log.indexed[0].val,
                "to": decoded_log.indexed[1].val,
                "amount0_in": str(decoded_log.body[0].val),
                "amount1_in": str(decoded_log.body[1].val),
                "amount0_out": str(decoded_log.body[2].val),
                "amount1_out": str(decoded_log.body[3].val),
            })
            total_swaps += 1
        
        swaps.append(swap_data)

    # Get associated block data for timestamps
    blocks = []
    for block in res.data.blocks:
        block_data = {
            "number": block.number,
            "timestamp": block.timestamp,
            "hash": block.hash,
        }
        blocks.append(block_data)

    return {
        "swaps": swaps,
        "blocks": blocks,
        "pool_address": pool_address,
        "total_swaps": total_swaps,
        "swap_count": len(swaps),
        "from_block": from_block,
        "to_block": to_block,
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }
