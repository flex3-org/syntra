import hypersync
from config.hypersync_client import get_hypersync_client, Chain
from typing import Optional

async def chain_info(chain: Optional[Chain] = None):
    """
    Get chain information including chain ID and current height.
    """
    client = get_hypersync_client(chain)

    print("Fetching chain information...")
    
    # Get chain ID and height
    chain_id = await client.get_chain_id()
    height = await client.get_height()

    return {
        "chain_id": chain_id,
        "current_height": height,
        "network": "Ethereum Mainnet" if chain_id == 1 else f"Chain {chain_id}",
    }
