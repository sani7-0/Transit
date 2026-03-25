interface MetroRouteCardProps {
  lineNumber: string;
  direction: string;
  stationName: string;
  etaMinutes: number;
  lineColor: string;
  cardColor: string;
}

const MetroRouteCard = ({
  lineNumber,
  direction,
  stationName,
  etaMinutes,
  lineColor,
  cardColor,
}: MetroRouteCardProps) => {
  return (
    <div
      className="w-full px-5 py-3.5 flex items-center justify-between"
      style={{ backgroundColor: cardColor }}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2.5">
          {/* Metro icon */}
          <div className="flex items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
              <path d="M6 16L9 8H11L12 12L13 8H15L18 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Line number bubble */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: lineColor }}
          >
            <span className="text-sm font-extrabold text-card-foreground font-display">
              {lineNumber}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[10px] font-bold text-card-foreground bg-card/20 rounded-full px-2 py-0.5">
            ➜ {direction}
          </span>
        </div>
        <span className="text-xs font-semibold text-card-foreground/85 mt-0.5">
          {stationName}
        </span>
      </div>

      {/* ETA */}
      <div className="flex flex-col items-end">
        <span className="text-[32px] font-extrabold leading-none text-card-foreground font-display">
          {etaMinutes}
        </span>
        <span className="text-[11px] font-semibold text-card-foreground/80">
          minutes
        </span>
      </div>
    </div>
  );
};

export default MetroRouteCard;
