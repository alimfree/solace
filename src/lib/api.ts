import { AdvocateFilters } from '../types/advocate';

export interface FetchAdvocatesParams {
  search?: string;
  city?: string;
  specialty?: string;
  degree?: string;
  experience?: string;
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  error?: string;
}

export const buildAdvocatesApiUrl = (params: FetchAdvocatesParams): string => {
  const url = new URL('/api/advocates', window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

export const fetchAdvocates = async (params: FetchAdvocatesParams = {}) => {
  const url = buildAdvocatesApiUrl(params);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const convertFiltersToParams = (
  searchTerm: string,
  filters: AdvocateFilters,
  page: number = 1,
  limit: number = 10
): FetchAdvocatesParams => {
  return {
    search: searchTerm || undefined,
    city: filters.city || undefined,
    specialty: filters.specialty || undefined,
    degree: filters.degree || undefined,
    experience: filters.experience || undefined,
    page,
    limit
  };
};