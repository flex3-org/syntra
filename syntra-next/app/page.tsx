"use client";

import { useRef } from "react";
import { MCPChat, MCPChatHandle } from "./components/mcp-chat";
import { Navbar } from "./components/Navbar";
import { QuickTasks } from "./components/QuickTasks";

export default function Home() {
  const chatRef = useRef<MCPChatHandle>(null);

  const handleQuickTaskClick = (prompt: string) => {
    chatRef.current?.sendMessage(prompt);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950 transition-colors">
      {/* Navbar */}
      <Navbar />

      {/* Quick Tasks Section */}
      <QuickTasks onTaskClick={handleQuickTaskClick} />

      {/* Chat Section */}
      <div className="flex flex-1 items-start justify-center p-6">
        <div className="w-full max-w-6xl h-[calc(100vh-200px)]">
          <MCPChat ref={chatRef} />
        </div>
      </div>
    </div>
  );
}
