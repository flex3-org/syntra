"use client";

import { Info, Cpu, Zap, Shield, Globe } from "lucide-react";

export function InfoView() {
  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Research",
      description:
        "Advanced AI models to help you find and analyze B2B leads efficiently.",
    },
    {
      icon: Zap,
      title: "Multi-Chain Support",
      description:
        "Support for Ethereum, Polygon, Arbitrum, Optimism, Base, and more blockchain networks.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Built with security and reliability in mind, powered by MCP protocol.",
    },
    {
      icon: Globe,
      title: "Real-time Data",
      description:
        "Access real-time blockchain data and insights for your research needs.",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Info className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                About Syntra
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Your AI-powered B2B research companion
              </p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Syntra is an advanced AI research platform designed to streamline
            your B2B lead generation and blockchain data analysis. Powered by
            cutting-edge AI technology and the MCP (Model Context Protocol), we
            provide real-time insights across multiple blockchain networks.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Version</span>
              <span className="font-medium text-gray-900 dark:text-white">
                1.0.0
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                Supported Chains
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                6+ Networks
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">AI Model</span>
              <span className="font-medium text-gray-900 dark:text-white">
                Gemini Pro
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 dark:text-gray-400">Protocol</span>
              <span className="font-medium text-gray-900 dark:text-white">
                MCP (Model Context Protocol)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
