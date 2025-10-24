"use client";

interface ConnectionStatusProps {
  state: string;
  error?: string;
  retry: () => void;
}

export function ConnectionStatus({
  state,
  error,
  retry,
}: ConnectionStatusProps) {
  const getStatusColor = () => {
    switch (state) {
      case "ready":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      case "connecting":
      case "loading":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = () => {
    switch (state) {
      case "ready":
        return "Connected to MCP Server";
      case "failed":
        return error || "Connection failed";
      case "connecting":
        return "Connecting...";
      case "loading":
        return "Loading...";
      default:
        return `Status: ${state}`;
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border-b bg-gray-50">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            state === "ready"
              ? "bg-green-500 animate-pulse"
              : state === "failed"
              ? "bg-red-500"
              : "bg-yellow-500 animate-pulse"
          }`}
        />
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
      {state === "failed" && (
        <button
          onClick={retry}
          className="px-3 py-1 text-xs border rounded hover:bg-gray-100"
        >
          Retry
        </button>
      )}
    </div>
  );
}
