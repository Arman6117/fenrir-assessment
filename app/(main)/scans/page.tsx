"use client";

import { useEffect, useState, useRef } from "react";
import {
  INITIAL_LOGS,
  INITIAL_FINDINGS,
  NEW_LOGS,
  NEW_FINDING,
} from "@/data/scan-mock";
import { ScanStage, LogEntry, Finding } from "@/types/scan";
import ScanHeader from "@/components/scan/scan-header";
import ConsoleContainer from "@/components/scan/live-console/console-container";

export default function ScanPage() {
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] =
    useState<ScanStage>("Spidering");
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] =
    useState<LogEntry[]>(INITIAL_LOGS);
  const [findings, setFindings] =
    useState<Finding[]>(INITIAL_FINDINGS);

  const addedNew = useRef(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setActiveStage("Reporting");
          return 100;
        }

        const next = p + 1;

        if (next >= 20 && next < 40) setActiveStage("Mapping");
        else if (next >= 40 && next < 60) setActiveStage("Testing");
        else if (next >= 60 && next < 80) setActiveStage("Validating");
        else if (next >= 80) setActiveStage("Reporting");

        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (progress >= 40 && !addedNew.current) {
      addedNew.current = true;
      setLogs((l) => [...l, ...NEW_LOGS]);
      setFindings((f) => [...f, NEW_FINDING]);
    }
  }, [progress]);

  const stats = {
    subAgents: 1,
    parallelExecutions: 2,
    operations: logs.length,
    critical: findings.filter(f => f.severity === "Critical").length,
    high: findings.filter(f => f.severity === "High").length,
    medium: findings.filter(f => f.severity === "Medium").length,
    low: findings.filter(f => f.severity === "Low").length,
  };

  return (
    <div className="flex flex-col min-h-0">
      <ScanHeader
        progress={progress}
        activeStage={activeStage}
      />

      <ConsoleContainer
        logs={logs}
        findings={findings}
        isRunning={isRunning}
        stats={stats}
        onToggleRun={() =>
          setIsRunning((r) => !r)
        }
      />
    </div>
  );
}