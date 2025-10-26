import hypersync
from hypersync import BlockField, TransactionField, LogField, FieldSelection, JoinMode
from config.hypersync_client import get_hypersync_client, Chain
from typing import Optional

async def block_data(block_number: int, include_transactions: bool = True, include_logs: bool = True, chain: Optional[Chain] = None):
    """
    Get detailed block data including transactions and logs for a specific block.
    """
    client = get_hypersync_client(chain)

    # Determine join mode based on what data is requested
    join_mode = JoinMode.JOIN_ALL if (include_transactions or include_logs) else JoinMode.JOIN_NOTHING

    field_selection = FieldSelection(
        block=[
            BlockField.NUMBER,
            BlockField.TIMESTAMP,
            BlockField.HASH,
            BlockField.PARENT_HASH,
            BlockField.MINER,
            BlockField.GAS_USED,
            BlockField.GAS_LIMIT,
            BlockField.BASE_FEE_PER_GAS,
            BlockField.SIZE,
        ]
    )

    if include_transactions:
        field_selection.transaction = [
            TransactionField.BLOCK_NUMBER,
            TransactionField.TRANSACTION_INDEX,
            TransactionField.HASH,
            TransactionField.FROM,
            TransactionField.TO,
            TransactionField.VALUE,
            TransactionField.INPUT,
            TransactionField.GAS_USED,
            TransactionField.GAS_PRICE,
            TransactionField.EFFECTIVE_GAS_PRICE,
        ]

    if include_logs:
        field_selection.log = [
            LogField.LOG_INDEX,
            LogField.TRANSACTION_INDEX,
            LogField.TRANSACTION_HASH,
            LogField.DATA,
            LogField.ADDRESS,
            LogField.TOPIC0,
            LogField.TOPIC1,
            LogField.TOPIC2,
            LogField.TOPIC3,
        ]

    query = hypersync.Query(
        from_block=block_number,
        to_block=block_number + 1,
        include_all_blocks=True,
        join_mode=join_mode,
        field_selection=field_selection,
    )

    print(f"Running block data query for block {block_number}...")
    res = await client.get(query)

    if not res.data.blocks:
        return {
            "error": "Block not found",
            "block_number": block_number
        }

    block = res.data.blocks[0]
    block_data = {
        "number": block.number,
        "hash": block.hash,
        "parent_hash": block.parent_hash,
        "timestamp": block.timestamp,
        "miner": block.miner,
        "gas_used": block.gas_used,
        "gas_limit": block.gas_limit,
        "size": block.size,
    }

    # Add base fee if available
    if hasattr(block, 'base_fee_per_gas') and block.base_fee_per_gas:
        block_data["base_fee_per_gas"] = block.base_fee_per_gas

    result = {
        "block": block_data,
        "transaction_count": len(res.data.transactions) if include_transactions else 0,
        "log_count": len(res.data.logs) if include_logs else 0,
    }

    if include_transactions:
        transactions = []
        for tx in res.data.transactions:
            tx_data = {
                "hash": tx.hash,
                "transaction_index": tx.transaction_index,
                "from": tx.from_,
                "to": tx.to,
                "value": tx.value,
                "gas_used": tx.gas_used,
                "gas_price": tx.gas_price,
                "input": tx.input,
            }
            if hasattr(tx, 'effective_gas_price') and tx.effective_gas_price:
                tx_data["effective_gas_price"] = tx.effective_gas_price
            transactions.append(tx_data)
        result["transactions"] = transactions

    if include_logs:
        logs = []
        for log in res.data.logs:
            log_data = {
                "log_index": log.log_index,
                "transaction_hash": log.transaction_hash,
                "transaction_index": log.transaction_index,
                "address": log.address,
                "data": log.data,
                "topics": [
                    log.topic0,
                    log.topic1 if hasattr(log, 'topic1') and log.topic1 else None,
                    log.topic2 if hasattr(log, 'topic2') and log.topic2 else None,
                    log.topic3 if hasattr(log, 'topic3') and log.topic3 else None,
                ]
            }
            logs.append(log_data)
        result["logs"] = logs

    return result
