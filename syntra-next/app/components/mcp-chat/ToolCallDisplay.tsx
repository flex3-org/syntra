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
        return "border-yellow-200 bg-yellow-50";
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
    }
  };

  return (
    <div className={`border rounded-lg p-3 mt-2 ${getStatusColor()}`}>
      <div className="flex items-center gap-2 mb-2">
        <span>{getStatusIcon()}</span>
        <span className="font-medium text-sm">Tool: {toolCall.tool}</span>
      </div>

      {Object.keys(toolCall.args).length > 0 && (
        <div className="text-xs text-gray-600 mb-2">
          <div className="font-medium">Arguments:</div>
          <pre className="whitespace-pre-wrap bg-white p-2 rounded mt-1">
            {JSON.stringify(toolCall.args, null, 2)}
          </pre>
        </div>
      )}

      {toolCall.result !== undefined && (
        <div className="text-xs text-gray-600">
          <div className="font-medium">Result:</div>
          <pre className="whitespace-pre-wrap bg-white p-2 rounded mt-1">
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
        <div className="text-xs text-red-600">
          <div className="font-medium">Error:</div>
          <div className="mt-1">{toolCall.error}</div>
        </div>
      )}
    </div>
  );
}
