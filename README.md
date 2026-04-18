# Frontlines Edutech — Frontend Assessment
# Companies Directory


companies-directory/
├── src/
│   ├── data/
│   │   └── companies.json        ← Mock API data (15 companies)
│   ├── components/
│   │   ├── Header.jsx            ← App header with logo
│   │   ├── StatsBar.jsx          ← Shows total/filtered count
│   │   ├── FilterBar.jsx         ← Search + 3 dropdowns + clear
│   │   ├── CompanyCard.jsx       ← Individual company card
│   │   └── Pagination.jsx        ← Page navigation
│   ├── App.jsx                   ← Main component (state + logic)
│   ├── main.jsx                  ← React entry point
│   └── index.css                 ← Tailwind + custom CSS
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## Tech Stack & Why

| Tool | Reason |
|------|--------|
| **React 18** | Component-based UI, modern hooks |
| **Vite** | 10x faster than CRA, HMR, modern bundler |
| **Tailwind CSS** | Utility-first, no CSS files needed, responsive built-in |
| **Static JSON** | Backend optional - mock data simulates real API |
| **React Hooks** | useState, useEffect, useMemo — no Redux needed |

---

```js
// App.jsx me yeh code hai:
useEffect(() => {
  setLoading(true);
  const timer = setTimeout(() => {
    setCompanies(companiesData); // JSON import kiya
    setLoading(false);
  }, 1200); // 1.2 second delay = real API feel
}, []);
```


**States jo banaye:**
```js
const [companies, setCompanies] = useState([]);      // full data
const [loading, setLoading] = useState(true);         // loading state
const [error, setError] = useState(null);             // error state
const [searchQuery, setSearchQuery] = useState("");   // search
const [selectedIndustry, setSelectedIndustry] = useState("All");
const [selectedLocation, setSelectedLocation] = useState("All");
const [sortBy, setSortBy] = useState("name-asc");
const [currentPage, setCurrentPage] = useState(1);
```

---

```js
const filteredCompanies = useMemo(() => {
  let result = [...companies];
  
  // Step 1: Search (name, industry, location me dhundho)
  if (searchQuery) {
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) || ...
    );
  }
  
  // Step 2: Industry filter
  if (selectedIndustry !== "All") {
    result = result.filter(c => c.industry === selectedIndustry);
  }
  
  // Step 3: Location filter
  if (selectedLocation !== "All") {
    result = result.filter(c => c.location === selectedLocation);
  }
  
  // Step 4: Sorting
  result.sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    // ...etc
  });
  
  return result;
}, [companies, searchQuery, selectedIndustry, selectedLocation, sortBy]);
```

---

###  Pagination kaise implement ki?

```js
const ITEMS_PER_PAGE = 6;
const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);

const paginatedCompanies = useMemo(() => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  return filteredCompanies.slice(start, start + ITEMS_PER_PAGE);
}, [filteredCompanies, currentPage]);

// Filter change hone par page 1 pe wapas
useEffect(() => {
  setCurrentPage(1);
}, [searchQuery, selectedIndustry, selectedLocation, sortBy]);
```

---

### Loading aur Error states kaise handle kiye?

```jsx
{loading && <LoadingSpinner />}
{error && <ErrorMessage onRetry={() => window.location.reload()} />}
{!loading && filteredCompanies.length === 0 && <EmptyState />}
{!loading && paginatedCompanies.map(c => <CompanyCard key={c.id} ... />)}
```

---


##  Features Checklist

- [x] Responsive card layout
- [x] Search by name/industry/location
- [x] Filter by Industry (dropdown)
- [x] Filter by Location (dropdown)
- [x] Sort by name, employees, founded year
- [x] Loading state (spinner)
- [x] Error state (retry button)
- [x] Empty state (clear filters)
- [x] Pagination (6 per page)
- [x] Clear all filters button
- [x] Stats bar showing filtered count
- [x] Tailwind CSS styling
- [x] Mobile responsive
