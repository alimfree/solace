import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterPanel from './index';
import { AdvocateFilters } from '../../../types/advocate';

const mockFilters: AdvocateFilters = {
  specialty: undefined,
  city: undefined,
  degree: undefined,
  experienceRange: undefined
};

const mockFiltersWithValues: AdvocateFilters = {
  specialty: 'Cardiology',
  city: 'New York',
  degree: 'MD',
  experienceRange: '6-10'
};

describe('FilterPanel Component', () => {
  describe('Basic Rendering', () => {
    it('renders the filter panel with title', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
    });

    it('renders all filter groups with labels', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.getByLabelText('Specialty')).toBeInTheDocument();
      expect(screen.getByLabelText('City')).toBeInTheDocument();
      expect(screen.getByLabelText('Degree')).toBeInTheDocument();
      expect(screen.getByLabelText('Experience')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      const { container } = render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
          className="custom-class"
        />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Clear Button Behavior', () => {
    it('does not show clear button when no filters are active', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
    });

    it('shows clear button when filters are active', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFiltersWithValues}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.getByText('Clear All')).toBeInTheDocument();
    });

    it('calls onClearFilters when clear button is clicked', async () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();
      const user = userEvent.setup();

      render(
        <FilterPanel
          filters={mockFiltersWithValues}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      const clearButton = screen.getByText('Clear All');
      await user.click(clearButton);

      expect(mockOnClearFilters).toHaveBeenCalledTimes(1);
    });
  });

  describe('Filter Interactions', () => {
    it('calls onFiltersChange when specialty filter changes', async () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();
      const user = userEvent.setup();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      const specialtySelect = screen.getByLabelText('Specialty');
      await user.selectOptions(specialtySelect, 'Cardiology');

      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockFilters,
        specialty: 'Cardiology'
      });
    });

    it('calls onFiltersChange when city filter changes', async () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();
      const user = userEvent.setup();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      const citySelect = screen.getByLabelText('City');
      await user.selectOptions(citySelect, 'New York');

      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockFilters,
        city: 'New York'
      });
    });

    it('calls onFiltersChange when degree filter changes', async () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();
      const user = userEvent.setup();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      const degreeSelect = screen.getByLabelText('Degree');
      await user.selectOptions(degreeSelect, 'MD');

      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockFilters,
        degree: 'MD'
      });
    });

    it('calls onFiltersChange when experience filter changes', async () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();
      const user = userEvent.setup();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      const experienceSelect = screen.getByLabelText('Experience');
      await user.selectOptions(experienceSelect, '6-10');

      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockFilters,
        experienceRange: '6-10'
      });
    });
  });

  describe('Filter Values Display', () => {
    it('displays current filter values correctly', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFiltersWithValues}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      const specialtySelect = screen.getByLabelText('Specialty') as HTMLSelectElement;
      const citySelect = screen.getByLabelText('City') as HTMLSelectElement;
      const degreeSelect = screen.getByLabelText('Degree') as HTMLSelectElement;
      const experienceSelect = screen.getByLabelText('Experience') as HTMLSelectElement;

      expect(specialtySelect.value).toBe('Cardiology');
      expect(citySelect.value).toBe('New York');
      expect(degreeSelect.value).toBe('MD');
      expect(experienceSelect.value).toBe('6-10');
    });

    it('handles clearing individual filters', async () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();
      const user = userEvent.setup();

      render(
        <FilterPanel
          filters={mockFiltersWithValues}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      const specialtySelect = screen.getByLabelText('Specialty');
      fireEvent.change(specialtySelect, { target: { value: '' } });

      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockFiltersWithValues,
        specialty: undefined
      });
    });
  });

  describe('Filter Options', () => {
    it('includes all specialty options', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.getByRole('option', { name: 'Cardiology' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Internal Medicine' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Neurology' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Clinical Psychology' })).toBeInTheDocument();
    });

    it('includes all city options', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.getByRole('option', { name: 'New York' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Los Angeles' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Chicago' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Houston' })).toBeInTheDocument();
    });

    it('includes all degree options', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.getByRole('option', { name: 'MD' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'PhD' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'JD' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'MSW' })).toBeInTheDocument();
    });

    it('includes all experience range options', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.getByRole('option', { name: '0-2 years' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: '3-5 years' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: '6-10 years' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: '20+ years' })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper labels for all form controls', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.getByLabelText('Specialty')).toBeInTheDocument();
      expect(screen.getByLabelText('City')).toBeInTheDocument();
      expect(screen.getByLabelText('Degree')).toBeInTheDocument();
      expect(screen.getByLabelText('Experience')).toBeInTheDocument();
    });

    it('has correct form structure with proper labels', () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={mockFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      const specialtySelect = screen.getByLabelText('Specialty');
      expect(specialtySelect.tagName).toBe('SELECT');
    });
  });

  describe('Edge Cases', () => {
    it('handles partial filter state', () => {
      const partialFilters: AdvocateFilters = {
        specialty: 'Cardiology',
        city: undefined,
        degree: undefined,
        experienceRange: undefined
      };

      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();

      render(
        <FilterPanel
          filters={partialFilters}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      expect(screen.getByText('Clear All')).toBeInTheDocument();
      const specialtySelect = screen.getByLabelText('Specialty') as HTMLSelectElement;
      expect(specialtySelect.value).toBe('Cardiology');
    });

    it('handles empty string values as undefined', async () => {
      const mockOnFiltersChange = jest.fn();
      const mockOnClearFilters = jest.fn();
      const user = userEvent.setup();

      render(
        <FilterPanel
          filters={mockFiltersWithValues}
          onFiltersChange={mockOnFiltersChange}
          onClearFilters={mockOnClearFilters}
        />
      );

      const specialtySelect = screen.getByLabelText('Specialty');
      fireEvent.change(specialtySelect, { target: { value: '' } });

      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        ...mockFiltersWithValues,
        specialty: undefined
      });
    });
  });
});