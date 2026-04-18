import { useState, useEffect, useMemo } from "react";
import companiesData from "./data/companies.json";
import CompanyCard from "./components/CompanyCard";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";

const ITEMS_PER_PAGE = 6;

export default function App() {
  // ── STATE ──────────────────────────────────────────────────────────────────
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);

  // ── MOCK API CALL (simulating fetch) ──────────────────────────────────────
  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      try {
        setCompanies(companiesData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load companies. Please try again.");
        setLoading(false);
      }
    }, 1200); // simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // ── DERIVED DATA: unique values for dropdowns ──────────────────────────────
  const industries = useMemo(
    () => ["All", ...new Set(companies.map((c) => c.industry))].sort(),
    [companies]
  );
  const locations = useMemo(
    () => ["All", ...new Set(companies.map((c) => c.location))].sort(),
    [companies]
  );

  // ── FILTERING + SORTING (useMemo = recalculate only when deps change) ─────

  const filteredCompanies = useMemo(() => {
    let result = [...companies];

    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }

    // 2. Industry filter
    if (selectedIndustry !== "All") {
      result = result.filter((c) => c.industry === selectedIndustry);
    }

    // 3. Location filter
    if (selectedLocation !== "All") {
      result = result.filter((c) => c.location === selectedLocation);
    }

    // 4. Sorting
    result.sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "employees-asc") return a.employees - b.employees;
      if (sortBy === "employees-desc") return b.employees - a.employees;
      if (sortBy === "founded-asc") return a.founded - b.founded;
      if (sortBy === "founded-desc") return b.founded - a.founded;
      return 0;
    });

    return result;
  }, [companies, searchQuery, selectedIndustry, selectedLocation, sortBy]);

  // ── PAGINATION ─────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);

  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCompanies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCompanies, currentPage]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedIndustry, selectedLocation, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("All");
    setSelectedLocation("All");
    setSortBy("name-asc");
    setCurrentPage(1);
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <StatsBar
          total={companies.length}
          filtered={filteredCompanies.length}
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          sortBy={sortBy}
          onSortChange={setSortBy}
          industries={industries}
          locations={locations}
          onClearFilters={handleClearFilters}
        />

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 text-sm tracking-widest uppercase">
              Loading Companies...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="text-5xl">⚠️</div>
            <p className="text-red-400 text-lg font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCompanies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="text-6xl">🔍</div>
            <p className="text-slate-300 text-xl font-medium">
              No companies found
            </p>
            <p className="text-slate-400 text-sm">
              Try adjusting your filters
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Companies Grid */}
        {!loading && !error && paginatedCompanies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {paginatedCompanies.map((company, i) => (
                <CompanyCard key={company.id} company={company} index={i} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredCompanies.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </>
        )}
      </main>
    </div>
  );
}
