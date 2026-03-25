const BikeCard = () => {
  return (
    <div
      className="w-full px-5 py-4 flex items-center justify-between"
      style={{ backgroundColor: "hsl(5,75%,58%)" }}
    >
      <div className="flex flex-col gap-1">
        {/* BIXI logo text */}
        <span className="text-[28px] font-black italic text-card-foreground font-display tracking-tight leading-none">
          BIXI
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-card-foreground">🚲</span>
          <span className="text-xs font-semibold text-card-foreground/90">
            Sanguinet / de Maisonneuve
          </span>
        </div>
      </div>

      {/* Unlock button */}
      <button className="bg-card/20 backdrop-blur-sm rounded-lg px-4 py-2">
        <span className="text-xs font-bold text-card-foreground">
          Unlock a bike
        </span>
      </button>
    </div>
  );
};

export default BikeCard;
