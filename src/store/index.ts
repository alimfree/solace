import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { advocatesSlice, AdvocatesSlice } from './slices/advocatesSlice';
import { searchSlice, SearchSlice } from './slices/searchSlice';

// Combined store interface
export interface AppStore extends AdvocatesSlice, SearchSlice {}

// Create the main store with combined slices
export const useAppStore = create<AppStore>()(
  devtools(
    subscribeWithSelector((...a) => ({
      ...advocatesSlice(...a),
      ...searchSlice(...a),
    })),
    {
      name: 'solace-store',
    }
  )
);

// Export individual slice hooks for convenience
export const useAdvocates = () => useAppStore((state) => ({
  advocates: state.advocates,
  loading: state.loading,
  error: state.error,
  fetchAdvocates: state.fetchAdvocates,
  addAdvocate: state.addAdvocate,
  updateAdvocate: state.updateAdvocate,
  deleteAdvocate: state.deleteAdvocate,
  clearError: state.clearError,
}));

export const useSearch = () => useAppStore((state) => ({
  searchQuery: state.searchQuery,
  filters: state.filters,
  filteredAdvocates: state.filteredAdvocates,
  searchHistory: state.searchHistory,
  setSearchQuery: state.setSearchQuery,
  setFilters: state.setFilters,
  clearFilters: state.clearFilters,
  clearSearch: state.clearSearch,
  addToSearchHistory: state.addToSearchHistory,
  clearSearchHistory: state.clearSearchHistory,
}));

// Computed selectors
export const useAdvocateStats = () => useAppStore((state) => {
  const advocates = state.advocates;

  return {
    totalAdvocates: advocates.length,
    citiesCount: new Set(advocates.map(a => a.city)).size,
    specialtiesCount: new Set(advocates.flatMap(a => a.specialties)).size,
    averageExperience: advocates.length > 0
      ? Math.round(advocates.reduce((sum, a) => sum + a.yearsOfExperience, 0) / advocates.length)
      : 0,
    experienceDistribution: advocates.reduce((acc, advocate) => {
      const range = advocate.yearsOfExperience < 3 ? '0-2' :
                   advocate.yearsOfExperience < 6 ? '3-5' :
                   advocate.yearsOfExperience < 11 ? '6-10' :
                   advocate.yearsOfExperience < 16 ? '11-15' :
                   advocate.yearsOfExperience < 21 ? '16-20' : '20+';
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
});

export const useFilterOptions = () => useAppStore((state) => {
  const advocates = state.advocates;

  return {
    cityOptions: Array.from(new Set(advocates.map(a => a.city)))
      .sort()
      .map(city => ({ value: city.toLowerCase().replace(/\s+/g, '-'), label: city })),

    specialtyOptions: Array.from(new Set(advocates.flatMap(a => a.specialties)))
      .sort()
      .map(specialty => ({ value: specialty.toLowerCase().replace(/\s+/g, '-'), label: specialty })),

    experienceOptions: [
      { value: '0-2', label: '0-2 years' },
      { value: '3-5', label: '3-5 years' },
      { value: '6-10', label: '6-10 years' },
      { value: '11-15', label: '11-15 years' },
      { value: '16-20', label: '16-20 years' },
      { value: '20+', label: '20+ years' }
    ],
  };
});

// Persistence subscription (could be extended to localStorage)
useAppStore.subscribe(
  (state) => state.searchHistory,
  (searchHistory) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('solace-search-history', JSON.stringify(searchHistory));
    }
  }
);

// Initialize search history from localStorage
if (typeof window !== 'undefined') {
  const savedHistory = localStorage.getItem('solace-search-history');
  if (savedHistory) {
    try {
      const history = JSON.parse(savedHistory);
      useAppStore.setState({ searchHistory: history });
    } catch (error) {
      console.warn('Failed to parse saved search history:', error);
    }
  }
}