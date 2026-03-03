import { ScanStage } from "@/types/scan";
import CircleProgress from "./circle-progress";
import ScanStepper from "./scan-stepper";
import ScanMetaBar from "./scan-meta-bar";

export default function ScanHeader({
  progress,
  activeStage,
}: {
  progress: number;
  activeStage: ScanStage;
}) {
  return (
    <div className="mx-5 mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex gap-4 p-6">
        <CircleProgress value={progress} />
        <ScanStepper activeStage={activeStage} />
      </div>
      <ScanMetaBar />
    </div>
  );
}