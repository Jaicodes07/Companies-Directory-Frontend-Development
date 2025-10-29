export interface Company {
  id: string;
  name: string;
  logo: string;
  location: string;
  industry: string;
  size: string;
  website: string;
  description: string;
}

export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  locations: string[];
  industries: string[];
  sortOrder: SortOrder;
}
