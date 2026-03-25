import { X, Accessibility } from "lucide-react";
import type { Screen } from "@/pages/Index";

interface ScheduleScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ScheduleScreen = ({ onNavigate }: ScheduleScreenProps) => {
  const currentTimes = ["9:11 AM", "9:19 AM", "9:25 AM", "9:34 AM", "9:43 AM", "9:52 AM"];
  const nextTimes = ["10:08 AM", "10:24 AM", "10:40 AM", "10:56 AM"];

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: "hsl(270,45%,38%)" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-start justify-between">
        <div>
          <span className="text-[56px] font-extrabold text-card-foreground font-display leading-none">
            51
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[11px] font-bold text-card-foreground/90 bg-card/15 rounded-full px-2 py-0.5">
              ⊕ West
            </span>
          </div>
          <span className="text-sm font-semibold text-card-foreground/80 mt-1 block">
            Édouard-Montpetit / Woodbury
          </span>
        </div>
        <button
          onClick={() => onNavigate("nearby")}
          className="w-8 h-8 rounded-full bg-card/20 flex items-center justify-center mt-2"
        >
          <X className="w-4 h-4 text-card-foreground" />
        </button>
      </div>

      {/* Schedule blocks */}
      <div className="px-4 pb-6 flex flex-col gap-3">
        {/* Current block */}
        <div className="bg-card rounded-2xl overflow-hidden">
          <div className="h-1 bg-[hsl(270,45%,38%)]" />
          <div className="p-3 flex flex-col gap-0">
            {currentTimes.map((time, i) => (
              <div
                key={time}
                className={`py-2.5 px-2 rounded-lg ${
                  i === 1 || i === 2 ? "font-extrabold" : ""
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {i === 1 && <span className="text-[hsl(270,45%,38%)] text-xs">▸</span>}
                  <span
                    className={`text-sm font-display ${
                      i === 1
                        ? "font-extrabold text-foreground"
                        : i === 2
                        ? "font-bold text-[hsl(270,45%,38%)]"
                        : "font-semibold text-muted-foreground"
                    }`}
                  >
                    {time}
                  </span>
                  {(i === 1 || i === 2) && (
                    <span className="text-[7px] font-bold text-[hsl(270,45%,38%)]/60 mb-1">ᐩ</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next block */}
        <div className="bg-card rounded-2xl overflow-hidden">
          <div className="h-1 bg-[hsl(270,45%,38%)]" />
          <div className="p-3 flex flex-col gap-0">
            {nextTimes.map((time) => (
              <div key={time} className="py-2.5 px-2">
                <span className="text-sm font-semibold text-muted-foreground font-display">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility button */}
      <div className="px-5 pb-6 mt-auto flex justify-end">
        <button className="w-10 h-10 rounded-full bg-card/20 flex items-center justify-center">
          <Accessibility className="w-5 h-5 text-card-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleScreen;
