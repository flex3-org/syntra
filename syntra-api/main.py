from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import hypersync
from hypersync import (
    JoinMode,
    TransactionField,
    ClientConfig,
    TransactionSelection,
    FieldSelection
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def hi():
    return {"I am running at 8000!"}

@app.get("/query")
async def query_hypersync():
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
                    "0x410eec15e380c6f23c2294ad714487b2300dd88a7eaa051835e0da07f16fc282"
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
