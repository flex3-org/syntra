export interface MCPToolCall {
  id: string;
  tool: string;
  args: Record<string, unknown>;
  result?: {
    content?: Array<{ text: string }>;
  };
  error?: string;
  status: "pending" | "success" | "error";
}

export interface MCPChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  toolCalls?: MCPToolCall[];
}

export interface MCPChatState {
  messages: MCPChatMessage[];
  isLoading: boolean;
  error?: string;
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}
