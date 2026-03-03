"use client";

import { useState } from "react";
import { Sidebar } from "../ui/sidebar";
import { Topbar } from "../ui/topbar";
import { TopbarProvider } from "./topbar-context";

export default function MainShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <TopbarProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div className="flex flex-col flex-1 min-w-0 lg:pl-[220px]">
          <Topbar onMenuClick={() => setMobileOpen(true)} />

          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </TopbarProvider>
  );
}