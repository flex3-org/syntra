"use client";

import { useState } from "react";

export type Chain = "ethereum" | "base" | "sepolia";

export interface ChainConfig {
  id: Chain;
  name: string;
  icon: string;
  color: string;
}

export const CHAIN_CONFIGS: Record<Chain, ChainConfig> = {
  ethereum: {
    id: "ethereum",
    name: "Ethereum",
    icon: "⟠",
    color: "bg-blue-500",
  },
  base: {
    id: "base",
    name: "Base",
    icon: "🔵",
    color: "bg-blue-600",
  },
  sepolia: {
    id: "sepolia",
    name: "Sepolia",
    icon: "🧪",
    color: "bg-purple-500",
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

  const selectedConfig = CHAIN_CONFIGS[selectedChain];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <span className="text-lg">{selectedConfig.icon}</span>
        <span>{selectedConfig.name}</span>
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
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-full min-w-[160px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-20">
            {Object.values(CHAIN_CONFIGS).map((config) => (
              <button
                key={config.id}
                onClick={() => {
                  onChainChange(config.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  selectedChain === config.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="text-lg">{config.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{config.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {config.id === "ethereum" && "Mainnet"}
                    {config.id === "base" && "Layer 2"}
                    {config.id === "sepolia" && "Testnet"}
                  </div>
                </div>
                {selectedChain === config.id && (
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
