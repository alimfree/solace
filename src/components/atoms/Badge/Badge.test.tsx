import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Badge from './index';

describe('Badge Component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders badge with text content', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders badge with icon', () => {
      const icon = <span data-testid="test-icon">🔥</span>;
      render(<Badge icon={icon}>With Icon</Badge>);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders removable badge with remove button', () => {
      render(
        <Badge removable onRemove={jest.fn()}>
          Removable
        </Badge>
      );
      expect(screen.getByText('Removable')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
    });
  });

  // Variant Tests
  describe('Variants', () => {
    it('applies primary variant by default', () => {
      render(<Badge>Primary Badge</Badge>);
      const badge = screen.getByText('Primary Badge').closest('.badge');
      expect(badge).toHaveClass('primary');
    });

    it('applies secondary variant', () => {
      render(<Badge variant="secondary">Secondary Badge</Badge>);
      const badge = screen.getByText('Secondary Badge').closest('.badge');
      expect(badge).toHaveClass('secondary');
    });

    it('applies success variant', () => {
      render(<Badge variant="success">Success Badge</Badge>);
      const badge = screen.getByText('Success Badge').closest('.badge');
      expect(badge).toHaveClass('success');
    });

    it('applies warning variant', () => {
      render(<Badge variant="warning">Warning Badge</Badge>);
      const badge = screen.getByText('Warning Badge').closest('.badge');
      expect(badge).toHaveClass('warning');
    });

    it('applies error variant', () => {
      render(<Badge variant="error">Error Badge</Badge>);
      const badge = screen.getByText('Error Badge').closest('.badge');
      expect(badge).toHaveClass('error');
    });

    it('applies info variant', () => {
      render(<Badge variant="info">Info Badge</Badge>);
      const badge = screen.getByText('Info Badge').closest('.badge');
      expect(badge).toHaveClass('info');
    });

    it('applies specialty variant', () => {
      render(<Badge variant="specialty">Specialty Badge</Badge>);
      const badge = screen.getByText('Specialty Badge').closest('.badge');
      expect(badge).toHaveClass('specialty');
    });
  });

  // Size Tests
  describe('Sizes', () => {
    it('applies small size', () => {
      render(<Badge size="small">Small Badge</Badge>);
      const badge = screen.getByText('Small Badge').closest('.badge');
      expect(badge).toHaveClass('small');
    });

    it('applies medium size by default', () => {
      render(<Badge>Medium Badge</Badge>);
      const badge = screen.getByText('Medium Badge').closest('.badge');
      expect(badge).toHaveClass('medium');
    });

    it('applies large size', () => {
      render(<Badge size="large">Large Badge</Badge>);
      const badge = screen.getByText('Large Badge').closest('.badge');
      expect(badge).toHaveClass('large');
    });
  });

  // Shape Tests
  describe('Shapes', () => {
    it('applies rounded shape by default', () => {
      render(<Badge>Rounded Badge</Badge>);
      const badge = screen.getByText('Rounded Badge').closest('.badge');
      expect(badge).toHaveClass('rounded');
    });

    it('applies pill shape', () => {
      render(<Badge shape="pill">Pill Badge</Badge>);
      const badge = screen.getByText('Pill Badge').closest('.badge');
      expect(badge).toHaveClass('pill');
    });
  });

  // Interactive Tests
  describe('Interactions', () => {
    it('renders as button when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick}>Clickable Badge</Badge>);
      const badge = screen.getByRole('button');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('clickable');
    });

    it('renders as span when onClick is not provided', () => {
      render(<Badge>Non-clickable Badge</Badge>);
      const badge = screen.getByText('Non-clickable Badge');
      expect(badge.tagName).toBe('SPAN');
      expect(badge).not.toHaveClass('clickable');
    });

    it('calls onClick when badge is clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(<Badge onClick={handleClick}>Clickable Badge</Badge>);
      const badge = screen.getByRole('button');

      await user.click(badge);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when Enter key is pressed', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(<Badge onClick={handleClick}>Clickable Badge</Badge>);
      const badge = screen.getByRole('button');

      badge.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when Space key is pressed', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(<Badge onClick={handleClick}>Clickable Badge</Badge>);
      const badge = screen.getByRole('button');

      badge.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick for other keys', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(<Badge onClick={handleClick}>Clickable Badge</Badge>);
      const badge = screen.getByRole('button');

      badge.focus();
      await user.keyboard('{Escape}');
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Remove Functionality Tests
  describe('Remove Functionality', () => {
    it('calls onRemove when remove button is clicked', async () => {
      const handleRemove = jest.fn();
      const user = userEvent.setup();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable Badge
        </Badge>
      );
      const removeButton = screen.getByRole('button', { name: 'Remove' });

      await user.click(removeButton);
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when remove button is clicked on clickable badge', async () => {
      const handleClick = jest.fn();
      const handleRemove = jest.fn();
      const user = userEvent.setup();
      render(
        <Badge onClick={handleClick} removable onRemove={handleRemove}>
          Clickable Removable Badge
        </Badge>
      );
      const removeButton = screen.getByRole('button', { name: 'Remove' });

      await user.click(removeButton);
      expect(handleRemove).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not render remove button when removable is false', () => {
      render(<Badge removable={false}>Non-removable Badge</Badge>);
      expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument();
    });

    it('does not render remove button when onRemove is not provided', () => {
      render(<Badge removable>Badge without onRemove</Badge>);
      expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has correct role when clickable', () => {
      render(<Badge onClick={jest.fn()}>Clickable Badge</Badge>);
      const badge = screen.getByRole('button');
      expect(badge).toBeInTheDocument();
    });

    it('has correct tabIndex when clickable', () => {
      render(<Badge onClick={jest.fn()}>Clickable Badge</Badge>);
      const badge = screen.getByRole('button');
      expect(badge).toHaveAttribute('tabIndex', '0');
    });

    it('has correct type attribute when clickable', () => {
      render(<Badge onClick={jest.fn()}>Clickable Badge</Badge>);
      const badge = screen.getByRole('button');
      expect(badge).toHaveAttribute('type', 'button');
    });

    it('does not have role when not clickable', () => {
      render(<Badge>Non-clickable Badge</Badge>);
      const badge = screen.getByText('Non-clickable Badge');
      expect(badge).not.toHaveAttribute('role');
    });

    it('does not have tabIndex when not clickable', () => {
      render(<Badge>Non-clickable Badge</Badge>);
      const badge = screen.getByText('Non-clickable Badge');
      expect(badge).not.toHaveAttribute('tabIndex');
    });

    it('remove button has correct aria-label', () => {
      render(
        <Badge removable onRemove={jest.fn()}>
          Removable Badge
        </Badge>
      );
      const removeButton = screen.getByRole('button', { name: 'Remove' });
      expect(removeButton).toHaveAttribute('aria-label', 'Remove');
    });

    it('remove button is focusable', () => {
      render(
        <Badge removable onRemove={jest.fn()}>
          Removable Badge
        </Badge>
      );
      const removeButton = screen.getByRole('button', { name: 'Remove' });
      expect(removeButton).toHaveAttribute('tabIndex', '0');
    });
  });

  // Custom Props Tests
  describe('Custom Props', () => {
    it('forwards custom className', () => {
      render(<Badge className="custom-class">Custom Badge</Badge>);
      const badge = screen.getByText('Custom Badge').closest('.badge');
      expect(badge).toHaveClass('custom-class');
    });

    it('combines custom className with component classes', () => {
      render(
        <Badge className="custom-class" variant="success" size="large">
          Combined Classes
        </Badge>
      );
      const badge = screen.getByText('Combined Classes').closest('.badge');
      expect(badge).toHaveClass('custom-class');
      expect(badge).toHaveClass('success');
      expect(badge).toHaveClass('large');
    });
  });

  // Content Tests
  describe('Content', () => {
    it('renders text content correctly', () => {
      render(<Badge>Simple Text</Badge>);
      expect(screen.getByText('Simple Text')).toBeInTheDocument();
    });

    it('renders React node content', () => {
      render(
        <Badge>
          <span data-testid="custom-content">Custom Content</span>
        </Badge>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('renders number content', () => {
      render(<Badge>{42}</Badge>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders with icon and text in correct order', () => {
      const icon = <span data-testid="icon">🔥</span>;
      render(<Badge icon={icon}>Text Content</Badge>);

      const iconElement = screen.getByTestId('icon');
      const textElement = screen.getByText('Text Content');

      expect(iconElement).toBeInTheDocument();
      expect(textElement).toBeInTheDocument();

      // Check that icon comes before text in DOM order
      const badge = screen.getByText('Text Content').closest('.badge');
      const iconWrapper = iconElement.parentElement;
      const textWrapper = textElement.parentElement;

      expect(badge).toContainElement(iconWrapper);
      expect(badge).toContainElement(textWrapper);
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles empty content', () => {
      render(<Badge></Badge>);
      const badge = document.querySelector('.badge');
      expect(badge).toBeInTheDocument();
    });

    it('handles null icon', () => {
      render(<Badge icon={null}>With null icon</Badge>);
      expect(screen.getByText('With null icon')).toBeInTheDocument();
    });

    it('handles undefined onRemove with removable true', () => {
      render(<Badge removable>Badge without onRemove</Badge>);
      expect(screen.getByText('Badge without onRemove')).toBeInTheDocument();
    });

    it('handles multiple variants and sizes combined', () => {
      render(
        <Badge variant="error" size="large" shape="pill" removable onRemove={jest.fn()}>
          Complex Badge
        </Badge>
      );
      const badge = screen.getByText('Complex Badge').closest('.badge');
      expect(badge).toHaveClass('error');
      expect(badge).toHaveClass('large');
      expect(badge).toHaveClass('pill');
    });
  });

  // Event Handling Edge Cases
  describe('Event Handling Edge Cases', () => {
    it('handles remove click with stopPropagation', () => {
      const handleClick = jest.fn();
      const handleRemove = jest.fn();

      render(
        <Badge onClick={handleClick} removable onRemove={handleRemove}>
          Test Badge
        </Badge>
      );

      const removeButton = screen.getByRole('button', { name: 'Remove' });

      // Create a mock event to test stopPropagation
      const mockEvent = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn()
      };

      fireEvent.click(removeButton, mockEvent);
      expect(handleRemove).toHaveBeenCalled();
    });
  });
});