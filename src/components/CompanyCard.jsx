// Color map for different industries - visual identity
const INDUSTRY_COLORS = {
  Technology: { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/30", dot: "bg-blue-400" },
  Finance: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30", dot: "bg-emerald-400" },
  Healthcare: { bg: "bg-rose-500/15", text: "text-rose-300", border: "border-rose-500/30", dot: "bg-rose-400" },
  Education: { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30", dot: "bg-amber-400" },
  Agriculture: { bg: "bg-lime-500/15", text: "text-lime-300", border: "border-lime-500/30", dot: "bg-lime-400" },
  Construction: { bg: "bg-orange-500/15", text: "text-orange-300", border: "border-orange-500/30", dot: "bg-orange-400" },
  "E-Commerce": { bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/30", dot: "bg-purple-400" },
  Media: { bg: "bg-pink-500/15", text: "text-pink-300", border: "border-pink-500/30", dot: "bg-pink-400" },
  "Non-Profit": { bg: "bg-teal-500/15", text: "text-teal-300", border: "border-teal-500/30", dot: "bg-teal-400" },
  Automotive: { bg: "bg-cyan-500/15", text: "text-cyan-300", border: "border-cyan-500/30", dot: "bg-cyan-400" },
  Telecommunications: { bg: "bg-violet-500/15", text: "text-violet-300", border: "border-violet-500/30", dot: "bg-violet-400" },
  Legal: { bg: "bg-slate-500/15", text: "text-slate-300", border: "border-slate-500/30", dot: "bg-slate-400" },
  "Food & Beverage": { bg: "bg-red-500/15", text: "text-red-300", border: "border-red-500/30", dot: "bg-red-400" },
};

const DEFAULT_COLOR = { bg: "bg-indigo-500/15", text: "text-indigo-300", border: "border-indigo-500/30", dot: "bg-indigo-400" };

// Logo background colors - cycle through
const LOGO_GRADIENTS = [
  "from-indigo-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-pink-500 to-rose-600",
  "from-violet-500 to-indigo-600",
];

export default function CompanyCard({ company, index }) {
  const color = INDUSTRY_COLORS[company.industry] || DEFAULT_COLOR;
  const gradient = LOGO_GRADIENTS[index % LOGO_GRADIENTS.length];

  return (
   <div className="group relative bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-0.5 cursor-pointer">

      {/* Card Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Logo Avatar */}
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg`}>
          {company.logo}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-slate-100 font-semibold text-base leading-tight truncate group-hover:text-white transition-colors">
            {company.name}
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">{company.website}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
        {company.description}
      </p>

      {/* Tags Row */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Industry Badge */}
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${color.bg} ${color.text} ${color.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
          {company.industry}
        </span>

        {/* Location Badge */}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-700/60 text-slate-300 border border-slate-600/50">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {company.location}
        </span>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-700/50">
        <div className="text-center">
          <p className="text-slate-200 font-semibold text-sm">{company.employees.toLocaleString()}</p>
          <p className="text-slate-500 text-xs">Employees</p>
        </div>
        <div className="text-center border-x border-slate-700/50">
          <p className="text-slate-200 font-semibold text-sm">{company.founded}</p>
          <p className="text-slate-500 text-xs">Founded</p>
        </div>
        <div className="text-center">
          <p className="text-emerald-400 font-semibold text-sm">{company.revenue}</p>
          <p className="text-slate-500 text-xs">Revenue</p>
        </div>
      </div>
    </div>
  );
}
