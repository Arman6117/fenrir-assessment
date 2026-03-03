"use client";

import { useState, useRef, useEffect } from "react";
import { ConsoleTab, LogEntry, Finding } from "@/types/scan";
import ConsoleTabs from "./console-tabs";
import LogLine from "./log-line";
import ConsoleFooter from "./console-footer";
import FindingsPanel from "../findings/findings-panel";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ConsoleContainerProps {
  logs: LogEntry[];
  findings: Finding[];
  isRunning: boolean;
  stats: {
    subAgents: number;
    parallelExecutions: number;
    operations: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  onToggleRun: () => void;
}

export default function ConsoleContainer({
  logs,
  findings,
  isRunning,
  stats,
  onToggleRun,
}: ConsoleContainerProps) {
  const [activeTab, setActiveTab] =
    useState<ConsoleTab>("Activity Log");

  const [collapsed, setCollapsed] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="mx-5 mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      
      {/* Header + Tabs */}
      <ConsoleTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isRunning={isRunning}
        onToggleRun={onToggleRun}
      />

      {/* Collapse Toggle */}
      <div className="flex justify-end px-5 py-2 border-b border-gray-100">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          {collapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>
      </div>

      {!collapsed && (
        <div className="flex flex-col lg:flex-row min-h-0">
          
          {/* Left: Logs */}
          <div className="flex-1 border-r border-gray-100 flex flex-col">
            <div className="flex-1 p-4 max-h-[400px] overflow-y-auto space-y-4">
              {activeTab === "Activity Log" ? (
                <>
                  {logs.map((entry) => (
                    <LogLine key={entry.id} entry={entry} />
                  ))}
                  <div ref={logEndRef} />
                </>
              ) : (
                <div className="text-sm text-gray-400 text-center py-10">
                  No verification loops detected yet.
                </div>
              )}
            </div>
          </div>

          {/* Right: Findings */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
            <FindingsPanel findings={findings} />
          </div>
        </div>
      )}

      <ConsoleFooter stats={stats} />
    </div>
  );
}