import hypersync
from hypersync import TransactionField, FieldSelection, TransactionSelection
from config.hypersync_client import get_hypersync_client

async def call_decoder(contract_address: str, function_signature: str, from_block: int, to_block: int = None):
    """
    Decode function calls to a specific contract within a block range.
    """
    client = get_hypersync_client()

    # If no to_block specified, get current height
    if to_block is None:
        to_block = await client.get_height()

    query = hypersync.Query(
        from_block=from_block,
        to_block=to_block,
        # Select all transactions to the contract address
        transactions=[
            TransactionSelection(to=[contract_address])
        ],
        # Select the fields we want
        field_selection=FieldSelection(
            transaction=[
                TransactionField.HASH,
                TransactionField.BLOCK_NUMBER,
                TransactionField.TRANSACTION_INDEX,
                TransactionField.FROM,
                TransactionField.TO,
                TransactionField.INPUT,
                TransactionField.VALUE,
                TransactionField.GAS_USED,
            ]
        )
    )

    print(f"Running call decoder query for contract {contract_address}...")
    res = await client.get(query)

    # Create decoder for the function calls
    decoder = hypersync.CallDecoder([function_signature])

    # Decode the transaction inputs
    decoded_calls = await decoder.decode_transactions_input(res.data.transactions)

    calls = []
    successful_decodes = 0

    for i, tx in enumerate(res.data.transactions):
        decoded_call = decoded_calls[i] if i < len(decoded_calls) else None
        
        call_data = {
            "transaction_hash": tx.hash,
            "block_number": tx.block_number,
            "transaction_index": tx.transaction_index,
            "from": tx.from_,
            "to": tx.to,
            "value": tx.value,
            "gas_used": tx.gas_used,
            "input": tx.input,
            "decoded": False,
            "function_signature": function_signature,
        }
        
        if decoded_call:
            call_data["decoded"] = True
            call_data["decoded_parameters"] = []
            
            # Extract decoded parameters
            for param in decoded_call:
                call_data["decoded_parameters"].append({
                    "value": str(param.val),
                    "type": type(param.val).__name__
                })
            
            successful_decodes += 1
        
        calls.append(call_data)

    return {
        "calls": calls,
        "contract_address": contract_address,
        "function_signature": function_signature,
        "total_calls": len(calls),
        "successful_decodes": successful_decodes,
        "decode_success_rate": successful_decodes / len(calls) if calls else 0,
        "from_block": from_block,
        "to_block": to_block,
        "next_block": res.next_block,
        "archive_height": res.archive_height,
    }
