"use client";

interface QuickTask {
  icon: string;
  label: string;
  prompt: string;
}

interface QuickTasksProps {
  onTaskClick: (prompt: string) => void;
  disabled?: boolean;
}

const quickTasks: QuickTask[] = [
  {
    icon: "📧",
    label: "Find LinkedIn Jobs",
    prompt:
      "Help me find relevant job opportunities on LinkedIn based on my skills and interests.",
  },
  {
    icon: "🗺️",
    label: "Google Maps Leads",
    prompt:
      "Help me find potential business leads using Google Maps for my target market.",
  },
  {
    icon: "💭",
    label: "Discuss Ideal Customer",
    prompt:
      "Let's discuss and define my ideal customer profile for my business.",
  },
  {
    icon: "🗃️",
    label: "Build Lead Database",
    prompt:
      "Help me build and organize a comprehensive lead database for my business.",
  },
];

export function QuickTasks({ onTaskClick, disabled = false }: QuickTasksProps) {
  return (
    <div className="px-6 py-2 bg-gray-100 dark:bg-gray-950 transition-colors">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Quick Tasks
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickTasks.map((task, index) => (
          <button
            key={index}
            onClick={() => onTaskClick(task.prompt)}
            disabled={disabled}
            className="flex items-center gap-3 px-4 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 disabled:hover:shadow-none text-left"
          >
            <span className="text-2xl">{task.icon}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {task.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
