"use client";

interface ConsoleFooterProps {
  stats: {
    subAgents: number;
    parallelExecutions: number;
    operations: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export default function ConsoleFooter({ stats }: ConsoleFooterProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 border-t border-gray-100 bg-white text-xs">
      <span className="text-gray-500">
        Sub-Agents: <strong>{stats.subAgents}</strong>
      </span>

      <span className="text-gray-500">
        Parallel Executions: <strong>{stats.parallelExecutions}</strong>
      </span>

      <span className="text-gray-500">
        Operations: <strong>{stats.operations}</strong>
      </span>

      <div className="ml-auto flex items-center gap-4 font-semibold">
        <span className="text-red-500">
          Critical: {stats.critical}
        </span>
        <span className="text-orange-500">
          High: {stats.high}
        </span>
        <span className="text-yellow-500">
          Medium: {stats.medium}
        </span>
        <span className="text-green-500">
          Low: {stats.low}
        </span>
      </div>
    </div>
  );
}