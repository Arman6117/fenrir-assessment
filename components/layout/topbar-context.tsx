"use client";

import { createContext, useContext, useState } from "react";

interface TopbarConfig {
  title?: string;
  actions?: React.ReactNode;
}

const TopbarContext = createContext<{
  config: TopbarConfig;
  setConfig: React.Dispatch<React.SetStateAction<TopbarConfig>>;
}>({
  config: {},
  setConfig: () => {},
});

export function TopbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<TopbarConfig>({});

  return (
    <TopbarContext.Provider value={{ config, setConfig }}>
      {children}
    </TopbarContext.Provider>
  );
}

export function useTopbar() {
  return useContext(TopbarContext);
}