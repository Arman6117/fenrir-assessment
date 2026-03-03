"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export type ScanStatus = "Completed" | "Scheduled" | "Failed" | "In Progress";
export type ScanType = "Greybox" | "Blackbox" | "Whitebox";

export interface Scan {
  id: string;
  name: string;
  type: ScanType;
  status: ScanStatus;
  progress: number;
  vuln: { critical?: number; high?: number; medium?: number; low?: number };
  lastScan: string;
}

const MOCK: Scan[] = [
  { id:"1",  name:"Web App Servers", type:"Greybox",  status:"Completed",   progress:100, vuln:{critical:5,high:12,medium:23,low:18}, lastScan:"4d ago" },
  { id:"2",  name:"Web App Servers", type:"Greybox",  status:"Completed",   progress:100, vuln:{critical:5,high:12,medium:23,low:18}, lastScan:"4d ago" },
  { id:"3",  name:"Web App Servers", type:"Greybox",  status:"Completed",   progress:100, vuln:{critical:5,high:12,medium:23,low:18}, lastScan:"4d ago" },
  { id:"4",  name:"Web App Servers", type:"Greybox",  status:"Completed",   progress:100, vuln:{critical:5,high:12,medium:23,low:18}, lastScan:"4d ago" },
  { id:"5",  name:"Web App Servers", type:"Greybox",  status:"Completed",   progress:100, vuln:{critical:5,high:12,medium:23,low:18}, lastScan:"4d ago" },
  { id:"6",  name:"Web App Servers", type:"Greybox",  status:"Completed",   progress:100, vuln:{critical:5,high:12,medium:23,low:18}, lastScan:"4d ago" },
  { id:"7",  name:"Web App Servers", type:"Greybox",  status:"Completed",   progress:100, vuln:{critical:5,high:12,medium:23,low:18}, lastScan:"4d ago" },
  { id:"8",  name:"Web App Servers", type:"Greybox",  status:"Scheduled",   progress:100, vuln:{critical:5,high:12}, lastScan:"4d ago" },
  { id:"9",  name:"Web App Servers", type:"Greybox",  status:"Scheduled",   progress:100, vuln:{critical:5,high:12}, lastScan:"4d ago" },
  { id:"10", name:"IoT Devices",     type:"Blackbox", status:"Failed",      progress:10,  vuln:{critical:2,high:4,medium:8,low:1}, lastScan:"3d ago" },
  { id:"11", name:"Temp Data",       type:"Blackbox", status:"Failed",      progress:10,  vuln:{critical:2,high:4,medium:8,low:1}, lastScan:"3d ago" },
  { id:"12", name:"API Gateway",     type:"Whitebox", status:"In Progress", progress:55,  vuln:{critical:1,high:3}, lastScan:"1d ago" },
  { id:"13", name:"Auth Service",    type:"Greybox",  status:"Completed",   progress:100, vuln:{critical:3,high:7,medium:11,low:5}, lastScan:"2d ago" },
  { id:"14", name:"Payment Service", type:"Blackbox", status:"Completed",   progress:100, vuln:{critical:8,high:2,medium:4,low:9}, lastScan:"5d ago" },
  { id:"15", name:"Internal Portal", type:"Whitebox", status:"Scheduled",   progress:0,   vuln:{}, lastScan:"7d ago" },
];

function StatusBadge({ status }: { status: ScanStatus }) {
  const styles = {
    Completed:    "bg-green-50 text-green-600 border border-green-200",
    Scheduled:    "bg-gray-100 text-gray-500 border border-gray-200",
    Failed:       "bg-red-50 text-red-500 border border-red-200",
    "In Progress":"bg-blue-50 text-blue-500 border border-blue-200",
  } as Record<string, string>;
  return <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{status}</span>;
}

function ProgressBar({ value }: { value: number }) {
  const color = value <= 20 ? "bg-red-400" : "bg-[#0D9488]";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
        <div className={`${color} h-full rounded-full`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-gray-500 shrink-0">{value}%</span>
    </div>
  );
}

function Chip({ n, cls }: { n: number; cls: string }) {
  return <span className={`${cls} text-white text-xs font-bold min-w-[24px] text-center px-1.5 py-0.5 rounded`}>{n}</span>;
}

function VulnChips({ v }: { v: Scan["vuln"] }) {
  return (
    <div className="flex items-center gap-1">
      {v.critical !== undefined && <Chip n={v.critical} cls="bg-red-500" />}
      {v.high     !== undefined && <Chip n={v.high}     cls="bg-orange-400" />}
      {v.medium   !== undefined && <Chip n={v.medium}   cls="bg-yellow-400" />}
      {v.low      !== undefined && <Chip n={v.low}      cls="bg-green-500" />}
    </div>
  );
}

type SortKey = "name" | "type" | "status" | "progress" | "lastScan";

export function ScansTable({ query }: { query: string }) {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const PAGE_SIZE = 10;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MOCK.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q)
    );
  }, [query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey]).toLowerCase();
      const bv = String(b[sortKey]).toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ?  1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("asc"); }
    setPage(1);
  }

  function toggleSelect(id: string) {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  function toggleAll() {
    if (selected.size === pageData.length) setSelected(new Set());
    else setSelected(new Set(pageData.map(s => s.id)));
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronUp className="w-3 h-3 text-gray-300" />;
    return sortDir === "asc"
      ? <ChevronUp className="w-3 h-3 text-[#0D9488]" />
      : <ChevronDown className="w-3 h-3 text-[#0D9488]" />;
  }

  function Th({ label, k, right }: { label: string; k: SortKey; right?: boolean }) {
    return (
      <th
        onClick={() => toggleSort(k)}
        className={`px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide cursor-pointer select-none hover:text-gray-600 transition whitespace-nowrap ${right ? "text-right" : "text-left"}`}
      >
        <span className={`flex items-center gap-1 ${right ? "justify-end" : ""}`}>
          {label}<SortIcon k={k} />
        </span>
      </th>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px]">
          <thead className="border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selected.size === pageData.length && pageData.length > 0}
                  onChange={toggleAll}
                  className="accent-[#0D9488] w-4 h-4 cursor-pointer"
                />
              </th>
              <Th label="Scan Name" k="name" />
              <Th label="Type"      k="type" />
              <Th label="Status"    k="status" />
              <Th label="Progress"  k="progress" />
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                Vulnerability
              </th>
              <Th label="Last Scan" k="lastScan" right />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-sm text-gray-400">
                  No scans match your search.
                </td>
              </tr>
            ) : pageData.map(scan => (
              <tr
                key={scan.id}
                onClick={() => toggleSelect(scan.id)}
                className={`cursor-pointer transition-colors ${selected.has(scan.id) ? "bg-teal-50/60" : "hover:bg-gray-50/80"}`}
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selected.has(scan.id)}
                    onChange={() => toggleSelect(scan.id)}
                    onClick={e => e.stopPropagation()}
                    className="accent-[#0D9488] w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">{scan.name}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{scan.type}</td>
                <td className="px-4 py-4"><StatusBadge status={scan.status} /></td>
                <td className="px-4 py-4"><ProgressBar value={scan.progress} /></td>
                <td className="px-4 py-4"><VulnChips v={scan.vuln} /></td>
                <td className="px-4 py-4 text-xs text-gray-400 text-right whitespace-nowrap">{scan.lastScan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Showing {sorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length} scans
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition ${p === page ? "bg-[#0D9488] text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
