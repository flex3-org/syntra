import hypersync
from hypersync import BlockField, TransactionField, LogField, FieldSelection, TransactionSelection, LogSelection
from config.hypersync_client import get_hypersync_client, Chain
from typing import Optional

async def wallet_activity(wallet_address: str, from_block: int, to_block: int, include_erc20: bool = True, chain: Optional[Chain] = None):
    """
    Get all transaction activity for a specific wallet address within a block range.
    Includes both ETH transactions and optionally ERC20 transfers.
    """
    client = get_hypersync_client(chain)

    # Normalize address to lowercase
    wallet_address = wallet_address.lower()

    # Build transaction selections for both incoming and outgoing transactions
    transaction_selections = [
        TransactionSelection(from_=[wallet_address]),  # Outgoing transactions
        TransactionSelection(to=[wallet_address]),     # Incoming transactions
    ]

    log_selections = []
    if include_erc20:
        # ERC20 Transfer event signature
        transfer_topic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        
        # Convert address to topic format for filtering
        address_topic = "0x000000000000000000000000" + wallet_address[2:]
        
        # ERC20 transfers TO this address (topic2)
        log_selections.append(LogSelection(
            topics=[
                [transfer_topic],
                [],
                [address_topic],
                [],
            ]
        ))
        
        # ERC20 transfers FROM this address (topic1)
        log_selections.append(LogSelection(
            topics=[
                [transfer_topic],
                [address_topic],
                [],
                [],
            ]
        ))

    query = hypersync.Query(
        from_block=from_block,
        to_block=to_block,
        transactions=transaction_selections,
        logs=log_selections if include_erc20 else None,
        field_selection=FieldSelection(
            block=[BlockField.NUMBER, BlockField.TIMESTAMP, BlockField.HASH],
            transaction=[
                TransactionField.BLOCK_NUMBER,
                TransactionField.TRANSACTION_INDEX,
                TransactionField.HASH,
                TransactionField.FROM,
                TransactionField.TO,
                TransactionField.VALUE,
                TransactionField.INPUT,
                TransactionField.GAS_USED,
                TransactionField.GAS_PRICE,
            ],
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
            ] if include_erc20 else None,
        ),
    )

    print(f"Running wallet activity query for {wallet_address}...")
    res = await client.get(query)

    # Process ETH transactions
    eth_transactions = []
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
            "type": "outgoing" if tx.from_.lower() == wallet_address else "incoming",
        }
        eth_transactions.append(tx_data)

    result = {
        "wallet_address": wallet_address,
        "eth_transactions": eth_transactions,
        "eth_transaction_count": len(eth_transactions),
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }

    # Process ERC20 transfers if requested
    if include_erc20 and res.data.logs:
        decoder = hypersync.Decoder([
            "Transfer(address indexed from, address indexed to, uint256 value)"
        ])
        
        decoded_logs = await decoder.decode_logs(res.data.logs)
        
        erc20_transfers = []
        for i, log in enumerate(res.data.logs):
            decoded_log = decoded_logs[i] if i < len(decoded_logs) else None
            
            if decoded_log and decoded_log.indexed and decoded_log.body:
                from_addr = decoded_log.indexed[0].val.lower()
                to_addr = decoded_log.indexed[1].val.lower()
                
                transfer_data = {
                    "transaction_hash": log.transaction_hash,
                    "log_index": log.log_index,
                    "contract_address": log.address,
                    "from_address": from_addr,
                    "to_address": to_addr,
                    "value": str(decoded_log.body[0].val),
                    "type": "outgoing" if from_addr == wallet_address else "incoming",
                }
                erc20_transfers.append(transfer_data)
        
        result["erc20_transfers"] = erc20_transfers
        result["erc20_transfer_count"] = len(erc20_transfers)

    return result
