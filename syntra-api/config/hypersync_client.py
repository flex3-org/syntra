import hypersync
from typing import Dict, Optional
from enum import Enum

class Chain(str, Enum):
    ABSTRACT = "abstract"
    ARBITRUM = "arbitrum"
    ARBITRUM_NOVA = "arbitrum_nova"
    ARBITRUM_SEPOLIA = "arbitrum_sepolia"
    AURORA = "aurora"
    AURORA_TURBO = "aurora_turbo"
    AVALANCHE = "avalanche"
    BASE = "base"
    BASE_SEPOLIA = "base_sepolia"
    BERACHAIN = "berachain"
    BLAST = "blast"
    BLAST_SEPOLIA = "blast_sepolia"
    BOBA = "boba"
    BSC = "bsc"
    BSC_TESTNET = "bsc_testnet"
    CELO = "celo"
    CHAINWEB_TESTNET_20 = "chainweb_testnet_20"
    CHAINWEB_TESTNET_21 = "chainweb_testnet_21"
    CHAINWEB_TESTNET_22 = "chainweb_testnet_22"
    CHAINWEB_TESTNET_23 = "chainweb_testnet_23"
    CHAINWEB_TESTNET_24 = "chainweb_testnet_24"
    CHILIZ = "chiliz"
    CITREA_TESTNET = "citrea_testnet"
    CURTIS = "curtis"
    CYBER = "cyber"
    DAMON = "damon"
    ETH_TRACES = "eth_traces"
    ETHEREUM = "ethereum"
    FANTOM = "fantom"
    FLARE = "flare"
    FRAXTAL = "fraxtal"
    FUJI = "fuji"
    GNOSIS = "gnosis"
    GNOSIS_CHIADO = "gnosis_chiado"
    GNOSIS_TRACES = "gnosis_traces"
    HARMONY_SHARD_0 = "harmony_shard_0"
    HOLESKY = "holesky"
    HYPERLIQUID = "hyperliquid"
    INK = "ink"
    KROMA = "kroma"
    LINEA = "linea"
    LISK = "lisk"
    LUKSO = "lukso"
    LUKSO_TESTNET = "lukso_testnet"
    MANTA = "manta"
    MANTLE = "mantle"
    MEGAETH_TESTNET = "megaeth_testnet"
    MERLIN = "merlin"
    METALL2 = "metall2"
    MEV_COMMIT = "mev_commit"
    MODE = "mode"
    MONAD_TESTNET = "monad_testnet"
    MOONBASE_ALPHA = "moonbase_alpha"
    MOONBEAM = "moonbeam"
    MORPH = "morph"
    OPBNB = "opbnb"
    OPTIMISM = "optimism"
    OPTIMISM_SEPOLIA = "optimism_sepolia"
    PLASMA = "plasma"
    PLUME = "plume"
    POLYGON = "polygon"
    POLYGON_AMOY = "polygon_amoy"
    POLYGON_ZKEVM = "polygon_zkevm"
    ROOTSTOCK = "rootstock"
    SAAKURU = "saakuru"
    SCROLL = "scroll"
    SENTIENT_TESTNET = "sentient_testnet"
    SEPOLIA = "sepolia"
    SHIMMER_EVM = "shimmer_evm"
    SONEIUM = "soneium"
    SONIC = "sonic"
    SOPHON = "sophon"
    SOPHON_TESTNET = "sophon_testnet"
    SUPERSEED = "superseed"
    SWELL = "swell"
    TANGLE = "tangle"
    TARAXA = "taraxa"
    UNICHAIN = "unichain"
    WORLDCHAIN = "worldchain"
    XDC = "xdc"
    XDC_TESTNET = "xdc_testnet"
    ZETA = "zeta"
    ZIRCUIT = "zircuit"
    ZKSYNC = "zksync"
    ZORA = "zora"

# Chain configuration mapping
CHAIN_CONFIGS = {
    Chain.ABSTRACT: {
        "url": "https://abstract.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Abstract",
        "chain_id": 2741,
        "tier": "🪨"
    },
    Chain.ARBITRUM: {
        "url": "https://arbitrum.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Arbitrum",
        "chain_id": 42161,
        "tier": "🥈"
    },
    Chain.ARBITRUM_NOVA: {
        "url": "https://arbitrum-nova.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Arbitrum Nova",
        "chain_id": 42170,
        "tier": "🥉"
    },
    Chain.ARBITRUM_SEPOLIA: {
        "url": "https://arbitrum-sepolia.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Arbitrum Sepolia",
        "chain_id": 421614,
        "tier": "🎒"
    },
    Chain.AURORA: {
        "url": "https://aurora.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Aurora",
        "chain_id": 1313161554,
        "tier": "🪨"
    },
    Chain.AURORA_TURBO: {
        "url": "https://aurora-turbo.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Aurora Turbo",
        "chain_id": 1313161567,
        "tier": "🪨"
    },
    Chain.AVALANCHE: {
        "url": "https://avalanche.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Avalanche",
        "chain_id": 43114,
        "tier": "🥉"
    },
    Chain.BASE: {
        "url": "https://base.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Base",
        "chain_id": 8453,
        "tier": "🏅"
    },
    Chain.BASE_SEPOLIA: {
        "url": "https://base-sepolia.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Base Sepolia",
        "chain_id": 84532,
        "tier": "🎒"
    },
    Chain.BERACHAIN: {
        "url": "https://berachain.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Berachain",
        "chain_id": 80094,
        "tier": "🥉"
    },
    Chain.BLAST: {
        "url": "https://blast.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Blast",
        "chain_id": 81457,
        "tier": "🥉"
    },
    Chain.BLAST_SEPOLIA: {
        "url": "https://blast-sepolia.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Blast Sepolia",
        "chain_id": 168587773,
        "tier": "🎒"
    },
    Chain.BOBA: {
        "url": "https://boba.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Boba",
        "chain_id": 288,
        "tier": "🪨"
    },
    Chain.BSC: {
        "url": "https://bsc.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "BSC",
        "chain_id": 56,
        "tier": "🥉"
    },
    Chain.BSC_TESTNET: {
        "url": "https://bsc-testnet.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "BSC Testnet",
        "chain_id": 97,
        "tier": "🎒"
    },
    Chain.CELO: {
        "url": "https://celo.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Celo",
        "chain_id": 42220,
        "tier": "🪨"
    },
    Chain.CHAINWEB_TESTNET_20: {
        "url": "https://chainweb-testnet-20.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Chainweb Testnet 20",
        "chain_id": 5920,
        "tier": "🪨"
    },
    Chain.CHAINWEB_TESTNET_21: {
        "url": "https://chainweb-testnet-21.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Chainweb Testnet 21",
        "chain_id": 5921,
        "tier": "🪨"
    },
    Chain.CHAINWEB_TESTNET_22: {
        "url": "https://chainweb-testnet-22.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Chainweb Testnet 22",
        "chain_id": 5922,
        "tier": "🪨"
    },
    Chain.CHAINWEB_TESTNET_23: {
        "url": "https://chainweb-testnet-23.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Chainweb Testnet 23",
        "chain_id": 5923,
        "tier": "🪨"
    },
    Chain.CHAINWEB_TESTNET_24: {
        "url": "https://chainweb-testnet-24.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Chainweb Testnet 24",
        "chain_id": 5924,
        "tier": "🪨"
    },
    Chain.CHILIZ: {
        "url": "https://chiliz.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Chiliz",
        "chain_id": 88888,
        "tier": "🪨"
    },
    Chain.CITREA_TESTNET: {
        "url": "https://citrea-testnet.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Citrea Testnet",
        "chain_id": 5115,
        "tier": "🪨"
    },
    Chain.CURTIS: {
        "url": "https://curtis.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Curtis",
        "chain_id": 33111,
        "tier": "🪨"
    },
    Chain.CYBER: {
        "url": "https://cyber.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Cyber",
        "chain_id": 7560,
        "tier": "🪨"
    },
    Chain.DAMON: {
        "url": "https://damon.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Damon",
        "chain_id": 341,
        "tier": "🪨"
    },
    Chain.ETH_TRACES: {
        "url": "https://eth-traces.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Eth Traces",
        "chain_id": 1,
        "tier": "🏅"
    },
    Chain.ETHEREUM: {
        "url": "https://eth.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Ethereum Mainnet",
        "chain_id": 1,
        "tier": "🏅"
    },
    Chain.FANTOM: {
        "url": "https://fantom.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Fantom",
        "chain_id": 250,
        "tier": "🪨"
    },
    Chain.FLARE: {
        "url": "https://flare.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Flare",
        "chain_id": 14,
        "tier": "🪨"
    },
    Chain.FRAXTAL: {
        "url": "https://fraxtal.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Fraxtal",
        "chain_id": 252,
        "tier": "🪨"
    },
    Chain.FUJI: {
        "url": "https://fuji.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Fuji",
        "chain_id": 43113,
        "tier": "🎒"
    },
    Chain.GNOSIS: {
        "url": "https://gnosis.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Gnosis",
        "chain_id": 100,
        "tier": "🏅"
    },
    Chain.GNOSIS_CHIADO: {
        "url": "https://gnosis-chiado.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Gnosis Chiado",
        "chain_id": 10200,
        "tier": "🎒"
    },
    Chain.GNOSIS_TRACES: {
        "url": "https://gnosis-traces.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Gnosis Traces",
        "chain_id": 100,
        "tier": "🥉"
    },
    Chain.HARMONY_SHARD_0: {
        "url": "https://harmony-shard-0.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Harmony Shard 0",
        "chain_id": 1666600000,
        "tier": "🪨"
    },
    Chain.HOLESKY: {
        "url": "https://holesky.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Holesky",
        "chain_id": 17000,
        "tier": "🎒"
    },
    Chain.HYPERLIQUID: {
        "url": "https://hyperliquid.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Hyperliquid",
        "chain_id": 999,
        "tier": "🪨"
    },
    Chain.INK: {
        "url": "https://ink.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Ink",
        "chain_id": 57073,
        "tier": "🪨"
    },
    Chain.KROMA: {
        "url": "https://kroma.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Kroma",
        "chain_id": 255,
        "tier": "🪨"
    },
    Chain.LINEA: {
        "url": "https://linea.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Linea",
        "chain_id": 59144,
        "tier": "🥉"
    },
    Chain.LISK: {
        "url": "https://lisk.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Lisk",
        "chain_id": 1135,
        "tier": "🪨"
    },
    Chain.LUKSO: {
        "url": "https://lukso.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Lukso",
        "chain_id": 42,
        "tier": "🪨"
    },
    Chain.LUKSO_TESTNET: {
        "url": "https://lukso-testnet.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Lukso Testnet",
        "chain_id": 4201,
        "tier": "🎒"
    },
    Chain.MANTA: {
        "url": "https://manta.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Manta",
        "chain_id": 169,
        "tier": "🪨"
    },
    Chain.MANTLE: {
        "url": "https://mantle.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Mantle",
        "chain_id": 5000,
        "tier": "🪨"
    },
    Chain.MEGAETH_TESTNET: {
        "url": "https://megaeth-testnet.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Megaeth Testnet",
        "chain_id": 6342,
        "tier": "🥈"
    },
    Chain.MERLIN: {
        "url": "https://merlin.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Merlin",
        "chain_id": 4200,
        "tier": "🪨"
    },
    Chain.METALL2: {
        "url": "https://metall2.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Metall2",
        "chain_id": 1750,
        "tier": "🪨"
    },
    Chain.MEV_COMMIT: {
        "url": "https://mev-commit.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Mev Commit",
        "chain_id": 17864,
        "tier": "🪨"
    },
    Chain.MODE: {
        "url": "https://mode.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Mode",
        "chain_id": 34443,
        "tier": "🪨"
    },
    Chain.MONAD_TESTNET: {
        "url": "https://monad-testnet.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Monad Testnet",
        "chain_id": 10143,
        "tier": "🏅"
    },
    Chain.MOONBASE_ALPHA: {
        "url": "https://moonbase-alpha.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Moonbase Alpha",
        "chain_id": 1287,
        "tier": "🪨"
    },
    Chain.MOONBEAM: {
        "url": "https://moonbeam.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Moonbeam",
        "chain_id": 1284,
        "tier": "🪨"
    },
    Chain.MORPH: {
        "url": "https://morph.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Morph",
        "chain_id": 2818,
        "tier": "🪨"
    },
    Chain.OPBNB: {
        "url": "https://opbnb.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Opbnb",
        "chain_id": 204,
        "tier": "🪨"
    },
    Chain.OPTIMISM: {
        "url": "https://optimism.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Optimism",
        "chain_id": 10,
        "tier": "🏅"
    },
    Chain.OPTIMISM_SEPOLIA: {
        "url": "https://optimism-sepolia.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Optimism Sepolia",
        "chain_id": 11155420,
        "tier": "🎒"
    },
    Chain.PLASMA: {
        "url": "https://plasma.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Plasma",
        "chain_id": 9745,
        "tier": "🥉"
    },
    Chain.PLUME: {
        "url": "https://plume.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Plume",
        "chain_id": 98866,
        "tier": "🪨"
    },
    Chain.POLYGON: {
        "url": "https://polygon.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Polygon",
        "chain_id": 137,
        "tier": "🥈"
    },
    Chain.POLYGON_AMOY: {
        "url": "https://polygon-amoy.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Polygon Amoy",
        "chain_id": 80002,
        "tier": "🥉"
    },
    Chain.POLYGON_ZKEVM: {
        "url": "https://polygon-zkevm.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Polygon zkEVM",
        "chain_id": 1101,
        "tier": "🪨"
    },
    Chain.ROOTSTOCK: {
        "url": "https://rootstock.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Rootstock",
        "chain_id": 30,
        "tier": "🪨"
    },
    Chain.SAAKURU: {
        "url": "https://saakuru.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Saakuru",
        "chain_id": 7225878,
        "tier": "🪨"
    },
    Chain.SCROLL: {
        "url": "https://scroll.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Scroll",
        "chain_id": 534352,
        "tier": "🪨"
    },
    Chain.SENTIENT_TESTNET: {
        "url": "https://sentient-testnet.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Sentient Testnet",
        "chain_id": 1184075182,
        "tier": "🪨"
    },
    Chain.SEPOLIA: {
        "url": "https://sepolia.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Sepolia",
        "chain_id": 11155111,
        "tier": "🎒"
    },
    Chain.SHIMMER_EVM: {
        "url": "https://shimmer-evm.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Shimmer Evm",
        "chain_id": 148,
        "tier": "🪨"
    },
    Chain.SONEIUM: {
        "url": "https://soneium.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Soneium",
        "chain_id": 1868,
        "tier": "🪨"
    },
    Chain.SONIC: {
        "url": "https://sonic.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Sonic",
        "chain_id": 146,
        "tier": "🪨"
    },
    Chain.SOPHON: {
        "url": "https://sophon.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Sophon",
        "chain_id": 50104,
        "tier": "🪨"
    },
    Chain.SOPHON_TESTNET: {
        "url": "https://sophon-testnet.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Sophon Testnet",
        "chain_id": 531050104,
        "tier": "🎒"
    },
    Chain.SUPERSEED: {
        "url": "https://superseed.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Superseed",
        "chain_id": 5330,
        "tier": "🪨"
    },
    Chain.SWELL: {
        "url": "https://swell.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Swell",
        "chain_id": 1923,
        "tier": "🪨"
    },
    Chain.TANGLE: {
        "url": "https://tangle.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Tangle",
        "chain_id": 5845,
        "tier": "🪨"
    },
    Chain.TARAXA: {
        "url": "https://taraxa.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Taraxa",
        "chain_id": 841,
        "tier": "🥉"
    },
    Chain.UNICHAIN: {
        "url": "https://unichain.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Unichain",
        "chain_id": 130,
        "tier": "🪨"
    },
    Chain.WORLDCHAIN: {
        "url": "https://worldchain.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Worldchain",
        "chain_id": 480,
        "tier": "🪨"
    },
    Chain.XDC: {
        "url": "https://xdc.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Xdc",
        "chain_id": 50,
        "tier": "🥈"
    },
    Chain.XDC_TESTNET: {
        "url": "https://xdc-testnet.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Xdc Testnet",
        "chain_id": 51,
        "tier": "🎒"
    },
    Chain.ZETA: {
        "url": "https://zeta.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Zeta",
        "chain_id": 7000,
        "tier": "🪨"
    },
    Chain.ZIRCUIT: {
        "url": "https://zircuit.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Zircuit",
        "chain_id": 48900,
        "tier": "🪨"
    },
    Chain.ZKSYNC: {
        "url": "https://zksync.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "ZKsync",
        "chain_id": 324,
        "tier": "🥉"
    },
    Chain.ZORA: {
        "url": "https://zora.hypersync.xyz",
        "bearer_token": "f994fd7c-9894-482d-8618-8d1586cadfe7",
        "name": "Zora",
        "chain_id": 7777777,
        "tier": "🪨"
    }
}

# Client cache for each chain
_clients: Dict[Chain, hypersync.HypersyncClient] = {}

def get_hypersync_client(chain: Optional[Chain] = None) -> hypersync.HypersyncClient:
    """
    Get the hypersync client instance for the specified chain.
    Creates the client on first call and reuses it for subsequent calls.
    
    Args:
        chain: The blockchain to connect to. Defaults to Ethereum if not specified.
    
    Returns:
        HypersyncClient instance for the specified chain
    """
    if chain is None:
        chain = Chain.ETHEREUM
    
    if chain not in _clients:
        config = CHAIN_CONFIGS.get(chain)
        if not config:
            raise ValueError(f"Unsupported chain: {chain}")
        
        _clients[chain] = hypersync.HypersyncClient(hypersync.ClientConfig(
            url=config["url"],
            bearer_token=config["bearer_token"],
        ))
    
    return _clients[chain]

def get_chain_info(chain: Chain) -> dict:
    """
    Get chain configuration information.
    
    Args:
        chain: The blockchain to get info for
    
    Returns:
        Dictionary containing chain configuration
    """
    return CHAIN_CONFIGS.get(chain, {})

