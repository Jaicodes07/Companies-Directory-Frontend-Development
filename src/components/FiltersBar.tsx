import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortOrder } from '@/types/company';

interface FiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  selectedIndustry: string;
  onIndustryChange: (value: string) => void;
  sortOrder: SortOrder;
  onSortChange: (value: SortOrder) => void;
  locations: string[];
  industries: string[];
  disabled?: boolean;
}

export const FiltersBar = ({
  search,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedIndustry,
  onIndustryChange,
  sortOrder,
  onSortChange,
  locations,
  industries,
  disabled = false,
}: FiltersBarProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={disabled}
            className="pl-9 pr-9"
            aria-label="Search companies by name"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => onSearchChange('')}
              disabled={disabled}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Location Filter */}
        <Select
          value={selectedLocation}
          onValueChange={onLocationChange}
          disabled={disabled}
        >
          <SelectTrigger aria-label="Filter by location">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Industry Filter */}
        <Select
          value={selectedIndustry}
          onValueChange={onIndustryChange}
          disabled={disabled}
        >
          <SelectTrigger aria-label="Filter by industry">
            <SelectValue placeholder="All Industries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Control - Separate Row */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort:</span>
        <Select
          value={sortOrder}
          onValueChange={(value) => onSortChange(value as SortOrder)}
          disabled={disabled}
        >
          <SelectTrigger className="w-[180px]" aria-label="Sort companies">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Name: A → Z</SelectItem>
            <SelectItem value="desc">Name: Z → A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
