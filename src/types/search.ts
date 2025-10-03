import { Advocate } from './advocate';

/**
 * Search filter options
 */
export interface SearchFilters {
  searchTerm: string;
  degree: string;
  minExperience: number | null;
  specialty: string;
}

/**
 * Search state management
 */
export interface SearchState {
  filters: SearchFilters;
  results: Advocate[];
  loading: boolean;
  error: string | null;
  totalResults: number;
}

/**
 * Filter options for dropdowns
 */
export interface FilterOption {
  value: string;
  label: string;
}

/**
 * Available degree options
 */
export const DEGREE_OPTIONS: FilterOption[] = [
  { value: '', label: 'All Degrees' },
  { value: 'MD', label: 'MD' },
  { value: 'PhD', label: 'PhD' },
  { value: 'MSW', label: 'MSW' },
];

/**
 * Common specialty options (based on mock data)
 */
export const SPECIALTY_OPTIONS: FilterOption[] = [
  { value: '', label: 'All Specialties' },
  { value: 'Substance use/abuse', label: 'Substance use/abuse' },
  { value: 'Pediatrics', label: 'Pediatrics' },
  { value: 'Women\'s issues', label: 'Women\'s issues' },
  { value: 'Chronic pain', label: 'Chronic pain' },
  { value: 'Weight loss & nutrition', label: 'Weight loss & nutrition' },
  { value: 'Eating disorders', label: 'Eating disorders' },
  { value: 'Schizophrenia', label: 'Schizophrenia' },
  { value: 'ADHD testing', label: 'ADHD testing' },
  { value: 'Life coaching', label: 'Life coaching' },
  { value: 'Obsessive-compulsive disorders', label: 'Obsessive-compulsive disorders' },
  { value: 'ADHD', label: 'ADHD' },
  { value: 'Personal growth', label: 'Personal growth' },
  { value: 'Trauma & PTSD', label: 'Trauma & PTSD' },
];

/**
 * Search utilities
 */
export interface SearchUtils {
  debounceMs: number;
  minSearchLength: number;
  maxResults: number;
}