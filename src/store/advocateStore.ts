import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Advocate, AdvocateFilters } from '../types/advocate';

interface AdvocateState {
  // Data
  advocates: Advocate[];
  filteredAdvocates: Advocate[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadingMore: boolean;

  // Search & Filters
  searchTerm: string;
  filters: AdvocateFilters;
  filtersLoading: boolean;

  // Pagination
  currentPage: number;
  pageSize: number;
}

interface AdvocateActions {
  // Data actions
  setAdvocates: (advocates: Advocate[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLoadingMore: (loadingMore: boolean) => void;

  // Search actions
  setSearchTerm: (term: string) => void;
  searchAdvocates: () => Promise<void>;
  resetSearch: () => void;

  // Filter actions
  setFilters: (filters: AdvocateFilters) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  setFiltersLoading: (loading: boolean) => void;

  // Pagination actions
  loadMoreAdvocates: () => Promise<void>;

  // Computed selectors
  getResultsCount: () => number;
  getTotalCount: () => number;
}

type AdvocateStore = AdvocateState & AdvocateActions;

// Mock data for development
const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    city: 'New York',
    degree: 'JD',
    specialties: ['Corporate Law', 'Securities Law'],
    yearsOfExperience: 12,
    phoneNumber: 2125551234
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    city: 'Los Angeles',
    degree: 'JD',
    specialties: ['Immigration Law', 'Family Law'],
    yearsOfExperience: 8,
    phoneNumber: 3105551234
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Rodriguez',
    city: 'Chicago',
    degree: 'JD',
    specialties: ['Criminal Law', 'Civil Rights'],
    yearsOfExperience: 15,
    phoneNumber: 3125551234
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Thompson',
    city: 'Houston',
    degree: 'JD',
    specialties: ['Personal Injury', 'Medical Malpractice'],
    yearsOfExperience: 20,
    phoneNumber: 7135551234
  },
  {
    id: 5,
    firstName: 'Lisa',
    lastName: 'Williams',
    city: 'Philadelphia',
    degree: 'JD',
    specialties: ['Real Estate Law', 'Contract Law'],
    yearsOfExperience: 7,
    phoneNumber: 2155551234
  },
  {
    id: 6,
    firstName: 'James',
    lastName: 'Brown',
    city: 'Phoenix',
    degree: 'JD',
    specialties: ['Tax Law', 'Business Law'],
    yearsOfExperience: 10,
    phoneNumber: 6025551234
  },
  {
    id: 7,
    firstName: 'Maria',
    lastName: 'Garcia',
    city: 'San Antonio',
    degree: 'JD',
    specialties: ['Family Law', 'Immigration Law'],
    yearsOfExperience: 5,
    phoneNumber: 2105551234
  },
  {
    id: 8,
    firstName: 'Robert',
    lastName: 'Davis',
    city: 'San Diego',
    degree: 'JD',
    specialties: ['Environmental Law', 'Intellectual Property'],
    yearsOfExperience: 18,
    phoneNumber: 6195551234
  },
  {
    id: 9,
    firstName: 'Jessica',
    lastName: 'Miller',
    city: 'Dallas',
    degree: 'JD',
    specialties: ['Corporate Law', 'Mergers & Acquisitions'],
    yearsOfExperience: 14,
    phoneNumber: 2145551234
  },
  {
    id: 10,
    firstName: 'Christopher',
    lastName: 'Wilson',
    city: 'San Jose',
    degree: 'JD',
    specialties: ['Technology Law', 'Startup Law'],
    yearsOfExperience: 6,
    phoneNumber: 4085551234
  }
];

// Helper functions for filtering
const matchesSearchTerm = (advocate: Advocate, searchTerm: string): boolean => {
  if (!searchTerm) return true;

  const normalizedTerm = searchTerm.toLowerCase();
  const searchableText = [
    advocate.firstName,
    advocate.lastName,
    advocate.city,
    advocate.degree,
    ...advocate.specialties
  ].join(' ').toLowerCase();

  return searchableText.includes(normalizedTerm);
};

const matchesFilters = (advocate: Advocate, filters: AdvocateFilters): boolean => {
  // City filter
  if (filters.city && advocate.city.toLowerCase() !== filters.city.toLowerCase()) {
    return false;
  }

  // Specialty filter
  if (filters.specialty && !advocate.specialties.some(s =>
    s.toLowerCase().includes(filters.specialty.toLowerCase())
  )) {
    return false;
  }

  // Degree filter
  if (filters.degree && advocate.degree.toLowerCase() !== filters.degree.toLowerCase()) {
    return false;
  }

  // Experience filter
  if (filters.experience) {
    const exp = advocate.yearsOfExperience;
    switch (filters.experience) {
      case '0-2':
        if (exp < 0 || exp > 2) return false;
        break;
      case '3-5':
        if (exp < 3 || exp > 5) return false;
        break;
      case '6-10':
        if (exp < 6 || exp > 10) return false;
        break;
      case '11-15':
        if (exp < 11 || exp > 15) return false;
        break;
      case '16-20':
        if (exp < 16 || exp > 20) return false;
        break;
      case '20+':
        if (exp < 20) return false;
        break;
    }
  }

  return true;
};

const filterAdvocates = (advocates: Advocate[], searchTerm: string, filters: AdvocateFilters): Advocate[] => {
  return advocates.filter(advocate =>
    matchesSearchTerm(advocate, searchTerm) && matchesFilters(advocate, filters)
  );
};

// Simulate API delay
const simulateApiDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const useAdvocateStore = create<AdvocateStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      advocates: [],
      filteredAdvocates: [],
      loading: false,
      error: null,
      hasMore: true,
      loadingMore: false,
      searchTerm: '',
      filters: {
        city: '',
        specialty: '',
        degree: '',
        experience: ''
      },
      filtersLoading: false,
      currentPage: 1,
      pageSize: 10,

      // Data actions
      setAdvocates: (advocates) => set({ advocates }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setLoadingMore: (loadingMore) => set({ loadingMore }),

      // Search actions
      setSearchTerm: (searchTerm) => {
        set({ searchTerm });
        const { advocates, filters } = get();
        const filteredAdvocates = filterAdvocates(advocates, searchTerm, filters);
        set({ filteredAdvocates });
      },

      searchAdvocates: async () => {
        const { searchTerm, filters } = get();
        set({ loading: true, error: null });

        try {
          await simulateApiDelay();

          // In a real app, this would be an API call
          const advocates = mockAdvocates;
          const filteredAdvocates = filterAdvocates(advocates, searchTerm, filters);

          set({
            advocates,
            filteredAdvocates,
            loading: false,
            hasMore: filteredAdvocates.length > 10
          });
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to search advocates'
          });
        }
      },

      resetSearch: () => {
        set({
          searchTerm: '',
          filters: {
            city: '',
            specialty: '',
            degree: '',
            experience: ''
          },
          filteredAdvocates: [],
          currentPage: 1
        });
      },

      // Filter actions
      setFilters: (filters) => {
        set({ filters });
        const { advocates, searchTerm } = get();
        const filteredAdvocates = filterAdvocates(advocates, searchTerm, filters);
        set({ filteredAdvocates });
      },

      applyFilters: async () => {
        const { searchTerm, filters } = get();
        set({ filtersLoading: true });

        try {
          await simulateApiDelay(300);

          const { advocates } = get();
          const filteredAdvocates = filterAdvocates(advocates, searchTerm, filters);

          set({
            filteredAdvocates,
            filtersLoading: false,
            currentPage: 1
          });
        } catch (error) {
          set({
            filtersLoading: false,
            error: error instanceof Error ? error.message : 'Failed to apply filters'
          });
        }
      },

      clearFilters: () => {
        const newFilters = {
          city: '',
          specialty: '',
          degree: '',
          experience: ''
        };

        set({ filters: newFilters });

        const { advocates, searchTerm } = get();
        const filteredAdvocates = filterAdvocates(advocates, searchTerm, newFilters);
        set({ filteredAdvocates });
      },

      setFiltersLoading: (filtersLoading) => set({ filtersLoading }),

      // Pagination actions
      loadMoreAdvocates: async () => {
        const { loadingMore, hasMore } = get();
        if (loadingMore || !hasMore) return;

        set({ loadingMore: true });

        try {
          await simulateApiDelay();

          // Simulate loading more data
          set({
            loadingMore: false,
            hasMore: false // For demo, we'll say no more data
          });
        } catch (error) {
          set({
            loadingMore: false,
            error: error instanceof Error ? error.message : 'Failed to load more advocates'
          });
        }
      },

      // Computed selectors
      getResultsCount: () => {
        return get().filteredAdvocates.length;
      },

      getTotalCount: () => {
        return get().advocates.length;
      }
    }),
    {
      name: 'advocate-store'
    }
  )
);