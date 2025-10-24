import { MCPChat } from "./components/mcp-chat";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl h-[600px]">
        <MCPChat />
      </div>
    </div>
  );
}
