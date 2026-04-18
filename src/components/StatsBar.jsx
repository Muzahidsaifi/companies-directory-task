export default function StatsBar({ total, filtered }) {
  const isFiltered = filtered !== total;

  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center gap-3">
        <span className="text-slate-300 text-sm font-medium">
          Showing{" "}
          <span className="text-indigo-400 font-bold text-base">{filtered}</span>
          {isFiltered && (
            <span className="text-slate-500"> of {total}</span>
          )}{" "}
          companies
        </span>

        {isFiltered && (
          <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30">
            Filtered
          </span>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-2 text-slate-500 text-xs">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Live Data
      </div>
    </div>
  );
}
