"use client";

import { Finding } from "@/types/scan";
import { useState } from "react";
import FindingCard from "./finding-card";

export default function FindingsPanel({ findings }: { findings: Finding[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mx-5 mt-4 mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
      {findings.map((f) => (
        <FindingCard
          key={f.id}
          finding={f}
          selected={selected === f.id}
          onClick={() => setSelected(f.id)}
        />
      ))}
    </div>
  );
}