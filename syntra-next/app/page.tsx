"use client";

import { useRef, useState } from "react";
import { MCPChat, MCPChatHandle } from "./components/mcp-chat";
import { QuickTasks } from "./components/QuickTasks";
import { Sidebar } from "./components/Sidebar";
import { InfoView } from "./components/InfoView";

export default function Home() {
  const chatRef = useRef<MCPChatHandle>(null);
  const [currentView, setCurrentView] = useState<"chat" | "info">("chat");

  const handleQuickTaskClick = (prompt: string) => {
    chatRef.current?.sendMessage(prompt);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors">
      {/* Sidebar */}
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {currentView === "chat" ? (
          <>
            {/* Quick Tasks Section */}
            <QuickTasks onTaskClick={handleQuickTaskClick} />

            {/* Chat Section */}
            <div className="flex flex-1 items-start justify-center p-6">
              <div className="w-full max-w-8xl h-[calc(100vh-125px)]">
                <MCPChat ref={chatRef} />
              </div>
            </div>
          </>
        ) : (
          <InfoView />
        )}
      </div>
    </div>
  );
}
