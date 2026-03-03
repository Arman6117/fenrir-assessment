import { STAGES } from "@/data/scan-mock";
import { ScanStage } from "@/types/scan";

export default function ScanStepper({ activeStage }: { activeStage: ScanStage }) {
  const activeIdx = STAGES.findIndex(s => s.key === activeStage);

  return (
    <div className="flex items-center w-full">
      {STAGES.map((stage, i) => {
        const done = i < activeIdx;
        const current = i === activeIdx;
        const Icon = stage.Icon;

        return (
          <div key={stage.key} className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2
              ${done ? "bg-[#0D9488] border-[#0D9488]" : current ? "border-[#0D9488]" : "border-gray-200"}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs mt-2">{stage.key}</span>
          </div>
        );
      })}
    </div>
  );
}