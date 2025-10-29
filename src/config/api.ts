// API Configuration
// Switch DATA_SOURCE between 'static' and 'remote' to change data source

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const DATA_SOURCE: 'static' | 'remote' = 'static';

export const ENDPOINTS = {
  companies: DATA_SOURCE === 'static' ? '/data/companies.json' : `${BASE_URL}/companies`,
};

// Retry configuration for network errors
export const RETRY_CONFIG = {
  maxRetries: 1,
  retryDelay: 1000,
};
