import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { messages, tools } = await request.json();

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "GOOGLE_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Convert MCP tools to Gemini function declarations
    const geminiTools =
      tools?.map(
        (tool: {
          name: string;
          description: string;
          inputSchema: Record<string, unknown>;
        }) => ({
          name: tool.name,
          description: tool.description,
          parameters: tool.inputSchema,
        })
      ) || [];

    // Convert messages to Gemini format
    const geminiMessages = messages
      .slice(0, -1)
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

    // Get the last user message
    const lastMessage = messages[messages.length - 1];

    // Start chat with history
    const chat = model.startChat({
      history: geminiMessages,
      tools:
        geminiTools.length > 0
          ? [{ functionDeclarations: geminiTools }]
          : undefined,
    });

    // Send the message
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;

    // Check if there are function calls
    const functionCalls = response.functionCalls();

    if (functionCalls && functionCalls.length > 0) {
      // Return tool calls for execution
      const toolCalls = functionCalls.map((fc, index) => ({
        id: `call_${Date.now()}_${index}`,
        tool: fc.name,
        args: fc.args,
        status: "pending" as const,
      }));

      return NextResponse.json({
        response: response.text() || "Executing tools...",
        toolCalls,
      });
    }

    // No tool calls, return text response
    return NextResponse.json({
      response: response.text(),
    });
  } catch (error) {
    console.error("MCP Chat API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process message",
      },
      { status: 500 }
    );
  }
}
