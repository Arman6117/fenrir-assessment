"use client";

import { Finding, FindingSeverity } from "@/types/scan";

interface FindingCardProps {
  finding: Finding;
  selected: boolean;
  onClick: () => void;
}

const severityBadge: Record<FindingSeverity, string> = {
  Critical: "bg-red-500 text-white",
  High: "bg-orange-400 text-white",
  Medium: "bg-yellow-400 text-white",
  Low: "bg-green-500 text-white",
};

const severityBorder: Record<FindingSeverity, string> = {
  Critical: "border-l-red-400",
  High: "border-l-orange-400",
  Medium: "border-l-yellow-400",
  Low: "border-l-green-400",
};

export default function FindingCard({
  finding,
  selected,
  onClick,
}: FindingCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border border-l-4 rounded-xl p-4 transition
        ${severityBorder[finding.severity]}
        ${
          selected
            ? "border-[#0D9488] bg-teal-50/40 shadow-md"
            : "border-gray-100 bg-white hover:shadow-md"
        }`}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            severityBadge[finding.severity]
          }`}
        >
          {finding.severity}
        </span>

        <span className="text-xs text-gray-400">
          {finding.time}
        </span>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-gray-800 mb-1">
        {finding.title}
      </p>

      {/* Endpoint */}
      <p className="text-xs text-[#0D9488] font-mono mb-2 break-all">
        {finding.endpoint}
      </p>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
        {finding.description}
      </p>
    </button>
  );
}