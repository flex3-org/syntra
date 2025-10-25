from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers import hypersync_router
from fastapi_mcp import FastApiMCP

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    hypersync_router.router,
    prefix="/api/hypersync",
    tags=["hypersync"],
    responses={404: {"description": "Not found"}},
)

@app.get("/")
def hi():
    return {"I am running at 8000!"}

mcp_v1 = FastApiMCP(
    app,
    name="Kuration AI MCP!",
    include_operations=[
        "txn_by_id",
        "blocks_transactions_hashes"
    ],
)
mcp_v1.mount(mount_path="mcp")