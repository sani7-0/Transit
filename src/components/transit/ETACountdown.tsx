import { useState, useEffect } from "react";

interface ETACountdownProps {
  initialMinutes: number;
  color: string;
  highlighted?: boolean;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const ETACountdown = ({ initialMinutes, color, highlighted = false, showLabel = true, size = "md" }: ETACountdownProps) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
  }, [initialMinutes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isUrgent = minutes < 2;

  const sizeClasses = {
    sm: { num: "text-[28px]", sec: "text-[14px]", label: "text-[9px]" },
    md: { num: "text-[36px]", sec: "text-[18px]", label: "text-[10px]" },
    lg: { num: "text-[60px]", sec: "text-[24px]", label: "text-[11px]" },
  };

  const s = sizeClasses[size];

  return (
    <div
      className="flex-1 rounded-2xl flex flex-col items-center justify-center py-3 transition-all duration-300"
      style={{
        backgroundColor: highlighted ? color : `${color}18`,
      }}
    >
      <div className="flex items-baseline gap-0.5">
        <span
          className={`${s.num} font-extrabold font-display leading-none tabular-nums transition-colors duration-300 ${
            isUrgent && !highlighted ? "animate-pulse" : ""
          }`}
          style={{ color: highlighted ? "white" : color }}
        >
          {minutes}
        </span>
        <span
          className={`${s.sec} font-bold font-display leading-none tabular-nums opacity-60`}
          style={{ color: highlighted ? "white" : color }}
        >
          :{seconds.toString().padStart(2, "0")}
        </span>
      </div>
      {showLabel && (
        <span
          className={`${s.label} font-semibold mt-0.5`}
          style={{
            color: highlighted ? "rgba(255,255,255,0.75)" : color,
            opacity: highlighted ? 1 : 0.75,
          }}
        >
          {isUrgent ? "hurry!" : "minutes"}
        </span>
      )}
    </div>
  );
};

export default ETACountdown;
