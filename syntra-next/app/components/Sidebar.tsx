"use client";

import { MessageSquare, Info } from "lucide-react";

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
    <aside className="w-64 bg-white dark:bg-[#0B0F1A] border-r border-gray-200 dark:border-[#1F2937] flex flex-col transition-colors">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200 dark:border-[#1F2937]">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FF8A3D] dark:to-[#FFC600]">
          Syntra
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Envio's MCP
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
                      ? "bg-blue-50 dark:from-[#FF8A3D]/20 dark:to-[#FFC600]/20 text-blue-600 dark:text-black font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1F2937]"
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
      <div className="p-4 border-t border-gray-200 dark:border-[#1F2937]">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>Powered by MCP</p>
          <p className="mt-1">© 2025 Syntra</p>
        </div>
      </div>
    </aside>
  );
}
