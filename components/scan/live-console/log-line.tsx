import { LogEntry } from "@/types/scan";

export default function LogLine({ entry }: { entry: LogEntry }) {
  return (
    <div className="flex gap-2 text-sm font-mono">
      <span className="text-gray-400 text-xs">[{entry.time}]</span>
      <p className="text-gray-700 whitespace-pre-wrap">{entry.message}</p>
    </div>
  );
}