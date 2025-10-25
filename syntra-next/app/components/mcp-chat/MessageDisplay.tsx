"use client";

import { MCPChatMessage } from "@/app/types/mcp-chat";
import { ToolCallDisplay } from "./ToolCallDisplay";

interface MessageDisplayProps {
  message: MCPChatMessage;
}

export function MessageDisplay({ message }: MessageDisplayProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-xl px-4 py-3 max-w-[80%] shadow-sm ${
          isUser
            ? "bg-blue-600 dark:bg-blue-500 text-white"
            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>

        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.toolCalls.map((toolCall) => (
              <ToolCallDisplay key={toolCall.id} toolCall={toolCall} />
            ))}
          </div>
        )}

        <span
          className={`text-xs mt-2 block ${
            isUser
              ? "text-blue-100 dark:text-blue-200"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
