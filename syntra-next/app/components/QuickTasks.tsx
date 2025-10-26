"use client";

import { Link, FileText, Box, Wallet, LucideIcon } from "lucide-react";

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
    icon: Link,
    label: "Get Chain Info",
    prompt:
      "Get the current Ethereum blockchain information including chain ID and latest block height.",
  },
  {
    icon: FileText,
    label: "Lookup Transaction",
    prompt:
      "Look up a specific Ethereum transaction by its hash to get detailed transaction information including sender, receiver, value, and gas details.",
  },
  {
    icon: Box,
    label: "Analyze Block Data",
    prompt:
      "Get detailed information about a specific Ethereum block including all transactions, logs, miner details, and gas usage statistics.",
  },
  {
    icon: Wallet,
    label: "Wallet Activity",
    prompt:
      "Analyze wallet activity for a specific Ethereum address including all ETH transactions and ERC20 token transfers within a block range.",
  },
];

export function QuickTasks({ onTaskClick, disabled = false }: QuickTasksProps) {
  return (
    <div className="px-6 pt-4 bg-gray-100 dark:bg-[#0B0F1A] transition-colors">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Quick Tasks
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickTasks.map((task, index) => {
          const Icon = task.icon;
          return (
            <button
              key={index}
              onClick={() => onTaskClick(task.prompt)}
              disabled={disabled}
              className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-[#1F2937] rounded-lg hover:border-blue-400 dark:hover:border-[#FF8A3D] hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 dark:disabled:hover:border-[#1F2937] disabled:hover:shadow-none text-left"
            >
              <Icon className="w-5 h-5 text-white shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {task.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
