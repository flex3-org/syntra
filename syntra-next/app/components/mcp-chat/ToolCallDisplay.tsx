"use client";

import { MCPToolCall } from "@/app/types/mcp-chat";

interface ToolCallDisplayProps {
  toolCall: MCPToolCall;
}

export function ToolCallDisplay({ toolCall }: ToolCallDisplayProps) {
  const getStatusIcon = () => {
    switch (toolCall.status) {
      case "pending":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
    }
  };

  const getStatusColor = () => {
    switch (toolCall.status) {
      case "pending":
        return "border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20";
      case "success":
        return "border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20";
      case "error":
        return "border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20";
    }
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{getStatusIcon()}</span>
        <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
          Tool: <span className="font-mono">{toolCall.tool}</span>
        </span>
      </div>

      {Object.keys(toolCall.args).length > 0 && (
        <div className="text-xs text-gray-700 dark:text-gray-300 mb-3">
          <div className="font-semibold mb-1">Arguments:</div>
          <pre className="whitespace-pre-wrap bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-md overflow-x-auto">
            {JSON.stringify(toolCall.args, null, 2)}
          </pre>
        </div>
      )}

      {toolCall.result !== undefined && (
        <div className="text-xs text-gray-700 dark:text-gray-300">
          <div className="font-semibold mb-1">Result:</div>
          <pre className="whitespace-pre-wrap bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-md overflow-x-auto">
            {(() => {
              try {
                const parsedText = JSON.parse(
                  toolCall.result.content?.[0]?.text || ""
                );
                return (
                  parsedText.message || JSON.stringify(parsedText, null, 2)
                );
              } catch {
                return toolCall.result.content?.[0]?.text || "No result";
              }
            })()}
          </pre>
        </div>
      )}

      {toolCall.error && (
        <div className="text-xs text-red-700 dark:text-red-300">
          <div className="font-semibold mb-1">Error:</div>
          <div className="mt-1 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 p-2 rounded">
            {toolCall.error}
          </div>
        </div>
      )}
    </div>
  );
}
