import hypersync
from config.hypersync_client import get_hypersync_client

async def blocks_and_transactions(from_block: int, to_block: int):
    """
    Get all block and transaction objects within a block range.
    Returns complete block and transaction data (not just hashes).
    """
    client = get_hypersync_client()

    # Use preset query for blocks and transactions
    query = hypersync.preset_query_blocks_and_transactions(from_block, to_block)

    print("Running blocks and transactions query...")
    res = await client.get(query)

    # Convert blocks to serializable format
    blocks = []
    for block in res.data.blocks:
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
        
        # Add base fee if available (post-EIP-1559)
        if hasattr(block, 'base_fee_per_gas') and block.base_fee_per_gas:
            block_data["base_fee_per_gas"] = block.base_fee_per_gas
            
        blocks.append(block_data)

    # Convert transactions to serializable format
    transactions = []
    for tx in res.data.transactions:
        tx_data = {
            "hash": tx.hash,
            "block_number": tx.block_number,
            "transaction_index": tx.transaction_index,
            "from": tx.from_,
            "to": tx.to,
            "value": tx.value,
            "gas_used": tx.gas_used,
            "gas_price": tx.gas_price,
            "input": tx.input,
        }
        
        # Add effective gas price if available (post-EIP-1559)
        if hasattr(tx, 'effective_gas_price') and tx.effective_gas_price:
            tx_data["effective_gas_price"] = tx.effective_gas_price
            
        transactions.append(tx_data)

    return {
        "blocks": blocks,
        "transactions": transactions,
        "block_count": len(blocks),
        "transaction_count": len(transactions),
        "from_block": from_block,
        "to_block": to_block,
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }
