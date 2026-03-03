"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Columns3, Plus } from "lucide-react";

interface ToolbarProps {
  onSearch: (q: string) => void;
  onNewScan: () => void;
}

export function ScansToolbar({ onSearch, onNewScan }: ToolbarProps) {
  const [query, setQuery] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-4 sm:px-6 py-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search scans by name or type..."
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition placeholder:text-gray-400"
        />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition text-gray-600">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition text-gray-600">
          <Columns3 className="w-4 h-4" />
          <span className="hidden sm:inline">Column</span>
        </button>
        <button
          onClick={onNewScan}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#0D9488] hover:bg-[#0b7a6f] text-white rounded-xl transition"
        >
          <Plus className="w-4 h-4" />
          <span>New scan</span>
        </button>
      </div>
    </div>
  );
}
