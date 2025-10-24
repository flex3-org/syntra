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
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100">
          <svg
            className="w-8 h-8 text-blue-600"
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
        <p className="text-lg font-medium">Syntra MCP Chat</p>
        <p className="text-sm mt-2">Waiting for connection...</p>
      </div>
    );
  }

  // Show welcome screen when no messages
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100">
          <svg
            className="w-8 h-8 text-blue-600"
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
        <h2 className="text-lg font-medium mb-2">Welcome to Syntra MCP Chat</h2>
        <p className="text-sm max-w-md">
          Start a conversation with the MCP server. Type your message below to
          begin.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <MessageDisplay key={message.id} message={message} />
      ))}

      {/* Loading indicator */}
      {isLoading && !messages.some((m) => m.isStreaming) && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">
          Error: {error}
        </div>
      )}
    </div>
  );
}
