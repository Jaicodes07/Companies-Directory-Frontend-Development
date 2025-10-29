import { useState, useEffect } from 'react';
import { Company } from '@/types/company';
import { ENDPOINTS, RETRY_CONFIG } from '@/config/api';

interface UseCompaniesReturn {
  companies: Company[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCompanies = (): UseCompaniesReturn => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ENDPOINTS.companies);

      if (!response.ok) {
        throw new Error(`Failed to fetch companies: ${response.statusText}`);
      }

      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load companies';
      
      // Retry once on network error
      if (retryCount < RETRY_CONFIG.maxRetries) {
        setTimeout(() => {
          fetchCompanies(retryCount + 1);
        }, RETRY_CONFIG.retryDelay);
        return;
      }

      setError(errorMessage);
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return {
    companies,
    loading,
    error,
    refetch: () => fetchCompanies(),
  };
};
