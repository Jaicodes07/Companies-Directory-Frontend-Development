import { Company, SortOrder } from '@/types/company';

/**
 * Apply search and multi-filter logic to companies array
 */
export const applyFilters = (
  companies: Company[],
  search: string,
  locations: string[],
  industries: string[]
): Company[] => {
  return companies.filter((company) => {
    const matchesSearch =
      search === '' || company.name.toLowerCase().includes(search.toLowerCase());

    // Location filter -AND logic - must match selected locations
    const matchesLocation =
      locations.length === 0 || locations.includes(company.location);

    // Industry filter -AND logic - must match selected industries
    const matchesIndustry =
      industries.length === 0 || industries.includes(company.industry);

    return matchesSearch && matchesLocation && matchesIndustry;
  });
};

/*
 * Sort companies by name with specified order
 */
export const applySort = (
  companies: Company[],
  sortOrder: SortOrder
): Company[] => {
  return [...companies].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

/*
 * Paginate companies array
 */
export const paginate = (
  companies: Company[],
  page: number,
  pageSize: number
): Company[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return companies.slice(startIndex, endIndex);
};

/*
 * Calculate total pages
 */
export const getTotalPages = (totalItems: number, pageSize: number): number => {
  return Math.ceil(totalItems / pageSize);
};

/*
 * Extract unique values from company field
 */
export const getUniqueValues = (
  companies: Company[],
  field: keyof Company
): string[] => {
  const values = companies.map((company) => company[field] as string);
  return Array.from(new Set(values)).sort();
};
