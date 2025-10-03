import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Advocate, AdvocateFilters } from '../types/advocate';
import { fetchAdvocates, convertFiltersToParams } from '../lib/api';

interface AdvocateState {
  // Data
  advocates: Advocate[];
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
  totalCount: number;
}

interface AdvocateActions {
  // Data actions
  setAdvocates: (advocates: Advocate[]) => void;
  appendAdvocates: (advocates: Advocate[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLoadingMore: (loadingMore: boolean) => void;

  // Search actions
  setSearchTerm: (term: string) => void;
  searchAdvocates: () => Promise<void>;
  resetSearch: () => void;

  // Filter actions
  setFilters: (filters: AdvocateFilters) => void;
  applyFilters: () => Promise<void>;
  clearFilters: () => void;
  setFiltersLoading: (loading: boolean) => void;

  // Pagination actions
  loadMoreAdvocates: () => Promise<void>;

  // Computed selectors
  getResultsCount: () => number;
  getTotalCount: () => number;
}

type AdvocateStore = AdvocateState & AdvocateActions;



export const useAdvocateStore = create<AdvocateStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      advocates: [],
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
      totalCount: 0,

      // Data actions
      setAdvocates: (advocates) => set({ advocates }),
      appendAdvocates: (advocates) => set((state) => ({
        advocates: [...state.advocates, ...advocates]
      })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setLoadingMore: (loadingMore) => set({ loadingMore }),

      // Search actions
      setSearchTerm: (searchTerm) => {
        set({ searchTerm });
      },

      searchAdvocates: async () => {
        const { searchTerm, filters, pageSize } = get();
        set({ loading: true, error: null, currentPage: 1 });

        try {
          const params = convertFiltersToParams(searchTerm, filters, 1, pageSize);
          const response = await fetchAdvocates(params);

          set({
            advocates: response.data,
            loading: false,
            hasMore: response.pagination?.hasMore || false,
            totalCount: response.pagination?.total || 0,
            currentPage: 1
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
          advocates: [],
          currentPage: 1,
          totalCount: 0
        });
      },

      // Filter actions
      setFilters: (filters) => {
        set({ filters });
      },

      applyFilters: async () => {
        const { searchTerm, filters, pageSize } = get();
        set({ filtersLoading: true, currentPage: 1 });

        try {
          const params = convertFiltersToParams(searchTerm, filters, 1, pageSize);
          const response = await fetchAdvocates(params);

          set({
            advocates: response.data,
            filtersLoading: false,
            hasMore: response.pagination?.hasMore || false,
            totalCount: response.pagination?.total || 0,
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
      },

      setFiltersLoading: (filtersLoading) => set({ filtersLoading }),

      // Pagination actions
      loadMoreAdvocates: async () => {
        const { loadingMore, hasMore, currentPage, searchTerm, filters, pageSize } = get();
        if (loadingMore || !hasMore) return;

        set({ loadingMore: true });
        const nextPage = currentPage + 1;

        try {
          const params = convertFiltersToParams(searchTerm, filters, nextPage, pageSize);
          const response = await fetchAdvocates(params);

          set((state) => ({
            advocates: [...state.advocates, ...response.data],
            loadingMore: false,
            hasMore: response.pagination?.hasMore || false,
            currentPage: nextPage
          }));
        } catch (error) {
          set({
            loadingMore: false,
            error: error instanceof Error ? error.message : 'Failed to load more advocates'
          });
        }
      },

      // Computed selectors
      getResultsCount: () => {
        return get().advocates.length;
      },

      getTotalCount: () => {
        return get().totalCount;
      }
    }),
    {
      name: 'advocate-store'
    }
  )
);