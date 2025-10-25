import hypersync

# Singleton hypersync client instance
_client = None

def get_hypersync_client() -> hypersync.HypersyncClient:
    """
    Get the singleton hypersync client instance.
    Creates the client on first call and reuses it for subsequent calls.
    """
    global _client
    if _client is None:
        _client = hypersync.HypersyncClient(hypersync.ClientConfig(
            url="https://eth.hypersync.xyz",
            bearer_token="f994fd7c-9894-482d-8618-8d1586cadfe7",
        ))
    return _client

