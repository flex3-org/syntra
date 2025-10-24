import hypersync
from hypersync import ClientConfig, JoinMode, TransactionField, FieldSelection, TransactionSelection, Query
from fastapi import HTTPException

async def txn_by_id(tx_hash: str):
    client = hypersync.HypersyncClient(ClientConfig(
      url="https://eth.hypersync.xyz",
      bearer_token="f994fd7c-9894-482d-8618-8d1586cadfe7",
    ))

    query = hypersync.Query(
        from_block=0,
        join_mode=JoinMode.JOIN_NOTHING,
        field_selection=FieldSelection(
            transaction=[
                TransactionField.BLOCK_NUMBER,
                TransactionField.TRANSACTION_INDEX,
                TransactionField.HASH,
                TransactionField.FROM,
                TransactionField.TO,
                TransactionField.VALUE,
                TransactionField.INPUT,
            ]
        ),
        transactions=[
            TransactionSelection(
                hash=[
                    tx_hash
                ]
            )
        ],
    )

    try:
        res = await client.get(query)
        
        if not res.data.transactions:
            return {
                "error": "No transaction found"
            }

        tx = res.data.transactions[0]
        return {
            "block_number": tx.block_number,
            "transaction_index": tx.transaction_index,
            "hash": tx.hash,
            "from": tx.from_,
            "to": tx.to,
            "value": tx.value,
            "input": tx.input
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))