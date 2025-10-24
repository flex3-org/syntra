"use client";

import { MCPChatMessage } from "@/app/types/mcp-chat";
import { ToolCallDisplay } from "./ToolCallDisplay";

interface MessageDisplayProps {
  message: MCPChatMessage;
}

export function MessageDisplay({ message }: MessageDisplayProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`rounded-lg p-3 max-w-[80%] ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="mt-2">
            {message.toolCalls.map((toolCall) => (
              <ToolCallDisplay key={toolCall.id} toolCall={toolCall} />
            ))}
          </div>
        )}

        <span
          className={`text-xs mt-1 block ${
            isUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
