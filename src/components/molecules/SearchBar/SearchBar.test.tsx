import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar, { SearchFilters } from './index';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnClear = jest.fn();

  const defaultProps = {
    onSearch: mockOnSearch,
    onClear: mockOnClear,
    cityOptions: [
      { value: 'new-york', label: 'New York' },
      { value: 'los-angeles', label: 'Los Angeles' },
      { value: 'chicago', label: 'Chicago' }
    ],
    specialtyOptions: [
      { value: 'civil', label: 'Civil Law' },
      { value: 'criminal', label: 'Criminal Law' },
      { value: 'corporate', label: 'Corporate Law' }
    ],
    experienceOptions: [
      { value: '0-2', label: '0-2 years' },
      { value: '3-5', label: '3-5 years' },
      { value: '6-10', label: '6-10 years' }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders search input with default placeholder', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByPlaceholderText(/Search advocates by name, specialty, or location/i)).toBeInTheDocument();
    });

    it('renders search input with custom placeholder', () => {
      render(<SearchBar {...defaultProps} placeholder="Custom placeholder" />);
      expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
    });

    it('renders filter toggle button when showAdvancedFilters is true', () => {
      render(<SearchBar {...defaultProps} showAdvancedFilters={true} />);
      expect(screen.getByRole('button', { name: /filters/i })).toBeInTheDocument();
    });

    it('does not render filter toggle when showAdvancedFilters is false', () => {
      render(<SearchBar {...defaultProps} showAdvancedFilters={false} />);
      expect(screen.queryByRole('button', { name: /filters/i })).not.toBeInTheDocument();
    });

    it('renders search button', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });
  });

  // Initial Filters Tests
  describe('Initial Filters', () => {
    it('renders with initial query value', () => {
      render(
        <SearchBar
          {...defaultProps}
          initialFilters={{ query: 'John Doe' }}
        />
      );
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    });

    it('renders with initial filter values and shows active filters', async () => {
      render(
        <SearchBar
          {...defaultProps}
          initialFilters={{
            city: 'new-york',
            specialty: 'corporate'
          }}
        />
      );

      expect(screen.getByText(/City: New York/)).toBeInTheDocument();
      expect(screen.getByText(/Specialty: Corporate Law/)).toBeInTheDocument();
    });

    it('shows clear button when initial filters are provided', () => {
      render(
        <SearchBar
          {...defaultProps}
          initialFilters={{ query: 'test' }}
        />
      );
      expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
    });
  });

  // Search Functionality Tests
  describe('Search Functionality', () => {
    it('calls onSearch when search button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(/Search advocates/i);
      const searchButton = screen.getByRole('button', { name: /search/i });

      await user.type(searchInput, 'test query');
      await user.click(searchButton);

      expect(mockOnSearch).toHaveBeenCalledWith({
        query: 'test query',
        city: '',
        specialty: '',
        experience: ''
      });
    });

    it('calls onSearch when form is submitted', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(/Search advocates/i);

      await user.type(searchInput, 'test query');
      fireEvent.submit(searchInput.closest('form')!);

      expect(mockOnSearch).toHaveBeenCalledWith({
        query: 'test query',
        city: '',
        specialty: '',
        experience: ''
      });
    });

    it('calls onSearch when Enter key is pressed in search input', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(/Search advocates/i);

      await user.type(searchInput, 'test query');
      await user.keyboard('{Enter}');

      expect(mockOnSearch).toHaveBeenCalledWith({
        query: 'test query',
        city: '',
        specialty: '',
        experience: ''
      });
    });

    it('displays loading state correctly', () => {
      render(<SearchBar {...defaultProps} loading={true} />);
      const searchButton = screen.getByRole('button', { name: /search/i });
      expect(searchButton).toBeDisabled();
    });
  });

  // Advanced Filters Tests
  describe('Advanced Filters', () => {
    it('toggles filter section when filter button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const filterToggle = screen.getByRole('button', { name: /filters/i });
      await user.click(filterToggle);

      expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/legal specialty/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/experience level/i)).toBeInTheDocument();

      // Test hiding filters
      await user.click(filterToggle);

      await waitFor(() => {
        expect(screen.queryByLabelText(/city/i)).not.toBeInTheDocument();
      });
    });

    it('updates filters when select values change', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      // Show filters
      const filterToggle = screen.getByRole('button', { name: /filters/i });
      await user.click(filterToggle);

      // Select city
      const citySelect = screen.getByLabelText(/city/i);
      await user.selectOptions(citySelect, 'new-york');

      // Search
      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      expect(mockOnSearch).toHaveBeenCalledWith({
        query: '',
        city: 'new-york',
        specialty: '',
        experience: ''
      });
    });

    it('updates filter state when select values change', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      // Show filters
      const filterToggle = screen.getByRole('button', { name: /filters/i });
      await user.click(filterToggle);

      // Change specialty
      const specialtySelect = screen.getByLabelText(/legal specialty/i);
      await user.selectOptions(specialtySelect, 'corporate');

      // Search to trigger onSearch with updated filters
      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      expect(mockOnSearch).toHaveBeenCalledWith({
        query: '',
        city: '',
        specialty: 'corporate',
        experience: ''
      });
    });
  });

  // Active Filters Tests
  describe('Active Filters', () => {
    it('displays active filter badges', () => {
      render(
        <SearchBar
          {...defaultProps}
          initialFilters={{
            city: 'new-york',
            specialty: 'corporate',
            experience: '6-10'
          }}
        />
      );

      expect(screen.getByText(/City: New York/)).toBeInTheDocument();
      expect(screen.getByText(/Specialty: Corporate Law/)).toBeInTheDocument();
      expect(screen.getByText(/Experience: 6-10 years/)).toBeInTheDocument();
    });

    it('removes filter when badge remove button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <SearchBar
          {...defaultProps}
          initialFilters={{ city: 'new-york' }}
        />
      );

      const cityBadge = screen.getByText(/City: New York/);
      const removeButton = cityBadge.parentElement?.querySelector('button[aria-label="Remove"]');

      expect(removeButton).toBeInTheDocument();
      await user.click(removeButton!);

      expect(mockOnSearch).toHaveBeenCalledWith({
        query: '',
        city: '',
        specialty: '',
        experience: ''
      });
    });

    it('shows active filters label when filters are present', () => {
      render(
        <SearchBar
          {...defaultProps}
          initialFilters={{ city: 'new-york' }}
        />
      );

      expect(screen.getByText(/active filters:/i)).toBeInTheDocument();
    });

    it('does not show active filters section when no filters are active', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.queryByText(/active filters:/i)).not.toBeInTheDocument();
    });
  });

  // Clear Functionality Tests
  describe('Clear Functionality', () => {
    it('shows clear button when there are active filters', () => {
      render(
        <SearchBar
          {...defaultProps}
          initialFilters={{ query: 'test' }}
        />
      );

      expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
    });

    it('does not show clear button when no filters are active', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.queryByRole('button', { name: /clear all/i })).not.toBeInTheDocument();
    });

    it('clears all filters when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <SearchBar
          {...defaultProps}
          initialFilters={{
            query: 'test query',
            city: 'new-york',
            specialty: 'corporate'
          }}
        />
      );

      const clearButton = screen.getByRole('button', { name: /clear all/i });
      await user.click(clearButton);

      expect(mockOnClear).toHaveBeenCalled();
      expect(mockOnSearch).toHaveBeenCalledWith({
        query: '',
        city: '',
        specialty: '',
        experience: ''
      });
    });

    it('clears search input value when clear is called', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(/Search advocates/i) as HTMLInputElement;
      await user.type(searchInput, 'test query');

      expect(searchInput.value).toBe('test query');

      // Add a filter to show clear button
      const filterToggle = screen.getByRole('button', { name: /filters/i });
      await user.click(filterToggle);

      const citySelect = screen.getByLabelText(/city/i);
      await user.selectOptions(citySelect, 'new-york');

      const clearButton = screen.getByRole('button', { name: /clear all/i });
      await user.click(clearButton);

      expect(searchInput.value).toBe('');
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has proper form structure', () => {
      render(<SearchBar {...defaultProps} />);
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('has proper labels for all inputs', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const filterToggle = screen.getByRole('button', { name: /filters/i });
      await user.click(filterToggle);

      expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/legal specialty/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/experience level/i)).toBeInTheDocument();
    });

    it('has accessible filter toggle button', () => {
      render(<SearchBar {...defaultProps} />);
      const filterToggle = screen.getByRole('button', { name: /filters/i });
      expect(filterToggle).toBeInTheDocument();
      expect(filterToggle).toHaveTextContent('Filters');
    });

    it('toggles filter visibility correctly', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const filterToggle = screen.getByRole('button', { name: /filters/i });

      // Initially filters should not be visible
      expect(screen.queryByLabelText(/city/i)).not.toBeInTheDocument();

      // Click to show filters
      await user.click(filterToggle);
      expect(screen.getByLabelText(/city/i)).toBeInTheDocument();

      // Click to hide filters
      await user.click(filterToggle);
      await waitFor(() => {
        expect(screen.queryByLabelText(/city/i)).not.toBeInTheDocument();
      });
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles empty options arrays', () => {
      render(
        <SearchBar
          {...defaultProps}
          cityOptions={[]}
          specialtyOptions={[]}
          experienceOptions={[]}
        />
      );

      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('handles missing onClear callback', async () => {
      const user = userEvent.setup();
      const propsWithoutOnClear = { ...defaultProps };
      delete (propsWithoutOnClear as any).onClear;

      render(
        <SearchBar
          {...propsWithoutOnClear}
          initialFilters={{ query: 'test' }}
        />
      );

      const clearButton = screen.getByRole('button', { name: /clear all/i });
      await user.click(clearButton);

      // Should not throw error and should still call onSearch
      expect(mockOnSearch).toHaveBeenCalled();
    });

    it('handles filter options without matching initial values', () => {
      render(
        <SearchBar
          {...defaultProps}
          initialFilters={{
            city: 'nonexistent-city',
            specialty: 'nonexistent-specialty'
          }}
        />
      );

      // Should display the raw values when labels are not found
      expect(screen.getByText(/City: nonexistent-city/)).toBeInTheDocument();
      expect(screen.getByText(/Specialty: nonexistent-specialty/)).toBeInTheDocument();
    });

    it('handles custom className', () => {
      render(<SearchBar {...defaultProps} className="custom-search-bar" />);
      const container = screen.getByRole('button', { name: /search/i }).closest('.searchBar');
      expect(container).toHaveClass('custom-search-bar');
    });
  });

  // Callback Tests
  describe('Callback Behavior', () => {
    it('calls onSearch with correct filter object structure', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      expect(mockOnSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.any(String),
          city: expect.any(String),
          specialty: expect.any(String),
          experience: expect.any(String)
        })
      );
    });

    it('allows multiple filter changes before search', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const filterToggle = screen.getByRole('button', { name: /filters/i });
      await user.click(filterToggle);

      const citySelect = screen.getByLabelText(/city/i);
      const specialtySelect = screen.getByLabelText(/legal specialty/i);

      // Change multiple filters
      await user.selectOptions(citySelect, 'new-york');
      await user.selectOptions(specialtySelect, 'corporate');

      // Search should not be called until user clicks search
      expect(mockOnSearch).toHaveBeenCalledTimes(0);

      // Now search
      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      expect(mockOnSearch).toHaveBeenCalledWith({
        query: '',
        city: 'new-york',
        specialty: 'corporate',
        experience: ''
      });
    });
  });
});