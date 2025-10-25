import hypersync
from hypersync import BlockField, TransactionField, LogField, FieldSelection, LogSelection
from config.hypersync_client import get_hypersync_client

async def erc20_transfers_and_approvals(from_block: int, to_block: int, contract_address: str = None):
    """
    Get all ERC20 transfer and approval events within a block range.
    Optionally filter by contract address.
    """
    client = get_hypersync_client()

    # ERC20 event signatures
    transfer_topic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    approval_topic = "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"

    # Create separate log selections for transfers and approvals (acts as OR)
    log_selections = [
        LogSelection(topics=[[transfer_topic]]),
        LogSelection(topics=[[approval_topic]])
    ]
    
    # Add contract address filter if provided
    if contract_address:
        for log_selection in log_selections:
            log_selection.address = [contract_address]

    query = hypersync.Query(
        from_block=from_block,
        to_block=to_block,
        logs=log_selections,
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

    print("Running ERC20 transfers and approvals query...")
    res = await client.get(query)

    # Create decoder for both Transfer and Approval events
    decoder = hypersync.Decoder([
        "Transfer(address indexed from, address indexed to, uint256 value)",
        "Approval(address indexed owner, address indexed spender, uint256 value)"
    ])

    # Decode the logs
    decoded_logs = await decoder.decode_logs(res.data.logs)

    transfers = []
    approvals = []
    total_transfer_volume = 0
    total_approval_volume = 0

    for i, log in enumerate(res.data.logs):
        decoded_log = decoded_logs[i] if i < len(decoded_logs) else None
        event_signature = log.topic0
        
        base_data = {
            "log_index": log.log_index,
            "transaction_hash": log.transaction_hash,
            "contract_address": log.address,
            "block_number": log.block_number,
            "transaction_index": log.transaction_index,
        }
        
        if decoded_log and decoded_log.indexed and decoded_log.body:
            if event_signature == transfer_topic:
                transfer_data = base_data.copy()
                transfer_data.update({
                    "from_address": decoded_log.indexed[0].val,
                    "to_address": decoded_log.indexed[1].val,
                    "value": str(decoded_log.body[0].val),
                })
                transfers.append(transfer_data)
                total_transfer_volume += decoded_log.body[0].val
                
            elif event_signature == approval_topic:
                approval_data = base_data.copy()
                approval_data.update({
                    "owner_address": decoded_log.indexed[0].val,
                    "spender_address": decoded_log.indexed[1].val,
                    "value": str(decoded_log.body[0].val),
                })
                approvals.append(approval_data)
                total_approval_volume += decoded_log.body[0].val

    return {
        "transfers": transfers,
        "approvals": approvals,
        "total_transfers": len(transfers),
        "total_approvals": len(approvals),
        "total_transfer_volume": str(total_transfer_volume),
        "total_approval_volume": str(total_approval_volume),
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }
