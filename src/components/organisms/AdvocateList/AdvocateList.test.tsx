import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdvocateList from './index';
import { Advocate } from '../../../types/advocate';

const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    city: 'New York',
    degree: 'MD',
    specialties: ['Cardiology', 'Internal Medicine'],
    yearsOfExperience: 12,
    phoneNumber: 2125551234
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    city: 'Los Angeles',
    degree: 'PhD',
    specialties: ['Clinical Psychology'],
    yearsOfExperience: 8,
    phoneNumber: 3105551234
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Rodriguez',
    city: 'Chicago',
    degree: 'MSW',
    specialties: ['Social Work'],
    yearsOfExperience: 2,
    phoneNumber: 3125551234
  }
];

describe('AdvocateList Component', () => {
  describe('Basic Rendering', () => {
    it('renders advocate list with advocates', () => {
      render(<AdvocateList advocates={mockAdvocates} />);

      expect(screen.getByText('Dr. Sarah Johnson, MD')).toBeInTheDocument();
      expect(screen.getByText('Michael Chen, PhD')).toBeInTheDocument();
      expect(screen.getByText('Emily Rodriguez, MSW')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <AdvocateList advocates={mockAdvocates} className="custom-list" />
      );

      expect(container.firstChild).toHaveClass('custom-list');
    });

    it('displays correct results summary', () => {
      render(<AdvocateList advocates={mockAdvocates} />);

      expect(screen.getByText('Showing 3 advocates')).toBeInTheDocument();
    });

    it('handles single advocate correctly', () => {
      render(<AdvocateList advocates={[mockAdvocates[0]]} />);

      expect(screen.getByText('Showing 1 advocate')).toBeInTheDocument();
    });
  });

  describe('Layout Variants', () => {
    it('renders in grid layout by default', () => {
      const { container } = render(<AdvocateList advocates={mockAdvocates} />);

      expect(container.firstChild).toHaveClass('grid');
    });

    it('renders in table layout when specified', () => {
      const { container } = render(
        <AdvocateList advocates={mockAdvocates} layout="table" />
      );

      expect(container.firstChild).toHaveClass('table');
    });

    it('renders in list layout when specified', () => {
      const { container } = render(
        <AdvocateList advocates={mockAdvocates} layout="list" />
      );

      expect(container.firstChild).toHaveClass('list');
    });
  });

  describe('Loading States', () => {
    it('shows loading state when loading is true', () => {
      render(<AdvocateList advocates={[]} loading={true} />);

      expect(screen.getByText('Loading advocates...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('does not show loading when advocates exist', () => {
      render(<AdvocateList advocates={mockAdvocates} loading={true} />);

      expect(screen.queryByText('Loading advocates...')).not.toBeInTheDocument();
      expect(screen.getByText('Dr. Sarah Johnson, MD')).toBeInTheDocument();
    });

    it('shows loading more state', () => {
      render(
        <AdvocateList
          advocates={mockAdvocates}
          loadingMore={true}
          showLoadMore={true}
          hasMore={true}
        />
      );

      expect(screen.getByText('Loading more advocates...')).toBeInTheDocument();
    });
  });

  describe('Error States', () => {
    it('shows error state when error exists', () => {
      const errorMessage = 'Failed to load advocates';
      render(<AdvocateList advocates={[]} error={errorMessage} />);

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('renders retry button when error is present', async () => {
      render(<AdvocateList advocates={[]} error="Test error" />);

      const retryButton = screen.getByRole('button', { name: /try again/i });

      // Test that the button exists and is clickable
      expect(retryButton).toBeInTheDocument();
      expect(retryButton).toBeEnabled();
    });
  });

  describe('Empty States', () => {
    it('shows empty state when no advocates', () => {
      render(<AdvocateList advocates={[]} />);

      expect(screen.getAllByText('No advocates found').length).toBeGreaterThan(0);
      expect(screen.getByText('🔍')).toBeInTheDocument();
    });

    it('shows custom empty message', () => {
      const customMessage = 'No matches found for your search';
      render(<AdvocateList advocates={[]} emptyMessage={customMessage} />);

      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  describe('Advocate Interactions', () => {
    it('calls onAdvocateClick when advocate is clicked', async () => {
      const handleAdvocateClick = jest.fn();
      const user = userEvent.setup();

      render(
        <AdvocateList
          advocates={mockAdvocates}
          onAdvocateClick={handleAdvocateClick}
        />
      );

      const advocateCard = screen.getByText('Dr. Sarah Johnson, MD').closest('[role="button"]');
      expect(advocateCard).toBeInTheDocument();

      if (advocateCard) {
        await user.click(advocateCard);
        expect(handleAdvocateClick).toHaveBeenCalledWith(mockAdvocates[0]);
      }
    });

    it('does not render click handlers when onAdvocateClick not provided', () => {
      render(<AdvocateList advocates={mockAdvocates} />);

      const advocateCard = screen.getByText('Dr. Sarah Johnson, MD').closest('[role="button"]');
      expect(advocateCard).not.toBeInTheDocument();
    });
  });

  describe('Load More Functionality', () => {
    it('shows load more button when hasMore is true', () => {
      render(
        <AdvocateList
          advocates={mockAdvocates}
          showLoadMore={true}
          hasMore={true}
        />
      );

      expect(screen.getByText('Load More Advocates')).toBeInTheDocument();
    });

    it('does not show load more button when hasMore is false', () => {
      render(
        <AdvocateList
          advocates={mockAdvocates}
          showLoadMore={true}
          hasMore={false}
        />
      );

      expect(screen.queryByText('Load More Advocates')).not.toBeInTheDocument();
    });

    it('calls onLoadMore when load more button is clicked', async () => {
      const handleLoadMore = jest.fn();
      const user = userEvent.setup();

      render(
        <AdvocateList
          advocates={mockAdvocates}
          showLoadMore={true}
          hasMore={true}
          onLoadMore={handleLoadMore}
        />
      );

      const loadMoreButton = screen.getByText('Load More Advocates');
      await user.click(loadMoreButton);

      expect(handleLoadMore).toHaveBeenCalledTimes(1);
    });

    it('disables load more button when loading more', () => {
      render(
        <AdvocateList
          advocates={mockAdvocates}
          showLoadMore={true}
          hasMore={true}
          loadingMore={true}
        />
      );

      const loadMoreButton = screen.getByRole('button', { name: /loading/i });
      expect(loadMoreButton).toBeDisabled();
    });

    it('shows hasMore indicator in summary', () => {
      render(
        <AdvocateList
          advocates={mockAdvocates}
          hasMore={true}
        />
      );

      expect(screen.getByText('Showing 3 advocates (more available)')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper roles for loading state', () => {
      render(<AdvocateList advocates={[]} loading={true} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has proper button roles for clickable advocates', () => {
      render(
        <AdvocateList
          advocates={mockAdvocates}
          onAdvocateClick={jest.fn()}
        />
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(3); // At least one for each advocate (may have table + card views)
    });

    it('has proper button attributes for load more', () => {
      render(
        <AdvocateList
          advocates={mockAdvocates}
          showLoadMore={true}
          hasMore={true}
        />
      );

      const loadMoreButton = screen.getByRole('button', { name: 'Load More Advocates' });
      expect(loadMoreButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty advocates array gracefully', () => {
      render(<AdvocateList advocates={[]} />);

      expect(screen.getAllByText('No advocates found').length).toBeGreaterThan(0);
    });

    it('handles large number of advocates', () => {
      const manyAdvocates = Array.from({ length: 100 }, (_, i) => ({
        ...mockAdvocates[0],
        id: i + 1,
        firstName: `Advocate ${i + 1}`
      }));

      render(<AdvocateList advocates={manyAdvocates} />);

      expect(screen.getByText('Showing 100 advocates')).toBeInTheDocument();
    });

    it('handles loading and error states together', () => {
      render(<AdvocateList advocates={[]} loading={true} error="Test error" />);

      // Error should take precedence over loading
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.queryByText('Loading advocates...')).not.toBeInTheDocument();
    });
  });
});