import hypersync
from hypersync import BlockField, TransactionField, LogField, FieldSelection, LogSelection
from config.hypersync_client import get_hypersync_client

async def contract_logs(contract_address: str, from_block: int, to_block: int, event_topic: str = None):
    """
    Get all logs from a specific contract within a block range.
    Optionally filter by event topic.
    """
    client = get_hypersync_client()

    log_selection = LogSelection(
        address=[contract_address]
    )
    
    # Add event topic filter if provided
    if event_topic:
        log_selection.topics = [[event_topic]]

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

    print(f"Running contract logs query for {contract_address}...")
    res = await client.get(query)

    logs = []
    for log in res.data.logs:
        log_data = {
            "log_index": log.log_index,
            "transaction_hash": log.transaction_hash,
            "contract_address": log.address,
            "block_number": log.block_number,
            "transaction_index": log.transaction_index,
            "data": log.data,
            "topics": [
                log.topic0,
                log.topic1 if hasattr(log, 'topic1') and log.topic1 else None,
                log.topic2 if hasattr(log, 'topic2') and log.topic2 else None,
                log.topic3 if hasattr(log, 'topic3') and log.topic3 else None,
            ]
        }
        logs.append(log_data)

    return {
        "logs": logs,
        "total_logs": len(logs),
        "contract_address": contract_address,
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }
