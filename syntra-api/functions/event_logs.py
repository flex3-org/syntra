import hypersync
from config.hypersync_client import get_hypersync_client, Chain
from typing import Optional

async def event_logs(contract_address: str, event_topic: str, from_block: int, to_block: int, chain: Optional[Chain] = None):
    """
    Get all logs of a specific event from a contract within a block range.
    Uses preset query for logs of specific events.
    """
    client = get_hypersync_client(chain)

    # Use preset query for logs of specific event
    query = hypersync.preset_query_logs_of_event(contract_address, event_topic, from_block, to_block)

    print(f"Running event logs query for contract {contract_address} and event {event_topic}...")
    res = await client.get(query)

    # Convert logs to serializable format
    logs = []
    for log in res.data.logs:
        log_data = {
            "log_index": log.log_index,
            "transaction_hash": log.transaction_hash,
            "transaction_index": log.transaction_index,
            "block_number": log.block_number,
            "contract_address": log.address,
            "data": log.data,
            "topics": [
                log.topic0,
                log.topic1 if hasattr(log, 'topic1') and log.topic1 else None,
                log.topic2 if hasattr(log, 'topic2') and log.topic2 else None,
                log.topic3 if hasattr(log, 'topic3') and log.topic3 else None,
            ]
        }
        logs.append(log_data)

    # Get associated block and transaction data
    blocks = []
    for block in res.data.blocks:
        block_data = {
            "number": block.number,
            "hash": block.hash,
            "timestamp": block.timestamp,
        }
        blocks.append(block_data)

    transactions = []
    for tx in res.data.transactions:
        tx_data = {
            "hash": tx.hash,
            "block_number": tx.block_number,
            "transaction_index": tx.transaction_index,
            "from": tx.from_,
            "to": tx.to,
        }
        transactions.append(tx_data)

    return {
        "logs": logs,
        "blocks": blocks,
        "transactions": transactions,
        "contract_address": contract_address,
        "event_topic": event_topic,
        "log_count": len(logs),
        "from_block": from_block,
        "to_block": to_block,
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }
