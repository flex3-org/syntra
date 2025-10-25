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
    <div className="flex items-center justify-between px-6 py-1 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full ${
            state === "ready"
              ? "bg-green-500 animate-pulse shadow-lg shadow-green-500/50"
              : state === "failed"
              ? "bg-red-500 shadow-lg shadow-red-500/50"
              : "bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50"
          }`}
        />
        <span className={`text-sm font-semibold ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
      {state === "failed" && (
        <button
          onClick={retry}
          className="px-4 py-1 text-xs font-medium text-white bg-red-600 border border-red-700 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm"
        >
          Retry
        </button>
      )}
    </div>
  );
}
