import { Company } from '@/types/company';
import { CompanyCard } from './CompanyCard';
import { CompanyCardSkeleton } from './CompanyCardSkeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface CompaniesGridProps {
  companies: Company[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const CompaniesGrid = ({
  companies,
  loading = false,
  error = null,
  onRetry,
}: CompaniesGridProps) => {
  // Error State
  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Companies</AlertTitle>
        <AlertDescription className="mt-2">
          {error}
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-3"
            >
              Retry
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        aria-live="polite"
        aria-busy="true"
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <CompanyCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty State
  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <AlertCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No companies found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  // Success State - Company Grid
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
    >
      {companies.map((company) => (
        <div key={company.id} role="listitem">
          <CompanyCard company={company} />
        </div>
      ))}
    </div>
  );
};
