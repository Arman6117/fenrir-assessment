import { RefreshCw } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
}

interface StatsBarProps {
  org: string;
  owner: string;
  stats: StatItem[];
  lastUpdated?: string;
}

export function StatsBar({ org, owner, stats, lastUpdated }: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-0 gap-y-2 px-4 sm:px-6 py-3 border-b border-gray-100 bg-white text-sm overflow-x-auto">
      <StatCell label="Org" value={org} />
      <Divider />
      <StatCell label="Owner" value={owner} />
      <Divider />
      {stats.map((s, i) => (
        <span key={i} className="flex items-center">
          <StatCell label={s.label} value={s.value} />
          {i < stats.length - 1 && <Divider />}
        </span>
      ))}
      {lastUpdated && (
        <span className="flex items-center gap-1.5 ml-auto text-gray-400 text-xs whitespace-nowrap">
          <RefreshCw className="w-3.5 h-3.5" />
          {lastUpdated}
        </span>
      )}
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="flex items-center gap-1.5 px-3 whitespace-nowrap">
      <span className="text-gray-400">{label}:</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </span>
  );
}

function Divider() {
  return <span className="h-4 w-px bg-gray-200 shrink-0" />;
}
