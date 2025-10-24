"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { useMcp } from "use-mcp/react";
import { MCPChatMessage, MCPToolCall } from "@/app/types/mcp-chat";
import { ConnectionStatus } from "./ConnectionStatus";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function MCPChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MCPChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevLastMessage = useRef<unknown>(null);

  // Connect to MCP server at http://localhost:8000/mcp
  const mcp = useMcp({
    url: "http://localhost:8000/mcp",
  });

  // Keep a ref to the latest callTool to avoid dependency churn
  const callToolRef = useRef(mcp.callTool);

  useLayoutEffect(() => {
    callToolRef.current = mcp.callTool;
  }, [mcp.callTool]);

  // Auto scroll to bottom when messages change
  useLayoutEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage !== prevLastMessage.current) {
      const doScroll = () => {
        try {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        } catch {
          container.scrollTop = container.scrollHeight;
        }
      };

      if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
        requestAnimationFrame(doScroll);
      } else {
        setTimeout(doScroll, 0);
      }

      prevLastMessage.current = lastMessage;
    }
  }, [messages]);

  const addMessage = useCallback(
    (message: Omit<MCPChatMessage, "id" | "timestamp">) => {
      const newMessage: MCPChatMessage = {
        ...message,
        id: Date.now().toString() + Math.random(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    },
    []
  );

  const updateMessage = useCallback(
    (messageId: string, updates: Partial<MCPChatMessage>) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg))
      );
    },
    []
  );

  const executeToolCalls = useCallback(async (toolCalls: MCPToolCall[]) => {
    const resultsArray: MCPToolCall[] = [];

    for (const toolCall of toolCalls) {
      try {
        // Execute the tool call via MCP
        const result = await callToolRef.current(toolCall.tool, toolCall.args);

        if (result.isError) {
          const errorMessage =
            result.content[0]?.text || "Tool execution failed";

          resultsArray.push({
            ...toolCall,
            result,
            status: "error",
            error: errorMessage,
          });
        } else {
          resultsArray.push({
            ...toolCall,
            result,
            status: "success",
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Tool execution failed";
        resultsArray.push({
          ...toolCall,
          status: "error",
          error: errorMessage,
        });
      }
    }

    return resultsArray;
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading || mcp.state !== "ready") return;

    const message = input.trim();
    setInput("");
    setError(undefined);
    setIsLoading(true);

    // Add user message
    addMessage({
      role: "user",
      content: message,
    });

    try {
      // Get current messages for context
      const currentMessages = [
        ...messages,
        {
          role: "user" as const,
          content: message,
        },
      ];

      // Prepare tools for the API
      const availableTools =
        mcp.tools?.map((tool) => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        })) || [];

      // Call Gemini API
      const response = await fetch("/api/mcp-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: currentMessages,
          tools: availableTools,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Check if there are tool calls to execute
      if (data.toolCalls && data.toolCalls.length > 0) {
        // Add assistant message with pending tool calls
        const assistantMessage = addMessage({
          role: "assistant",
          content: data.response || "Executing tools...",
          toolCalls: data.toolCalls,
        });

        // Execute the tool calls
        const toolCallsWithResults = await executeToolCalls(data.toolCalls);

        // Update the message with tool results
        updateMessage(assistantMessage.id, {
          toolCalls: toolCallsWithResults,
        });
      } else {
        // No tool calls, just add the response
        addMessage({
          role: "assistant",
          content: data.response || "No response",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(undefined);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
      {/* Connection Status */}
      <ConnectionStatus
        state={mcp.state || "connecting"}
        error={mcp.error ? String(mcp.error) : undefined}
        retry={mcp.retry || (() => {})}
      />

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto min-h-0">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          error={error}
          mcpState={mcp.state || "connecting"}
        />
      </div>

      {/* Input Area */}
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        disabled={mcp.state !== "ready"}
        isLoading={isLoading}
      />
    </div>
  );
}
