"use client";

import { MCPChatMessage } from "@/app/types/mcp-chat";
import { MessageDisplay } from "./MessageDisplay";

interface ChatMessagesProps {
  messages: MCPChatMessage[];
  isLoading: boolean;
  error?: string;
  mcpState: string;
}

export function ChatMessages({
  messages,
  isLoading,
  error,
  mcpState,
}: ChatMessagesProps) {
  // Show connection message when not ready
  if (mcpState !== "ready") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 p-10">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 shadow-lg">
          <svg
            className="w-10 h-10 text-blue-600 dark:text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Syntra MCP Chat
        </p>
        <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">
          Waiting for connection...
        </p>
      </div>
    );
  }

  // Show welcome screen when no messages
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 p-10">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-linear-to-br from-blue-100 to-blue-200 dark:bg-gradient-to-r dark:from-[#FF8A3D] dark:to-[#FFC600] shadow-lg">
          <svg
            className="w-10 h-10 text-black dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Welcome to Syntra MCP Chat
        </h2>
        <p className="text-sm max-w-md text-gray-600 dark:text-gray-400 leading-relaxed">
          Start a conversation with the MCP server. Type your message below to
          begin.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {messages.map((message) => (
        <MessageDisplay key={message.id} message={message} />
      ))}

      {/* Loading indicator */}
      {isLoading && !messages.some((m) => m.isStreaming) && (
        <div className="flex justify-start">
          <div className="bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl px-5 py-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2.5 h-2.5 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2.5 h-2.5 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2.5 h-2.5 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce"></div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-200 font-medium ml-2">
                Thinking...
              </span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-700 dark:text-red-300 text-sm px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-sm">
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}
    </div>
  );
}
