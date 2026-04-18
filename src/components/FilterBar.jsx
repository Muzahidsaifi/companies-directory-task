export default function FilterBar({
  searchQuery, onSearchChange,
  selectedIndustry, onIndustryChange,
  selectedLocation, onLocationChange,
  sortBy, onSortChange,
  industries, locations,
  onClearFilters,
}) {
  const hasActiveFilters =
    searchQuery || selectedIndustry !== "All" || selectedLocation !== "All" || sortBy !== "name-asc";

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

        {/* 1. Search Input */}
        <div className="relative lg:col-span-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search companies..."
            className="w-full bg-slate-900/60 border border-slate-600/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
          />
        </div>

        {/* 2. Industry Dropdown */}
        <select
          value={selectedIndustry}
          onChange={(e) => onIndustryChange(e.target.value)}
          className="bg-slate-900/60 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all cursor-pointer"
        >
          {industries.map((ind) => (
            <option key={ind} value={ind} className="bg-slate-900">
              {ind === "All" ? "All Industries" : ind}
            </option>
          ))}
        </select>

        {/* 3. Location Dropdown */}
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="bg-slate-900/60 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all cursor-pointer"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc} className="bg-slate-900">
              {loc === "All" ? "All Locations" : loc}
            </option>
          ))}
        </select>

        {/* 4. Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-slate-900/60 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all cursor-pointer"
        >
          <option value="name-asc" className="bg-slate-900">Name: A → Z</option>
          <option value="name-desc" className="bg-slate-900">Name: Z → A</option>
          <option value="employees-desc" className="bg-slate-900">Employees: High → Low</option>
          <option value="employees-asc" className="bg-slate-900">Employees: Low → High</option>
          <option value="founded-asc" className="bg-slate-900">Founded: Oldest First</option>
          <option value="founded-desc" className="bg-slate-900">Founded: Newest First</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
