import hypersync
from config.hypersync_client import get_hypersync_client

async def chain_info():
    """
    Get chain information including chain ID and current height.
    """
    client = get_hypersync_client()

    print("Fetching chain information...")
    
    # Get chain ID and height
    chain_id = await client.get_chain_id()
    height = await client.get_height()

    return {
        "chain_id": chain_id,
        "current_height": height,
        "network": "Ethereum Mainnet" if chain_id == 1 else f"Chain {chain_id}",
    }
