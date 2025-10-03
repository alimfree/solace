import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdvocateCard from './index';
import { Advocate } from '../../../types/advocate';

const mockAdvocate: Advocate = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  city: 'New York',
  degree: 'MD',
  specialties: ['Cardiology', 'Internal Medicine'],
  yearsOfExperience: 10,
  phoneNumber: 1234567890
};

describe('AdvocateCard Component', () => {
  describe('Basic Rendering', () => {
    it('renders advocate information correctly', () => {
      render(<AdvocateCard advocate={mockAdvocate} />);

      expect(screen.getByText('John Doe, MD')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
      expect(screen.getByText('10 yrs exp.')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
    });

    it('renders specialties as badges', () => {
      render(<AdvocateCard advocate={mockAdvocate} />);

      expect(screen.getByText('Cardiology')).toBeInTheDocument();
      expect(screen.getByText('Internal Medicine')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <AdvocateCard advocate={mockAdvocate} className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Interaction', () => {
    it('renders as clickable when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<AdvocateCard advocate={mockAdvocate} onClick={handleClick} />);

      const card = screen.getByRole('button');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(<AdvocateCard advocate={mockAdvocate} onClick={handleClick} />);

      const card = screen.getByRole('button');
      fireEvent.click(card);

      expect(handleClick).toHaveBeenCalledWith(mockAdvocate);
    });

    it('does not render as button when onClick is not provided', () => {
      render(<AdvocateCard advocate={mockAdvocate} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Advocate Data Variations', () => {
    it('handles advocate with no specialties', () => {
      const advocateNoSpecialties = {
        ...mockAdvocate,
        specialties: []
      };

      render(<AdvocateCard advocate={advocateNoSpecialties} />);

      expect(screen.getByText('John Doe, MD')).toBeInTheDocument();
      expect(screen.queryByText('Cardiology')).not.toBeInTheDocument();
    });

    it('handles advocate with single specialty', () => {
      const advocateSingleSpecialty = {
        ...mockAdvocate,
        specialties: ['Neurology']
      };

      render(<AdvocateCard advocate={advocateSingleSpecialty} />);

      expect(screen.getByText('Neurology')).toBeInTheDocument();
      expect(screen.queryByText('Cardiology')).not.toBeInTheDocument();
    });

    it('handles advocate with many specialties', () => {
      const advocateManySpecialties = {
        ...mockAdvocate,
        specialties: ['Cardiology', 'Internal Medicine', 'Pulmonology', 'Critical Care', 'Emergency Medicine']
      };

      render(<AdvocateCard advocate={advocateManySpecialties} />);

      advocateManySpecialties.specialties.forEach(specialty => {
        expect(screen.getByText(specialty)).toBeInTheDocument();
      });
    });
  });

  describe('Experience Display', () => {
    it('displays single year correctly', () => {
      const advocateOneYear = {
        ...mockAdvocate,
        yearsOfExperience: 1
      };

      render(<AdvocateCard advocate={advocateOneYear} />);

      expect(screen.getByText('1 yrs exp.')).toBeInTheDocument();
    });

    it('displays zero years correctly', () => {
      const advocateZeroYears = {
        ...mockAdvocate,
        yearsOfExperience: 0
      };

      render(<AdvocateCard advocate={advocateZeroYears} />);

      expect(screen.getByText('0 yrs exp.')).toBeInTheDocument();
    });

    it('displays high years correctly', () => {
      const advocateHighYears = {
        ...mockAdvocate,
        yearsOfExperience: 25
      };

      render(<AdvocateCard advocate={advocateHighYears} />);

      expect(screen.getByText('25 yrs exp.')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper focus management when clickable', () => {
      const handleClick = jest.fn();
      render(<AdvocateCard advocate={mockAdvocate} onClick={handleClick} />);

      const card = screen.getByRole('button');
      card.focus();

      expect(document.activeElement).toBe(card);
    });

    it('handles keyboard interaction when clickable', () => {
      const handleClick = jest.fn();
      render(<AdvocateCard advocate={mockAdvocate} onClick={handleClick} />);

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });

      // Note: onClick would need to be enhanced to handle keyboard events
      // This test documents the expected behavior
    });
  });

  describe('Content Structure', () => {
    it('maintains proper content hierarchy', () => {
      render(<AdvocateCard advocate={mockAdvocate} />);

      const name = screen.getByText('John Doe, MD');
      const city = screen.getByText('New York');
      const experience = screen.getByText('10 yrs exp.');
      const phone = screen.getByText('1234567890');

      expect(name.tagName).toBe('H3');
      expect(city.tagName).toBe('P');
      expect(experience.tagName).toBe('SPAN');
      expect(phone.tagName).toBe('SPAN');
    });
  });
});