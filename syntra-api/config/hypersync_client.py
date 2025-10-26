import hypersync
from typing import Dict, Optional
from enum import Enum

class Chain(str, Enum):
    ETHEREUM = "ethereum"
    BASE = "base"
    SEPOLIA = "sepolia"

# Chain configuration mapping
CHAIN_CONFIGS = {
    Chain.ETHEREUM: {
        "url": "https://eth.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Ethereum Mainnet",
        "chain_id": 1
    },
    Chain.BASE: {
        "url": "https://base.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Base",
        "chain_id": 8453
    },
    Chain.SEPOLIA: {
        "url": "https://sepolia.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Sepolia Testnet",
        "chain_id": 11155111
    }
}

# Client cache for each chain
_clients: Dict[Chain, hypersync.HypersyncClient] = {}

def get_hypersync_client(chain: Optional[Chain] = None) -> hypersync.HypersyncClient:
    """
    Get the hypersync client instance for the specified chain.
    Creates the client on first call and reuses it for subsequent calls.
    
    Args:
        chain: The blockchain to connect to. Defaults to Ethereum if not specified.
    
    Returns:
        HypersyncClient instance for the specified chain
    """
    if chain is None:
        chain = Chain.ETHEREUM
    
    if chain not in _clients:
        config = CHAIN_CONFIGS.get(chain)
        if not config:
            raise ValueError(f"Unsupported chain: {chain}")
        
        _clients[chain] = hypersync.HypersyncClient(hypersync.ClientConfig(
            url=config["url"],
            bearer_token=config["bearer_token"],
        ))
    
    return _clients[chain]

def get_chain_info(chain: Chain) -> dict:
    """
    Get chain configuration information.
    
    Args:
        chain: The blockchain to get info for
    
    Returns:
        Dictionary containing chain configuration
    """
    return CHAIN_CONFIGS.get(chain, {})

