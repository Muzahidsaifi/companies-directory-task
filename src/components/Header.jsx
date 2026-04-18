export default function Header() {
  return (
    <header className="relative overflow-hidden border-b border-slate-800/60">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/5 to-cyan-600/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4">
          {/* Logo icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Companies <span className="text-indigo-400">Directory</span>
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Discover and explore companies across India
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
