"use client";

import { usePathname } from "next/navigation";
import { useTopbar } from "../layout/topbar-context";

const routeLabelMap: Record<string, string> = {
  dashboard: "Dashboard",
  scans: "Scan",
  "private-assets": "Private Assets",
  "new-scan": "New Scan",
};

function generateBreadcrumb(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "Dashboard";

  return segments
    .map(
      (segment) =>
        routeLabelMap[segment] ||
        segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    )
    .join(" / ");
}

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const { config } = useTopbar();

  const defaultTitle = generateBreadcrumb(pathname);

  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden">
          ☰
        </button>

        <h1 className="text-sm font-medium text-gray-800">
          {config.title ?? defaultTitle}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {config.actions}
      </div>
    </div>
  );
}