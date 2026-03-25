interface RouteCardProps {
  routeNumber: string;
  direction: string;
  stopName: string;
  etaMinutes: number;
  color: string;
  icon?: React.ReactNode;
  isRealtime?: boolean;
}

const RouteCard = ({
  routeNumber,
  direction,
  stopName,
  etaMinutes,
  color,
  icon,
  isRealtime = true,
}: RouteCardProps) => {
  return (
    <div
      className="w-full px-5 py-3.5 flex items-center justify-between"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          {icon && <div className="flex items-center">{icon}</div>}
          <span className="text-[42px] font-extrabold leading-none text-card-foreground font-display tracking-tight">
            {routeNumber}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-card-foreground bg-card/20 rounded-full px-2 py-0.5">
            ➜ {direction}
          </span>
        </div>
        <span className="text-xs font-semibold text-card-foreground/85 mt-0.5">
          {stopName}
        </span>
      </div>

      {/* ETA */}
      <div className="flex flex-col items-end">
        <div className="flex items-baseline gap-0.5">
          <span className="text-[32px] font-extrabold leading-none text-card-foreground font-display">
            {etaMinutes}
          </span>
          {isRealtime && (
            <span className="text-[8px] font-bold text-card-foreground/80 mb-3">᎒</span>
          )}
        </div>
        <span className="text-[11px] font-semibold text-card-foreground/80">
          minutes
        </span>
      </div>
    </div>
  );
};

export default RouteCard;
