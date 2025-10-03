import { StateCreator } from 'zustand';
import { Advocate } from '../../types/advocate';
import { SearchFilters } from '../../types/search';

export interface SearchHistoryItem {
  id: string;
  query: string;
  filters: SearchFilters;
  timestamp: number;
  resultsCount: number;
}

export interface SearchState {
  searchQuery: string;
  filters: SearchFilters;
  filteredAdvocates: Advocate[];
  searchHistory: SearchHistoryItem[];
}

export interface SearchActions {
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  clearSearch: () => void;
  addToSearchHistory: (query: string, filters: SearchFilters, resultsCount: number) => void;
  clearSearchHistory: () => void;
}

export interface SearchSlice extends SearchState, SearchActions {}

// Helper function to normalize strings for comparison
const normalizeString = (str: string): string => {
  return str.toLowerCase().trim();
};

// Helper function to check if a value matches a filter
const matchesFilter = (value: string, filterValue: string): boolean => {
  if (!filterValue) return true;

  const normalizedValue = normalizeString(value);
  const normalizedFilter = normalizeString(filterValue);

  // Handle experience filter specially
  if (filterValue.includes('-') || filterValue.includes('+')) {
    return value === filterValue;
  }

  // For cities and specialties, check for exact match or partial match
  return normalizedValue === normalizedFilter ||
         normalizedValue.includes(normalizedFilter) ||
         normalizedFilter.includes(normalizedValue);
};

// Helper function to check experience range
const matchesExperienceFilter = (experience: number, filter: string): boolean => {
  if (!filter) return true;

  switch (filter) {
    case '0-2':
      return experience >= 0 && experience <= 2;
    case '3-5':
      return experience >= 3 && experience <= 5;
    case '6-10':
      return experience >= 6 && experience <= 10;
    case '11-15':
      return experience >= 11 && experience <= 15;
    case '16-20':
      return experience >= 16 && experience <= 20;
    case '20+':
      return experience >= 20;
    default:
      return true;
  }
};

// Function to filter advocates based on search criteria
const filterAdvocates = (
  advocates: Advocate[],
  query: string,
  filters: SearchFilters
): Advocate[] => {
  const normalizedQuery = normalizeString(query);

  return advocates.filter(advocate => {
    // Text search in name, specialties, city, and degree
    const searchableText = [
      advocate.firstName,
      advocate.lastName,
      advocate.city,
      advocate.degree,
      ...advocate.specialties
    ].join(' ').toLowerCase();

    const matchesQuery = !normalizedQuery ||
      searchableText.includes(normalizedQuery);

    // City filter
    const matchesCity = matchesFilter(advocate.city, filters.city);

    // Specialty filter
    const matchesSpecialty = !filters.specialty ||
      advocate.specialties.some(specialty => matchesFilter(specialty, filters.specialty));

    // Experience filter
    const matchesExperience = matchesExperienceFilter(advocate.yearsOfExperience, filters.experience);

    return matchesQuery && matchesCity && matchesSpecialty && matchesExperience;
  });
};

export const searchSlice: StateCreator<
  SearchSlice,
  [],
  [],
  SearchSlice
> = (set, get) => ({
  // Initial state
  searchQuery: '',
  filters: {
    city: '',
    specialty: '',
    experience: ''
  },
  filteredAdvocates: [],
  searchHistory: [],

  // Actions
  setSearchQuery: (query) => {
    set((state) => {
      const newState = { ...state, searchQuery: query };

      // Get advocates from the store (this assumes the advocates slice is available)
      const advocates = (get as any)().advocates || [];

      // Update filtered advocates
      newState.filteredAdvocates = filterAdvocates(advocates, query, state.filters);

      return newState;
    });
  },

  setFilters: (newFilters) => {
    set((state) => {
      const filters = { ...state.filters, ...newFilters };

      // Get advocates from the store
      const advocates = (get as any)().advocates || [];

      // Update filtered advocates
      const filteredAdvocates = filterAdvocates(advocates, state.searchQuery, filters);

      return {
        ...state,
        filters,
        filteredAdvocates
      };
    });
  },

  clearFilters: () => {
    set((state) => {
      const filters = {
        city: '',
        specialty: '',
        experience: ''
      };

      // Get advocates from the store
      const advocates = (get as any)().advocates || [];

      // Update filtered advocates
      const filteredAdvocates = filterAdvocates(advocates, state.searchQuery, filters);

      return {
        ...state,
        filters,
        filteredAdvocates
      };
    });
  },

  clearSearch: () => {
    set((state) => ({
      ...state,
      searchQuery: '',
      filters: {
        city: '',
        specialty: '',
        experience: ''
      },
      filteredAdvocates: []
    }));
  },

  addToSearchHistory: (query, filters, resultsCount) => {
    // Don't add empty searches
    if (!query.trim() && !filters.city && !filters.specialty && !filters.experience) {
      return;
    }

    set((state) => {
      const historyItem: SearchHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        query: query.trim(),
        filters: { ...filters },
        timestamp: Date.now(),
        resultsCount
      };

      // Remove duplicate searches (same query and filters)
      const existingIndex = state.searchHistory.findIndex(item =>
        item.query === historyItem.query &&
        item.filters.city === historyItem.filters.city &&
        item.filters.specialty === historyItem.filters.specialty &&
        item.filters.experience === historyItem.filters.experience
      );

      let newHistory = [...state.searchHistory];

      if (existingIndex >= 0) {
        // Update existing item with new timestamp and results count
        newHistory[existingIndex] = historyItem;
      } else {
        // Add new item to the beginning
        newHistory.unshift(historyItem);
      }

      // Keep only the last 10 searches
      newHistory = newHistory.slice(0, 10);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('solace-search-history', JSON.stringify(newHistory));
      }

      return {
        ...state,
        searchHistory: newHistory
      };
    });
  },

  clearSearchHistory: () => {
    set((state) => ({
      ...state,
      searchHistory: []
    }));
  },
});