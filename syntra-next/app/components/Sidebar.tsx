"use client";

import { MessageSquare, Info } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  onViewChange: (view: "chat" | "info") => void;
  currentView: "chat" | "info";
}

export function Sidebar({ onViewChange, currentView }: SidebarProps) {
  const menuItems = [
    {
      id: "chat" as const,
      label: "AI Chat",
      icon: MessageSquare,
    },
    {
      id: "info" as const,
      label: "Info",
      icon: Info,
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Syntra
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          AI Research Platform
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>Powered by MCP</p>
          <p className="mt-1">© 2025 Syntra</p>
        </div>
      </div>
    </aside>
  );
}
