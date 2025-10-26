import hypersync
import asyncio
from config.hypersync_client import get_hypersync_client, Chain
from typing import Optional

# returns all blocks and the hashes of the transactions (not entire transaction objects) within a block range

async def blocks_transactions_hashes(from_block: int, to_block: int, chain: Optional[Chain] = None):
    client = get_hypersync_client(chain)

    query = hypersync.preset_query_blocks_and_transaction_hashes(from_block, to_block)

    print("Running the query...")

    # Run the query once, the query is automatically paginated so it will return when it reaches some limit (time, response size etc.)
    # there is a next_block field on the response object so we can set the from_block of our query to this value and continue our query until
    # res.next_block is equal to res.archive_height or query.to_block in case we specified an end block.
    res = await client.get(query)

    print(f"Query returned {len(res.data.blocks)} blocks and {len(res.data.transactions)} transaction hashes")

    # Convert to serializable format
    return {
        "blocks": [
            {
                "number": block.number,
                "hash": block.hash,
                "parent_hash": block.parent_hash,
                "timestamp": block.timestamp,
            }
            for block in res.data.blocks
        ],
        "transaction_hashes": [tx.hash for tx in res.data.transactions],
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }