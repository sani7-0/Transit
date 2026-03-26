import { useState, useEffect } from "react";

interface ETACountdownProps {
  initialMinutes: number;
  color: string;
  highlighted?: boolean;
}

const ETACountdown = ({ initialMinutes, color, highlighted = false }: ETACountdownProps) => {
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

  return (
    <div
      className="flex-1 rounded-2xl flex flex-col items-center justify-center py-3 transition-all duration-300"
      style={{
        backgroundColor: highlighted ? color : `${color}18`,
      }}
    >
      <div className="flex items-baseline gap-0.5">
        <span
          className={`text-[36px] font-extrabold font-display leading-none tabular-nums transition-colors duration-300 ${
            isUrgent && !highlighted ? "animate-pulse" : ""
          }`}
          style={{ color: highlighted ? "white" : color }}
        >
          {minutes}
        </span>
        <span
          className="text-[18px] font-bold font-display leading-none tabular-nums opacity-60"
          style={{ color: highlighted ? "white" : color }}
        >
          :{seconds.toString().padStart(2, "0")}
        </span>
      </div>
      <span
        className="text-[10px] font-semibold mt-0.5"
        style={{
          color: highlighted ? "rgba(255,255,255,0.75)" : color,
          opacity: highlighted ? 1 : 0.75,
        }}
      >
        {isUrgent ? "hurry!" : "minutes"}
      </span>
    </div>
  );
};

export default ETACountdown;
