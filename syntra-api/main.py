from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx

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

@app.post("/query")
async def query_hypersync():
    query_body = {
    "fromBlock": 0,
    "transactions": [
      {
        "from": ["0x5a830d7a5149b2f1a2e72d15cd51b84379ee81e5"]
      },
      {
        "to": ["0x5a830d7a5149b2f1a2e72d15cd51b84379ee81e5"]
      }
    ],
  };
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://eth.hypersync.xyz/query",
                json=query_body,
                headers={"Content-Type": "application/json"}
            )
            response.raise_for_status()
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
