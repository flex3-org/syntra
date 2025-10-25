import hypersync
from hypersync import BlockField, TransactionField, FieldSelection, BlockSelection, JoinMode
from config.hypersync_client import get_hypersync_client

async def block_rewards(miner_address: str, from_block: int, to_block: int = None):
    """
    Calculate block rewards for a specific miner address.
    Returns total transaction fees and burned fees.
    """
    client = get_hypersync_client()

    # If no to_block specified, get current height
    if to_block is None:
        to_block = await client.get_height()

    query = hypersync.Query(
        from_block=from_block,
        to_block=to_block,
        # Get all blocks this address mined, and get all associated transactions
        blocks=[
            BlockSelection(miner=[miner_address])
        ],
        join_mode=JoinMode.JOIN_ALL,
        field_selection=FieldSelection(
            block=[
                BlockField.NUMBER,
                BlockField.TIMESTAMP,
                BlockField.MINER,
                BlockField.BASE_FEE_PER_GAS,
                BlockField.GAS_USED,
                BlockField.HASH,
            ],
            transaction=[
                TransactionField.EFFECTIVE_GAS_PRICE,
                TransactionField.GAS_USED,
                TransactionField.HASH,
            ],
        ),
    )

    print(f"Running block rewards query for miner {miner_address}...")
    res = await client.get(query)

    if not res.data.blocks:
        return {
            "error": "No blocks found for this miner",
            "miner_address": miner_address,
            "from_block": from_block,
            "to_block": to_block
        }

    # Calculate rewards
    total_tx_fee = 0
    total_burned_fee = 0
    blocks_mined = []

    # Group transactions by block for calculation
    tx_by_block = {}
    for tx in res.data.transactions:
        block_num = tx.block_number
        if block_num not in tx_by_block:
            tx_by_block[block_num] = []
        tx_by_block[block_num].append(tx)

    for block in res.data.blocks:
        block_number = block.number
        block_gas_used = int(block.gas_used) if block.gas_used else 0
        base_fee_per_gas = int(block.base_fee_per_gas) if hasattr(block, 'base_fee_per_gas') and block.base_fee_per_gas else 0
        
        # Calculate burned fee for this block
        burned_fee = base_fee_per_gas * block_gas_used
        total_burned_fee += burned_fee

        # Calculate transaction fees for this block
        block_tx_fee = 0
        tx_count = 0
        
        if block_number in tx_by_block:
            for tx in tx_by_block[block_number]:
                effective_gas_price = int(tx.effective_gas_price) if tx.effective_gas_price else 0
                gas_used = int(tx.gas_used) if tx.gas_used else 0
                tx_fee = effective_gas_price * gas_used
                block_tx_fee += tx_fee
                tx_count += 1

        total_tx_fee += block_tx_fee
        
        block_info = {
            "block_number": block_number,
            "timestamp": block.timestamp,
            "hash": block.hash,
            "gas_used": block_gas_used,
            "base_fee_per_gas": base_fee_per_gas,
            "transaction_count": tx_count,
            "total_tx_fees": block_tx_fee,
            "burned_fees": burned_fee,
            "net_reward": block_tx_fee - burned_fee
        }
        blocks_mined.append(block_info)

    net_reward = total_tx_fee - total_burned_fee

    return {
        "miner_address": miner_address,
        "from_block": from_block,
        "to_block": to_block,
        "blocks_mined_count": len(blocks_mined),
        "total_transaction_fees": total_tx_fee,
        "total_burned_fees": total_burned_fee,
        "net_reward": net_reward,
        "blocks_mined": blocks_mined,
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }
