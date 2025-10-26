# Syntra - AI-Powered Blockchain Data Querying Platform

Syntra is an intelligent blockchain data querying platform that combines the power of Hypersync with AI-driven interfaces to make blockchain data easily accessible and queryable. The platform consists of a FastAPI backend for blockchain data operations and a Next.js frontend with an AI chat interface.

# Data Flow Diagram
<img width="842" height="623" alt="Screenshot 2025-10-26 at 6 25 39 PM" src="https://github.com/user-attachments/assets/af2f3e8a-e9bb-4d79-b01d-1b58f6cd01a0" />

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Access to Hypersync API (bearer token configured in backend)

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd syntra-api
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Hypersync** (optional, if you need a different endpoint):
   Edit `config/hypersync_client.py` to update the URL and bearer token.

5. **Run the backend server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

The API will be available at `http://localhost:8000` with documentation at `http://localhost:8000/docs`.

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd syntra-next
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`.

## Features

### Backend (FastAPI)
- **Blockchain Data Queries**: Access Ethereum blockchain data through Hypersync
- **MCP Integration**: Model Context Protocol (MCP) support for AI tool calling
- **REST API**: Comprehensive REST endpoints for blockchain data
- **Available Operations**:
  - Transaction lookups by hash
  - Block data queries
  - ERC20 transfer tracking
  - Contract event logs
  - Wallet activity monitoring
  - Uniswap swap event tracking
  - Call decoding for contract interactions
  - Block rewards calculation
  - And more...

### Frontend (Next.js)
- **AI Chat Interface**: Natural language interaction for blockchain queries
- **MCP Chat Integration**: Connects to backend via Model Context Protocol
- **Real-time Updates**: Live connection status and query results
- **Dark Mode**: Built-in theme support
- **Responsive Design**: Modern, mobile-friendly UI
- **Quick Tasks**: Pre-defined query templates for common operations

## Usage

### Backend API

The backend provides multiple endpoints for blockchain data queries. Here are some examples:

#### Get Transaction by Hash
```python
POST /api/hypersync/txn_by_id
{
  "tx_hash": "0x1234567890abcdef1234567890abcdef..."
}
```

#### Get ERC20 Transfers
```python
POST /api/hypersync/erc20_transfers
{
  "from_block": 17000000,
  "to_block": 17000050,
  "contract_address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
}
```

#### Get Wallet Activity
```python
POST /api/hypersync/wallet_activity
{
  "wallet_address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "from_block": 17000000,
  "to_block": 17000050,
  "include_erc20": true
}
```

Full API documentation is available at `http://localhost:8000/docs` when the backend is running.

### Frontend Chat Interface

1. Start both the backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Use the chat interface to query blockchain data in natural language
4. Example queries:
   - "Get transactions for block 17000000"
   - "Show me ERC20 transfers for USDT in the last 100 blocks"
   - "What's the activity for wallet 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045?"

### MCP Integration
<img width="534" height="646" alt="Screenshot 2025-10-26 at 6 22 13 PM" src="https://github.com/user-attachments/assets/aa335346-dff1-462d-b2db-ae2752d5e1a8" />

The backend exposes an MCP endpoint at `/mcp` that allows AI systems to call blockchain querying tools. The frontend uses this integration to enable intelligent conversation about blockchain data.

#### Available MCP Operations:
- `txn_by_id` - Look up a transaction by its hash
- `blocks_transactions_hashes` - Get block and transaction hashes
- `erc20_transfers` - Track ERC20 token transfers
- `contract_logs` - Get logs from specific contracts
- `block_data` - Get detailed block information
- `chain_info` - Get blockchain information
- `wallet_activity` - Monitor wallet transactions
- `erc20_transfers_and_approvals` - Track transfers and approvals
- `block_rewards` - Calculate block rewards
- `blocks_and_transactions` - Get full block and transaction data
- `event_logs` - Query specific event logs
- `uniswap_swaps` - Track Uniswap DEX swaps
- `call_decoder` - Decode contract function calls

## Development
<img width="525" height="574" alt="Screenshot 2025-10-26 at 6 22 02 PM" src="https://github.com/user-attachments/assets/eade5f06-eb89-4c90-9bca-eaaf5902241a" />

### Backend Structure

```
syntra-api/
├── main.py                    # FastAPI app with MCP integration
├── routers/
│   └── hypersync_router.py    # Route definitions and request models
├── functions/                 # Query functions
│   ├── txn_by_id.py
│   ├── erc20_transfers.py
│   ├── wallet_activity.py
│   └── ...
└── config/
    └── hypersync_client.py    # Hypersync client singleton
```

### Frontend Structure

```
syntra-next/
└── app/
    ├── components/
    │   ├── mcp-chat/          # Chat components
    │   ├── Navbar.tsx
    │   ├── QuickTasks.tsx
    │   └── ThemeWrapper.tsx
    ├── contexts/
    │   └── ThemeContext.tsx   # Theme management
    ├── api/
    │   └── mcp-chat/         # Chat API route
    └── types/
        └── mcp-chat.ts       # TypeScript types
```

## Example Queries

Check out the `syntra-api/examples/` directory for comprehensive example scripts:

- `tx-by-hash.py` - Query a transaction by hash
- `all-erc20-transfers.py` - Get all ERC20 transfers in a range
- `wallet.py` - Monitor wallet activity
- `uniswap-pool-swap-events.py` - Track Uniswap swaps
- `block-data.py` - Get detailed block information
- And more...

## Configuration

### Backend Configuration

Edit `syntra-api/config/hypersync_client.py` to configure:
- Hypersync API URL
- Bearer token for authentication

### Frontend Configuration

The frontend connects to the backend at `http://localhost:8000`. Update the MCP URL in `MCPChat.tsx` if your backend runs on a different address.

## Additional Resources

- [Hypersync Documentation](https://docs.envio.dev/docs/HyperSync/overview)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MCP Specification](https://modelcontextprotocol.io/)

