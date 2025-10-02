import { act, renderHook } from '@testing-library/react';
import { useAppStore, useAdvocates, useSearch, useAdvocateStats, useFilterOptions } from './index';
import { Advocate } from '../types/advocate';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock advocates data for testing
const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    degree: 'JD from Harvard Law School',
    specialties: ['Corporate Law', 'Tax Law'],
    yearsOfExperience: 10,
    phoneNumber: 1234567890
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'Los Angeles',
    degree: 'JD from Stanford Law School',
    specialties: ['Family Law', 'Immigration Law'],
    yearsOfExperience: 5,
    phoneNumber: 1234567891
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    city: 'Chicago',
    degree: 'JD from University of Chicago Law School',
    specialties: ['Criminal Law'],
    yearsOfExperience: 15,
    phoneNumber: 1234567892
  }
];

describe('Zustand Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useAppStore.setState({
      advocates: [],
      loading: false,
      error: null,
      searchQuery: '',
      filters: { city: '', specialty: '', experience: '' },
      filteredAdvocates: [],
      searchHistory: []
    });

    // Clear localStorage mocks
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  describe('Advocates Slice', () => {
    it('should initialize with empty state', () => {
      const { result } = renderHook(() => useAdvocates());

      expect(result.current.advocates).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('should handle loading state during fetch', async () => {
      const { result } = renderHook(() => useAdvocates());

      act(() => {
        result.current.fetchAdvocates();
      });

      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBe(null);
    });

    it('should add advocate correctly', () => {
      const { result } = renderHook(() => useAdvocates());

      const newAdvocate = {
        firstName: 'Test',
        lastName: 'User',
        city: 'Test City',
        degree: 'JD from Test School',
        specialties: ['Test Law'],
        yearsOfExperience: 3,
        phoneNumber: 1111111111
      };

      act(() => {
        result.current.addAdvocate(newAdvocate);
      });

      expect(result.current.advocates).toHaveLength(1);
      expect(result.current.advocates[0]).toMatchObject(newAdvocate);
      expect(result.current.advocates[0].id).toBe(1);
    });

    it('should update advocate correctly', () => {
      const { result } = renderHook(() => useAppStore());

      // First add an advocate
      act(() => {
        result.current.addAdvocate(mockAdvocates[0]);
      });

      // Then update it
      act(() => {
        result.current.updateAdvocate(1, { firstName: 'Updated' });
      });

      expect(result.current.advocates[0].firstName).toBe('Updated');
      expect(result.current.advocates[0].lastName).toBe('Doe'); // Should remain unchanged
    });

    it('should delete advocate correctly', () => {
      const { result } = renderHook(() => useAppStore());

      // Add advocates
      act(() => {
        result.current.addAdvocate(mockAdvocates[0]);
        result.current.addAdvocate(mockAdvocates[1]);
      });

      expect(result.current.advocates).toHaveLength(2);

      // Delete one advocate
      act(() => {
        result.current.deleteAdvocate(1);
      });

      expect(result.current.advocates).toHaveLength(1);
      expect(result.current.advocates[0].id).toBe(2);
    });

    it('should clear error correctly', () => {
      const { result } = renderHook(() => useAppStore());

      // Set an error
      act(() => {
        useAppStore.setState({ error: 'Test error' });
      });

      expect(result.current.error).toBe('Test error');

      // Clear error
      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBe(null);
    });
  });

  describe('Search Slice', () => {
    beforeEach(() => {
      // Set up mock advocates for search tests
      act(() => {
        useAppStore.setState({ advocates: mockAdvocates });
      });
    });

    it('should initialize with empty search state', () => {
      const { result } = renderHook(() => useSearch());

      expect(result.current.searchQuery).toBe('');
      expect(result.current.filters).toEqual({
        city: '',
        specialty: '',
        experience: ''
      });
      expect(result.current.filteredAdvocates).toEqual([]);
      expect(result.current.searchHistory).toEqual([]);
    });

    it('should set search query and filter advocates', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.setSearchQuery('John');
      });

      expect(result.current.searchQuery).toBe('John');
      expect(result.current.filteredAdvocates).toHaveLength(1);
      expect(result.current.filteredAdvocates[0].firstName).toBe('John');
    });

    it('should filter by city', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.setFilters({ city: 'new-york' });
      });

      expect(result.current.filters.city).toBe('new-york');
      expect(result.current.filteredAdvocates).toHaveLength(1);
      expect(result.current.filteredAdvocates[0].city).toBe('New York');
    });

    it('should filter by specialty', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.setFilters({ specialty: 'family-law' });
      });

      expect(result.current.filteredAdvocates).toHaveLength(1);
      expect(result.current.filteredAdvocates[0].specialties).toContain('Family Law');
    });

    it('should filter by experience range', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.setFilters({ experience: '6-10' });
      });

      expect(result.current.filteredAdvocates).toHaveLength(1);
      expect(result.current.filteredAdvocates[0].yearsOfExperience).toBe(10);
    });

    it('should clear filters correctly', () => {
      const { result } = renderHook(() => useSearch());

      // Set some filters
      act(() => {
        result.current.setFilters({ city: 'new-york', specialty: 'corporate-law' });
      });

      expect(result.current.filters.city).toBe('new-york');

      // Clear filters
      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.filters).toEqual({
        city: '',
        specialty: '',
        experience: ''
      });
    });

    it('should clear search completely', () => {
      const { result } = renderHook(() => useSearch());

      // Set search and filters
      act(() => {
        result.current.setSearchQuery('test');
        result.current.setFilters({ city: 'new-york' });
      });

      // Clear everything
      act(() => {
        result.current.clearSearch();
      });

      expect(result.current.searchQuery).toBe('');
      expect(result.current.filters).toEqual({
        city: '',
        specialty: '',
        experience: ''
      });
      expect(result.current.filteredAdvocates).toEqual([]);
    });

    it('should add to search history', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.addToSearchHistory(
          'test query',
          { city: 'new-york', specialty: '', experience: '' },
          1
        );
      });

      expect(result.current.searchHistory).toHaveLength(1);
      expect(result.current.searchHistory[0]).toMatchObject({
        query: 'test query',
        filters: { city: 'new-york', specialty: '', experience: '' },
        resultsCount: 1
      });
    });

    it('should not add empty searches to history', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.addToSearchHistory(
          '',
          { city: '', specialty: '', experience: '' },
          0
        );
      });

      expect(result.current.searchHistory).toHaveLength(0);
    });

    it('should update existing search in history', () => {
      const { result } = renderHook(() => useSearch());

      // Add initial search
      act(() => {
        result.current.addToSearchHistory(
          'test',
          { city: '', specialty: '', experience: '' },
          1
        );
      });

      expect(result.current.searchHistory).toHaveLength(1);
      const initialTimestamp = result.current.searchHistory[0].timestamp;

      // Add same search again
      act(() => {
        result.current.addToSearchHistory(
          'test',
          { city: '', specialty: '', experience: '' },
          2
        );
      });

      expect(result.current.searchHistory).toHaveLength(1);
      expect(result.current.searchHistory[0].resultsCount).toBe(2);
      expect(result.current.searchHistory[0].timestamp).toBeGreaterThan(initialTimestamp);
    });

    it('should clear search history', () => {
      const { result } = renderHook(() => useSearch());

      // Add some history
      act(() => {
        result.current.addToSearchHistory('test1', { city: '', specialty: '', experience: '' }, 1);
        result.current.addToSearchHistory('test2', { city: '', specialty: '', experience: '' }, 2);
      });

      expect(result.current.searchHistory).toHaveLength(2);

      // Clear history
      act(() => {
        result.current.clearSearchHistory();
      });

      expect(result.current.searchHistory).toHaveLength(0);
    });
  });

  describe('Computed Selectors', () => {
    beforeEach(() => {
      act(() => {
        useAppStore.setState({ advocates: mockAdvocates });
      });
    });

    it('should calculate advocate stats correctly', () => {
      const { result } = renderHook(() => useAdvocateStats());

      expect(result.current.totalAdvocates).toBe(3);
      expect(result.current.citiesCount).toBe(3);
      expect(result.current.specialtiesCount).toBe(5); // Corporate, Tax, Family, Immigration, Criminal
      expect(result.current.averageExperience).toBe(10); // (10 + 5 + 15) / 3 = 10
      expect(result.current.experienceDistribution).toEqual({
        '3-5': 1,
        '6-10': 1,
        '11-15': 1
      });
    });

    it('should generate filter options correctly', () => {
      const { result } = renderHook(() => useFilterOptions());

      expect(result.current.cityOptions).toEqual([
        { value: 'chicago', label: 'Chicago' },
        { value: 'los-angeles', label: 'Los Angeles' },
        { value: 'new-york', label: 'New York' }
      ]);

      expect(result.current.specialtyOptions).toHaveLength(5);
      expect(result.current.specialtyOptions).toEqual(
        expect.arrayContaining([
          { value: 'corporate-law', label: 'Corporate Law' },
          { value: 'family-law', label: 'Family Law' }
        ])
      );

      expect(result.current.experienceOptions).toEqual([
        { value: '0-2', label: '0-2 years' },
        { value: '3-5', label: '3-5 years' },
        { value: '6-10', label: '6-10 years' },
        { value: '11-15', label: '11-15 years' },
        { value: '16-20', label: '16-20 years' },
        { value: '20+', label: '20+ years' }
      ]);
    });

    it('should handle empty advocates array in stats', () => {
      act(() => {
        useAppStore.setState({ advocates: [] });
      });

      const { result } = renderHook(() => useAdvocateStats());

      expect(result.current.totalAdvocates).toBe(0);
      expect(result.current.citiesCount).toBe(0);
      expect(result.current.specialtiesCount).toBe(0);
      expect(result.current.averageExperience).toBe(0);
      expect(result.current.experienceDistribution).toEqual({});
    });
  });

  describe('Persistence', () => {
    it('should save search history to localStorage', () => {
      const { result } = renderHook(() => useSearch());

      act(() => {
        result.current.addToSearchHistory(
          'test query',
          { city: '', specialty: '', experience: '' },
          1
        );
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'solace-search-history',
        expect.stringContaining('test query')
      );
    });

    it('should load search history from localStorage on initialization', () => {
      const mockHistory = [
        {
          id: 'test-id',
          query: 'saved query',
          filters: { city: '', specialty: '', experience: '' },
          timestamp: Date.now(),
          resultsCount: 2
        }
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockHistory));

      // Re-import and create new store instance to test initialization
      jest.isolateModules(() => {
        const { useAppStore } = require('./index');
        expect(useAppStore.getState().searchHistory).toEqual(mockHistory);
      });
    });
  });
});