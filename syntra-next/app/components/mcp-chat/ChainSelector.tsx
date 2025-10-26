"use client";

import { useState, useMemo, useRef, useEffect } from "react";

// Define all supported chains based on the backend configuration
export type Chain =
  | "abstract"
  | "arbitrum"
  | "arbitrum_nova"
  | "arbitrum_sepolia"
  | "aurora"
  | "aurora_turbo"
  | "avalanche"
  | "base"
  | "base_sepolia"
  | "berachain"
  | "blast"
  | "blast_sepolia"
  | "boba"
  | "bsc"
  | "bsc_testnet"
  | "celo"
  | "chainweb_testnet_20"
  | "chainweb_testnet_21"
  | "chainweb_testnet_22"
  | "chainweb_testnet_23"
  | "chainweb_testnet_24"
  | "chiliz"
  | "citrea_testnet"
  | "curtis"
  | "cyber"
  | "damon"
  | "eth_traces"
  | "ethereum"
  | "fantom"
  | "flare"
  | "fraxtal"
  | "fuji"
  | "gnosis"
  | "gnosis_chiado"
  | "gnosis_traces"
  | "harmony_shard_0"
  | "holesky"
  | "hyperliquid"
  | "ink"
  | "kroma"
  | "linea"
  | "lisk"
  | "lukso"
  | "lukso_testnet"
  | "manta"
  | "mantle"
  | "megaeth_testnet"
  | "merlin"
  | "metall2"
  | "mev_commit"
  | "mode"
  | "monad_testnet"
  | "moonbase_alpha"
  | "moonbeam"
  | "morph"
  | "opbnb"
  | "optimism"
  | "optimism_sepolia"
  | "plasma"
  | "plume"
  | "polygon"
  | "polygon_amoy"
  | "polygon_zkevm"
  | "rootstock"
  | "saakuru"
  | "scroll"
  | "sentient_testnet"
  | "sepolia"
  | "shimmer_evm"
  | "soneium"
  | "sonic"
  | "sophon"
  | "sophon_testnet"
  | "superseed"
  | "swell"
  | "tangle"
  | "taraxa"
  | "unichain"
  | "worldchain"
  | "xdc"
  | "xdc_testnet"
  | "zeta"
  | "zircuit"
  | "zksync"
  | "zora";

export interface ChainConfig {
  id: Chain;
  name: string;
  tier: string;
  chainId: number;
  category: "mainnet" | "testnet" | "l2" | "traces";
}

// Helper function to get chain icon based on tier
const getTierIcon = (tier: string): string => {
  switch (tier) {
    case "🏅":
      return "🏅"; // Gold
    case "🥈":
      return "🥈"; // Silver
    case "🥉":
      return "🥉"; // Bronze
    case "🎒":
      return "🎒"; // Testnet
    case "🪨":
      return "🪨"; // Basic
    default:
      return "⛓️"; // Default chain icon
  }
};

// Helper function to categorize chains
const getChainCategory = (
  name: string,
  tier: string
): "mainnet" | "testnet" | "l2" | "traces" => {
  const lowerName = name.toLowerCase();
  if (
    lowerName.includes("testnet") ||
    lowerName.includes("sepolia") ||
    lowerName.includes("holesky") ||
    lowerName.includes("fuji") ||
    lowerName.includes("chiado") ||
    lowerName.includes("amoy") ||
    tier === "🎒"
  ) {
    return "testnet";
  }
  if (lowerName.includes("traces")) {
    return "traces";
  }
  if (
    lowerName.includes("arbitrum") ||
    lowerName.includes("optimism") ||
    lowerName.includes("base") ||
    lowerName.includes("polygon") ||
    lowerName.includes("blast") ||
    lowerName.includes("scroll") ||
    lowerName.includes("linea") ||
    lowerName.includes("zksync") ||
    lowerName.includes("nova")
  ) {
    return "l2";
  }
  return "mainnet";
};

export const CHAIN_CONFIGS: Record<Chain, ChainConfig> = {
  abstract: {
    id: "abstract",
    name: "Abstract",
    tier: "🪨",
    chainId: 2741,
    category: "l2",
  },
  arbitrum: {
    id: "arbitrum",
    name: "Arbitrum",
    tier: "🥈",
    chainId: 42161,
    category: "l2",
  },
  arbitrum_nova: {
    id: "arbitrum_nova",
    name: "Arbitrum Nova",
    tier: "🥉",
    chainId: 42170,
    category: "l2",
  },
  arbitrum_sepolia: {
    id: "arbitrum_sepolia",
    name: "Arbitrum Sepolia",
    tier: "🎒",
    chainId: 421614,
    category: "testnet",
  },
  aurora: {
    id: "aurora",
    name: "Aurora",
    tier: "🪨",
    chainId: 1313161554,
    category: "l2",
  },
  aurora_turbo: {
    id: "aurora_turbo",
    name: "Aurora Turbo",
    tier: "🪨",
    chainId: 1313161567,
    category: "l2",
  },
  avalanche: {
    id: "avalanche",
    name: "Avalanche",
    tier: "🥉",
    chainId: 43114,
    category: "mainnet",
  },
  base: { id: "base", name: "Base", tier: "🏅", chainId: 8453, category: "l2" },
  base_sepolia: {
    id: "base_sepolia",
    name: "Base Sepolia",
    tier: "🎒",
    chainId: 84532,
    category: "testnet",
  },
  berachain: {
    id: "berachain",
    name: "Berachain",
    tier: "🥉",
    chainId: 80094,
    category: "mainnet",
  },
  blast: {
    id: "blast",
    name: "Blast",
    tier: "🥉",
    chainId: 81457,
    category: "l2",
  },
  blast_sepolia: {
    id: "blast_sepolia",
    name: "Blast Sepolia",
    tier: "🎒",
    chainId: 168587773,
    category: "testnet",
  },
  boba: { id: "boba", name: "Boba", tier: "🪨", chainId: 288, category: "l2" },
  bsc: { id: "bsc", name: "BSC", tier: "🥉", chainId: 56, category: "mainnet" },
  bsc_testnet: {
    id: "bsc_testnet",
    name: "BSC Testnet",
    tier: "🎒",
    chainId: 97,
    category: "testnet",
  },
  celo: {
    id: "celo",
    name: "Celo",
    tier: "🪨",
    chainId: 42220,
    category: "mainnet",
  },
  chainweb_testnet_20: {
    id: "chainweb_testnet_20",
    name: "Chainweb Testnet 20",
    tier: "🪨",
    chainId: 5920,
    category: "testnet",
  },
  chainweb_testnet_21: {
    id: "chainweb_testnet_21",
    name: "Chainweb Testnet 21",
    tier: "🪨",
    chainId: 5921,
    category: "testnet",
  },
  chainweb_testnet_22: {
    id: "chainweb_testnet_22",
    name: "Chainweb Testnet 22",
    tier: "🪨",
    chainId: 5922,
    category: "testnet",
  },
  chainweb_testnet_23: {
    id: "chainweb_testnet_23",
    name: "Chainweb Testnet 23",
    tier: "🪨",
    chainId: 5923,
    category: "testnet",
  },
  chainweb_testnet_24: {
    id: "chainweb_testnet_24",
    name: "Chainweb Testnet 24",
    tier: "🪨",
    chainId: 5924,
    category: "testnet",
  },
  chiliz: {
    id: "chiliz",
    name: "Chiliz",
    tier: "🪨",
    chainId: 88888,
    category: "mainnet",
  },
  citrea_testnet: {
    id: "citrea_testnet",
    name: "Citrea Testnet",
    tier: "🪨",
    chainId: 5115,
    category: "testnet",
  },
  curtis: {
    id: "curtis",
    name: "Curtis",
    tier: "🪨",
    chainId: 33111,
    category: "mainnet",
  },
  cyber: {
    id: "cyber",
    name: "Cyber",
    tier: "🪨",
    chainId: 7560,
    category: "l2",
  },
  damon: {
    id: "damon",
    name: "Damon",
    tier: "🪨",
    chainId: 341,
    category: "mainnet",
  },
  eth_traces: {
    id: "eth_traces",
    name: "Eth Traces",
    tier: "🏅",
    chainId: 1,
    category: "traces",
  },
  ethereum: {
    id: "ethereum",
    name: "Ethereum Mainnet",
    tier: "🏅",
    chainId: 1,
    category: "mainnet",
  },
  fantom: {
    id: "fantom",
    name: "Fantom",
    tier: "🪨",
    chainId: 250,
    category: "mainnet",
  },
  flare: {
    id: "flare",
    name: "Flare",
    tier: "🪨",
    chainId: 14,
    category: "mainnet",
  },
  fraxtal: {
    id: "fraxtal",
    name: "Fraxtal",
    tier: "🪨",
    chainId: 252,
    category: "l2",
  },
  fuji: {
    id: "fuji",
    name: "Fuji",
    tier: "🎒",
    chainId: 43113,
    category: "testnet",
  },
  gnosis: {
    id: "gnosis",
    name: "Gnosis",
    tier: "🏅",
    chainId: 100,
    category: "mainnet",
  },
  gnosis_chiado: {
    id: "gnosis_chiado",
    name: "Gnosis Chiado",
    tier: "🎒",
    chainId: 10200,
    category: "testnet",
  },
  gnosis_traces: {
    id: "gnosis_traces",
    name: "Gnosis Traces",
    tier: "🥉",
    chainId: 100,
    category: "traces",
  },
  harmony_shard_0: {
    id: "harmony_shard_0",
    name: "Harmony Shard 0",
    tier: "🪨",
    chainId: 1666600000,
    category: "mainnet",
  },
  holesky: {
    id: "holesky",
    name: "Holesky",
    tier: "🎒",
    chainId: 17000,
    category: "testnet",
  },
  hyperliquid: {
    id: "hyperliquid",
    name: "Hyperliquid",
    tier: "🪨",
    chainId: 999,
    category: "l2",
  },
  ink: { id: "ink", name: "Ink", tier: "🪨", chainId: 57073, category: "l2" },
  kroma: {
    id: "kroma",
    name: "Kroma",
    tier: "🪨",
    chainId: 255,
    category: "l2",
  },
  linea: {
    id: "linea",
    name: "Linea",
    tier: "🥉",
    chainId: 59144,
    category: "l2",
  },
  lisk: { id: "lisk", name: "Lisk", tier: "🪨", chainId: 1135, category: "l2" },
  lukso: {
    id: "lukso",
    name: "Lukso",
    tier: "🪨",
    chainId: 42,
    category: "mainnet",
  },
  lukso_testnet: {
    id: "lukso_testnet",
    name: "Lukso Testnet",
    tier: "🎒",
    chainId: 4201,
    category: "testnet",
  },
  manta: {
    id: "manta",
    name: "Manta",
    tier: "🪨",
    chainId: 169,
    category: "l2",
  },
  mantle: {
    id: "mantle",
    name: "Mantle",
    tier: "🪨",
    chainId: 5000,
    category: "l2",
  },
  megaeth_testnet: {
    id: "megaeth_testnet",
    name: "Megaeth Testnet",
    tier: "🥈",
    chainId: 6342,
    category: "testnet",
  },
  merlin: {
    id: "merlin",
    name: "Merlin",
    tier: "🪨",
    chainId: 4200,
    category: "l2",
  },
  metall2: {
    id: "metall2",
    name: "Metall2",
    tier: "🪨",
    chainId: 1750,
    category: "l2",
  },
  mev_commit: {
    id: "mev_commit",
    name: "Mev Commit",
    tier: "🪨",
    chainId: 17864,
    category: "mainnet",
  },
  mode: {
    id: "mode",
    name: "Mode",
    tier: "🪨",
    chainId: 34443,
    category: "l2",
  },
  monad_testnet: {
    id: "monad_testnet",
    name: "Monad Testnet",
    tier: "🏅",
    chainId: 10143,
    category: "testnet",
  },
  moonbase_alpha: {
    id: "moonbase_alpha",
    name: "Moonbase Alpha",
    tier: "🪨",
    chainId: 1287,
    category: "testnet",
  },
  moonbeam: {
    id: "moonbeam",
    name: "Moonbeam",
    tier: "🪨",
    chainId: 1284,
    category: "mainnet",
  },
  morph: {
    id: "morph",
    name: "Morph",
    tier: "🪨",
    chainId: 2818,
    category: "l2",
  },
  opbnb: {
    id: "opbnb",
    name: "Opbnb",
    tier: "🪨",
    chainId: 204,
    category: "l2",
  },
  optimism: {
    id: "optimism",
    name: "Optimism",
    tier: "🏅",
    chainId: 10,
    category: "l2",
  },
  optimism_sepolia: {
    id: "optimism_sepolia",
    name: "Optimism Sepolia",
    tier: "🎒",
    chainId: 11155420,
    category: "testnet",
  },
  plasma: {
    id: "plasma",
    name: "Plasma",
    tier: "🥉",
    chainId: 9745,
    category: "l2",
  },
  plume: {
    id: "plume",
    name: "Plume",
    tier: "🪨",
    chainId: 98866,
    category: "l2",
  },
  polygon: {
    id: "polygon",
    name: "Polygon",
    tier: "🥈",
    chainId: 137,
    category: "l2",
  },
  polygon_amoy: {
    id: "polygon_amoy",
    name: "Polygon Amoy",
    tier: "🥉",
    chainId: 80002,
    category: "testnet",
  },
  polygon_zkevm: {
    id: "polygon_zkevm",
    name: "Polygon zkEVM",
    tier: "🪨",
    chainId: 1101,
    category: "l2",
  },
  rootstock: {
    id: "rootstock",
    name: "Rootstock",
    tier: "🪨",
    chainId: 30,
    category: "l2",
  },
  saakuru: {
    id: "saakuru",
    name: "Saakuru",
    tier: "🪨",
    chainId: 7225878,
    category: "l2",
  },
  scroll: {
    id: "scroll",
    name: "Scroll",
    tier: "🪨",
    chainId: 534352,
    category: "l2",
  },
  sentient_testnet: {
    id: "sentient_testnet",
    name: "Sentient Testnet",
    tier: "🪨",
    chainId: 1184075182,
    category: "testnet",
  },
  sepolia: {
    id: "sepolia",
    name: "Sepolia",
    tier: "🎒",
    chainId: 11155111,
    category: "testnet",
  },
  shimmer_evm: {
    id: "shimmer_evm",
    name: "Shimmer Evm",
    tier: "🪨",
    chainId: 148,
    category: "mainnet",
  },
  soneium: {
    id: "soneium",
    name: "Soneium",
    tier: "🪨",
    chainId: 1868,
    category: "l2",
  },
  sonic: {
    id: "sonic",
    name: "Sonic",
    tier: "🪨",
    chainId: 146,
    category: "mainnet",
  },
  sophon: {
    id: "sophon",
    name: "Sophon",
    tier: "🪨",
    chainId: 50104,
    category: "l2",
  },
  sophon_testnet: {
    id: "sophon_testnet",
    name: "Sophon Testnet",
    tier: "🎒",
    chainId: 531050104,
    category: "testnet",
  },
  superseed: {
    id: "superseed",
    name: "Superseed",
    tier: "🪨",
    chainId: 5330,
    category: "l2",
  },
  swell: {
    id: "swell",
    name: "Swell",
    tier: "🪨",
    chainId: 1923,
    category: "l2",
  },
  tangle: {
    id: "tangle",
    name: "Tangle",
    tier: "🪨",
    chainId: 5845,
    category: "mainnet",
  },
  taraxa: {
    id: "taraxa",
    name: "Taraxa",
    tier: "🥉",
    chainId: 841,
    category: "mainnet",
  },
  unichain: {
    id: "unichain",
    name: "Unichain",
    tier: "🪨",
    chainId: 130,
    category: "l2",
  },
  worldchain: {
    id: "worldchain",
    name: "Worldchain",
    tier: "🪨",
    chainId: 480,
    category: "l2",
  },
  xdc: { id: "xdc", name: "Xdc", tier: "🥈", chainId: 50, category: "mainnet" },
  xdc_testnet: {
    id: "xdc_testnet",
    name: "Xdc Testnet",
    tier: "🎒",
    chainId: 51,
    category: "testnet",
  },
  zeta: {
    id: "zeta",
    name: "Zeta",
    tier: "🪨",
    chainId: 7000,
    category: "mainnet",
  },
  zircuit: {
    id: "zircuit",
    name: "Zircuit",
    tier: "🪨",
    chainId: 48900,
    category: "l2",
  },
  zksync: {
    id: "zksync",
    name: "ZKsync",
    tier: "🥉",
    chainId: 324,
    category: "l2",
  },
  zora: {
    id: "zora",
    name: "Zora",
    tier: "🪨",
    chainId: 7777777,
    category: "l2",
  },
};

interface ChainSelectorProps {
  selectedChain: Chain;
  onChainChange: (chain: Chain) => void;
  disabled?: boolean;
}

export function ChainSelector({
  selectedChain,
  onChainChange,
  disabled = false,
}: ChainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "mainnet" | "testnet" | "l2" | "traces"
  >("all");
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedConfig = CHAIN_CONFIGS[selectedChain];

  // Filter chains based on search query and category
  const filteredChains = useMemo(() => {
    let chains = Object.values(CHAIN_CONFIGS);

    // Filter by category
    if (selectedCategory !== "all") {
      chains = chains.filter((chain) => chain.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      chains = chains.filter(
        (chain) =>
          chain.name.toLowerCase().includes(query) ||
          chain.id.toLowerCase().includes(query) ||
          chain.chainId.toString().includes(query)
      );
    }

    // Sort by tier priority and then by name
    return chains.sort((a, b) => {
      const tierOrder = { "🏅": 0, "🥈": 1, "🥉": 2, "🎒": 3, "🪨": 4 };
      const aTier = tierOrder[a.tier as keyof typeof tierOrder] ?? 5;
      const bTier = tierOrder[b.tier as keyof typeof tierOrder] ?? 5;

      if (aTier !== bTier) return aTier - bTier;
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedCategory]);

  // Calculate dropdown position and focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 500; // Max height of dropdown

      // Check if there's enough space below
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      // Position dropdown above if there's not enough space below
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }

      // Focus search input
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleChainSelect = (chain: Chain) => {
    onChainChange(chain);
    setIsOpen(false);
    setSearchQuery("");
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "mainnet":
        return "Mainnets";
      case "testnet":
        return "Testnets";
      case "l2":
        return "Layer 2";
      case "traces":
        return "Traces";
      default:
        return "All Chains";
    }
  };

  const getCategoryCount = (category: string) => {
    if (category === "all") return Object.keys(CHAIN_CONFIGS).length;
    return Object.values(CHAIN_CONFIGS).filter(
      (chain) => chain.category === category
    ).length;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <span className="text-lg">{getTierIcon(selectedConfig.tier)}</span>
        <span className="truncate max-w-[120px]">{selectedConfig.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 w-96 h-96 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl z-50 max-h-[500px] flex flex-col ${
            dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search chains by name, ID, or chain number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="px-3 py-1 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {["all", "mainnet", "l2", "testnet", "traces"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm"
                  }`}
                >
                  {getCategoryLabel(category)} ({getCategoryCount(category)})
                </button>
              ))}
            </div>
          </div>

          {/* Chain List - Scrollable */}
          <div
            className="flex-1 overflow-y-auto min-h-0"
            style={{ maxHeight: "300px" }}
          >
            {filteredChains.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500 text-4xl mb-3">
                  🔍
                </div>
                <div className="text-gray-500 dark:text-gray-400 font-medium">
                  No chains found
                </div>
                <div className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                  Try adjusting your search or category filter
                </div>
              </div>
            ) : (
              <div className="py-2">
                {filteredChains.map((config, index) => (
                  <button
                    key={config.id}
                    onClick={() => handleChainSelect(config.id)}
                    className={`w-full flex items-center gap-3 px-4 py-1 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                      selectedChain === config.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500"
                        : "text-gray-700 dark:text-gray-300"
                    } ${index === 0 ? "rounded-t-lg" : ""} ${
                      index === filteredChains.length - 1 ? "rounded-b-lg" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <span className="text-xl">
                        {getTierIcon(config.tier)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-base">
                        {config.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5">
                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">
                          ID: {config.chainId}
                        </span>
                        <span className="capitalize bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">
                          {config.category}
                        </span>
                      </div>
                    </div>
                    {selectedChain === config.id && (
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-blue-600 dark:text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer with chain count */}
          <div className="px-3 py-1 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 text-center flex-shrink-0 bg-gray-50 dark:bg-gray-750 rounded-b-lg">
            <div className="flex items-center justify-center gap-2">
              <span>
                Showing {filteredChains.length} of{" "}
                {Object.keys(CHAIN_CONFIGS).length} chains
              </span>
              {searchQuery && (
                <>
                  <span>•</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    Clear search
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
