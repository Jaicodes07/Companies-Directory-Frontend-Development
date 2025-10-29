import { useState, useMemo, useEffect } from 'react';
import { useCompanies } from '@/hooks/useCompanies';
import { FiltersBar } from '@/components/FiltersBar';
import { CompaniesGrid } from '@/components/CompaniesGrid';
import { Pagination } from '@/components/Pagination';
import { FilterState, SortOrder } from '@/types/company';
import {
  applyFilters,
  applySort,
  paginate,
  getTotalPages,
  getUniqueValues,
} from '@/utils/filters';
import { Building2 } from 'lucide-react';

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 250;

export const CompaniesPage = () => {
  const { companies, loading, error, refetch } = useCompanies();
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    locations: [],
    industries: [],
    sortOrder: 'asc',
  });
  
  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  // UI state for filters
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
      setCurrentPage(1); // Reset to page 1 on search
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Extract unique locations and industries
  const { locations, industries } = useMemo(() => {
    return {
      locations: getUniqueValues(companies, 'location'),
      industries: getUniqueValues(companies, 'industry'),
    };
  }, [companies]);

  // Apply filters, sorting, and pagination
  const { paginatedCompanies, totalPages, totalFilteredCount } = useMemo(() => {
    // Convert UI state to filter arrays
    const locationFilter = selectedLocation === 'all' ? [] : [selectedLocation];
    const industryFilter = selectedIndustry === 'all' ? [] : [selectedIndustry];

    // Apply filters
    let filtered = applyFilters(
      companies,
      debouncedSearch,
      locationFilter,
      industryFilter
    );

    // Apply sorting
    filtered = applySort(filtered, filters.sortOrder);

    // Calculate pagination
    const total = getTotalPages(filtered.length, PAGE_SIZE);
    const paginated = paginate(filtered, currentPage, PAGE_SIZE);

    return {
      paginatedCompanies: paginated,
      totalPages: total,
      totalFilteredCount: filtered.length,
    };
  }, [
    companies,
    debouncedSearch,
    selectedLocation,
    selectedIndustry,
    filters.sortOrder,
    currentPage,
  ]);

  // Handlers
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setCurrentPage(1);
  };

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOrder) => {
    setFilters((prev) => ({ ...prev, sortOrder: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Company Directory
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Explore our curated directory of innovative companies across various industries.
            Filter by location, industry, and search to find the perfect match.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <FiltersBar
          search={filters.search}
          onSearchChange={handleSearchChange}
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
          selectedIndustry={selectedIndustry}
          onIndustryChange={handleIndustryChange}
          sortOrder={filters.sortOrder}
          onSortChange={handleSortChange}
          locations={locations}
          industries={industries}
          disabled={loading}
        />

        {/* Results Count */}
        {!loading && !error && (
          <div
            className="mt-6 text-sm text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            Showing {paginatedCompanies.length} of {totalFilteredCount} companies
          </div>
        )}

        {/* Companies Grid */}
        <div className="mt-6">
          <CompaniesGrid
            companies={paginatedCompanies}
            loading={loading}
            error={error}
            onRetry={refetch}
          />
        </div>

        {/* Pagination */}
        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        )}
      </main>
    </div>
  );
};
