"use client";

import { useState } from "react";
import {
  Link,
  FileText,
  Box,
  Wallet,
  Hash,
  Coins,
  ScrollText,
  TrendingUp,
  Layers,
  Search,
  Zap,
  ArrowUpDown,
  Code,
  ChevronDown,
  ChevronUp,
  LucideIcon,
} from "lucide-react";

interface QuickTask {
  icon: LucideIcon;
  label: string;
  prompt: string;
}

interface QuickTasksProps {
  onTaskClick: (prompt: string) => void;
  disabled?: boolean;
}

const quickTasks: QuickTask[] = [
  {
    icon: FileText,
    label: "Lookup Transaction",
    prompt:
      "Look up a specific transaction by its hash to get detailed transaction information including sender, receiver, value, and gas details.",
  },
  {
    icon: Box,
    label: "Analyze Block Data",
    prompt:
      "Get detailed information about a specific block including all transactions, logs, miner details, and gas usage statistics.",
  },
  {
    icon: Wallet,
    label: "Wallet Activity",
    prompt:
      "Analyze wallet activity for a specific Ethereum address including all ETH transactions and ERC20 token transfers within a block range.",
  },
  {
    icon: Hash,
    label: "Block Hashes",
    prompt:
      "Get all blocks and transaction hashes within a specific block range for efficient data retrieval without full transaction details.",
  },
  {
    icon: Coins,
    label: "ERC20 Transfers",
    prompt:
      "Find all ERC20 token transfer events within a block range, optionally filtered by specific contract address.",
  },
  {
    icon: Link,
    label: "Get Chain Info",
    prompt:
      "Get the current blockchain information including chain ID and latest block height.",
  },
  {
    icon: ScrollText,
    label: "Contract Logs",
    prompt:
      "Get all event logs from a specific smart contract within a block range, with optional event topic filtering.",
  },
  {
    icon: ArrowUpDown,
    label: "Transfers & Approvals",
    prompt:
      "Get both ERC20 transfer and approval events in one query to analyze token movement and permissions.",
  },
  {
    icon: TrendingUp,
    label: "Block Rewards",
    prompt:
      "Calculate mining rewards for a specific miner address including transaction fees and burned fees analysis.",
  },
  {
    icon: Layers,
    label: "Full Block Data",
    prompt:
      "Get complete block and transaction objects within a block range with all detailed information.",
  },
  {
    icon: Search,
    label: "Event Logs",
    prompt:
      "Get all logs of a specific event from a contract using preset queries for efficient event tracking.",
  },
  {
    icon: Zap,
    label: "Uniswap Swaps",
    prompt:
      "Analyze Uniswap V2 swap events from specific pools including decoded swap parameters and volume tracking.",
  },
  {
    icon: Code,
    label: "Call Decoder",
    prompt:
      "Decode function calls to specific contracts within a block range with success rate tracking.",
  },
];

const INITIAL_DISPLAY_COUNT = 3;

export function QuickTasks({ onTaskClick, disabled = false }: QuickTasksProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedTasks = showAll
    ? quickTasks
    : quickTasks.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreTasks = quickTasks.length > INITIAL_DISPLAY_COUNT;

  return (
    <div className="px-6 pt-4 bg-gray-100 dark:bg-[#0B0F1A] transition-colors">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Quick Tasks
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {displayedTasks.map((task, index) => {
          const Icon = task.icon;
          return (
            <button
              key={index}
              onClick={() => onTaskClick(task.prompt)}
              disabled={disabled}
              className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-[#1F2937] rounded-lg hover:border-blue-400 dark:hover:border-[#FF8A3D] hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 dark:disabled:hover:border-[#1F2937] disabled:hover:shadow-none text-left"
            >
              <Icon className="w-5 h-5 text-blue-500 dark:text-[#FF8A3D] shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {task.label}
              </span>
            </button>
          );
        })}

        {/* Load More / Show Less Button */}
        {hasMoreTasks && (
          <button
            onClick={() => setShowAll(!showAll)}
            disabled={disabled}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-[#FF8A3D] hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Show Less
                </span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Load More ({quickTasks.length - INITIAL_DISPLAY_COUNT})
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
