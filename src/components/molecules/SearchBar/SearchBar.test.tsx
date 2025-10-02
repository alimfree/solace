import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './index';

describe('SearchBar Component', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnSearch = jest.fn();
  const mockOnReset = jest.fn();

  const defaultProps = {
    searchTerm: '',
    onSearchChange: mockOnSearchChange,
    onSearch: mockOnSearch,
    onReset: mockOnReset
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders search input with default placeholder', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByPlaceholderText(/Search advocates by name, city, or specialty/i)).toBeInTheDocument();
    });

    it('renders search input with custom placeholder', () => {
      render(<SearchBar {...defaultProps} placeholder="Custom placeholder" />);
      expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
    });

    it('renders search button', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('renders reset button', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });

    it('displays search term value', () => {
      render(<SearchBar {...defaultProps} searchTerm="test query" />);
      expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
    });
  });

  // Input Interaction Tests
  describe('Input Interaction', () => {
    it('calls onSearchChange when input value changes', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(/Search advocates/i);
      await user.type(searchInput, 'test');

      expect(mockOnSearchChange).toHaveBeenCalledTimes(4);
      expect(mockOnSearchChange).toHaveBeenNthCalledWith(4, 't');
    });

    it('updates input value when searchTerm prop changes', () => {
      const { rerender } = render(<SearchBar {...defaultProps} searchTerm="initial" />);
      expect(screen.getByDisplayValue('initial')).toBeInTheDocument();

      rerender(<SearchBar {...defaultProps} searchTerm="updated" />);
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
    });
  });

  // Search Functionality Tests
  describe('Search Functionality', () => {
    it('calls onSearch when search button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      expect(mockOnSearch).toHaveBeenCalled();
    });

    it('calls onSearch when form is submitted', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(/Search advocates/i);
      fireEvent.submit(searchInput.closest('form')!);

      expect(mockOnSearch).toHaveBeenCalled();
    });

    it('calls onSearch when Enter key is pressed in search input', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(/Search advocates/i);
      await user.click(searchInput);
      await user.keyboard('{Enter}');

      expect(mockOnSearch).toHaveBeenCalled();
    });

    it('displays loading state correctly', () => {
      render(<SearchBar {...defaultProps} loading={true} />);
      const searchButton = screen.getByRole('button', { name: /search/i });
      expect(searchButton).toBeDisabled();
    });
  });

  // Reset Functionality Tests
  describe('Reset Functionality', () => {
    it('calls onSearchChange and onReset when reset button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} searchTerm="test query" />);

      const resetButton = screen.getByRole('button', { name: /reset/i });
      await user.click(resetButton);

      expect(mockOnSearchChange).toHaveBeenCalledWith('');
      expect(mockOnReset).toHaveBeenCalled();
    });

    it('works when onReset is not provided', async () => {
      const user = userEvent.setup();
      const propsWithoutReset = { ...defaultProps };
      delete (propsWithoutReset as any).onReset;

      render(<SearchBar {...propsWithoutReset} searchTerm="test query" />);

      const resetButton = screen.getByRole('button', { name: /reset/i });
      await user.click(resetButton);

      expect(mockOnSearchChange).toHaveBeenCalledWith('');
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has proper form structure', () => {
      render(<SearchBar {...defaultProps} />);
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('search input is accessible', () => {
      render(<SearchBar {...defaultProps} />);
      const searchInput = screen.getByPlaceholderText(/Search advocates/i);
      expect(searchInput).toBeInTheDocument();
      expect(searchInput.tagName.toLowerCase()).toBe('input');
    });

    it('buttons have proper labels', () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles custom className', () => {
      render(<SearchBar {...defaultProps} className="custom-search-bar" />);
      const container = screen.getByRole('button', { name: /search/i }).closest('.searchBar');
      expect(container).toHaveClass('custom-search-bar');
    });

    it('handles empty searchTerm prop', () => {
      render(<SearchBar {...defaultProps} searchTerm="" />);
      const searchInput = screen.getByPlaceholderText(/Search advocates/i) as HTMLInputElement;
      expect(searchInput.value).toBe('');
    });

    it('prevents form submission when loading', () => {
      render(<SearchBar {...defaultProps} loading={true} />);
      const searchButton = screen.getByRole('button', { name: /search/i });
      expect(searchButton).toBeDisabled();
    });
  });



  // Callback Behavior Tests
  describe('Callback Behavior', () => {
    it('calls onSearch without parameters', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchButton = screen.getByRole('button', { name: /search/i });
      await user.click(searchButton);

      expect(mockOnSearch).toHaveBeenCalledWith();
    });

    it('calls onSearchChange with input value on each keystroke', async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(/Search advocates/i);
      await user.type(searchInput, 'abc');

      expect(mockOnSearchChange).toHaveBeenCalledTimes(3);
      expect(mockOnSearchChange).toHaveBeenNthCalledWith(1, 'a');
      expect(mockOnSearchChange).toHaveBeenNthCalledWith(2, 'b');
      expect(mockOnSearchChange).toHaveBeenNthCalledWith(3, 'c');
    });
  });
});