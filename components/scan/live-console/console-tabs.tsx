"use client";

import { Clock, CheckCircle2, ChevronDown, ChevronUp, Minus } from "lucide-react";
import { ConsoleTab } from "@/types/scan";

interface ConsoleTabsProps {
  activeTab: ConsoleTab;
  setActiveTab: (tab: ConsoleTab) => void;
  isRunning: boolean;
  onToggleRun: () => void;
}

export default function ConsoleTabs({
  activeTab,
  setActiveTab,
  isRunning,
  onToggleRun,
}: ConsoleTabsProps) {
  const tabs: ConsoleTab[] = ["Activity Log", "Verification Loops"];

  return (
    <div className="border-b border-gray-100">
      {/* Top Header Row */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isRunning ? "bg-[#0D9488] animate-pulse" : "bg-gray-400"
              }`}
            />
            <span className="text-sm font-semibold text-gray-800">
              Live Scan Console
            </span>
          </div>

          {isRunning ? (
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              Running...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-green-500">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          )}
        </div>

        <button
          onClick={onToggleRun}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400"
          title={isRunning ? "Pause" : "Resume"}
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex px-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition -mb-px
              ${
                activeTab === tab
                  ? "border-[#0D9488] text-[#0D9488]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}