export type ScanStage =
  | "Spidering"
  | "Mapping"
  | "Testing"
  | "Validating"
  | "Reporting";

export type FindingSeverity = "Critical" | "High" | "Medium" | "Low";

export type ConsoleTab = "Activity Log" | "Verification Loops";

export interface LogEntry {
  id: number;
  time: string;
  message: string;
  type:
    | "normal"
    | "highlight-teal"
    | "highlight-orange"
    | "highlight-red"
    | "code"
    | "bold";
}

export interface Finding {
  id: string;
  severity: FindingSeverity;
  title: string;
  endpoint: string;
  description: string;
  time: string;
}