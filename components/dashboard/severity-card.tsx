import { TrendingUp, TrendingDown, Ban, AlertTriangle, Search } from "lucide-react";

type Severity = "critical" | "high" | "medium" | "low";

interface SeverityCardProps {
  severity: Severity;
  count: number;
  change: number;
  isIncrease: boolean;
}

const config = {
  critical: { label: "Critical Severity", bg: "bg-red-50",    trend: "text-red-500",    Icon: Ban },
  high:     { label: "High Severity",     bg: "bg-orange-50", trend: "text-red-500",    Icon: AlertTriangle },
  medium:   { label: "Medium Severity",   bg: "bg-yellow-50", trend: "text-green-500",  Icon: AlertTriangle },
  low:      { label: "Low Severity",      bg: "bg-blue-50",   trend: "text-red-500",    Icon: Search },
} as const;

const iconColor = {
  critical: "text-red-400",
  high: "text-orange-400",
  medium: "text-yellow-400",
  low: "text-blue-400",
} as const;

export function SeverityCard({ severity, count, change, isIncrease }: SeverityCardProps) {
  const c = config[severity];
  const IconComp = c.Icon;
  return (
    <div className="flex-1 min-w-[150px] px-4 sm:px-6 py-5 border-r last:border-r-0 border-gray-100 bg-white">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-gray-400 font-medium leading-snug pr-2">{c.label}</span>
        <span className={`rounded-lg p-1.5 ${c.bg}`}>
          <IconComp className={`w-4 h-4 ${iconColor[severity]}`} />
        </span>
      </div>
      <p className="text-4xl font-bold text-gray-900 mb-1">{count}</p>
      <p className={`flex items-center gap-1 text-xs font-medium ${c.trend}`}>
        {isIncrease ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        +{change}% {isIncrease ? "increase" : "decrease"} than yesterday
      </p>
    </div>
  );
}
