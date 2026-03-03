"use client";

import { useEffect, useState } from "react";
import { StatsBar } from "@/components/dashboard/stats-bar";
import { SeverityCard } from "@/components/dashboard/severity-card";
import { ScansToolbar } from "@/components/dashboard/scans-toolbar";
import { ScansTable } from "@/components/dashboard/scans-table";
import { useTopbar } from "@/components/layout/topbar-context";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scanStarted, setScanStarted] = useState(false);

  const { setConfig } = useTopbar();

  useEffect(() => {
    if (scanStarted) {
      setConfig({
        title: "Scan / Private Assets / New Scan",
        actions: (
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
              Export Report
            </button>
            <button
              onClick={() => setScanStarted(false)}
              className="px-4 py-2 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50"
            >
              Stop Scan
            </button>
          </div>
        ),
      });
    } else {
      // IMPORTANT: reset to fallback breadcrumb
      setConfig({});
    }
  }, [scanStarted, setConfig]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <StatsBar
        org="Project X"
        owner="Nammagiri"
        stats={[
          { label: "Total Scans", value: 100 },
          { label: "Scheduled", value: 1000 },
          { label: "Rescans", value: 100 },
          { label: "Failed Scans", value: 100 },
        ]}
        lastUpdated="10 mins ago"
      />

      <div className="flex flex-wrap border-b border-gray-100 bg-white rounded-2xl overflow-hidden">
        <SeverityCard severity="critical" count={86} change={2.0} isIncrease />
        <SeverityCard severity="high" count={16} change={0.9} isIncrease />
        <SeverityCard severity="medium" count={26} change={0.9} isIncrease={false} />
        <SeverityCard severity="low" count={16} change={0.9} isIncrease />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <ScansToolbar
          onNewScan={() => setScanStarted(true)}
          onSearch={setSearchQuery}
        />
        <ScansTable query={searchQuery} />
      </div>
    </div>
  );
}