import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './index';

describe('Input Component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders input with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders input with label', () => {
      render(<Input label="Test Label" placeholder="Enter text" />);
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('renders input with helper text', () => {
      render(<Input helperText="This is helper text" placeholder="Enter text" />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('renders input with error message', () => {
      render(<Input error="This is an error" placeholder="Enter text" />);
      expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    it('renders required indicator when required', () => {
      render(<Input label="Required Field" required placeholder="Enter text" />);
      const label = screen.getByText('Required Field');
      expect(label).toHaveClass('required');
    });
  });

  // Size Variants Tests
  describe('Size Variants', () => {
    it('applies small size class', () => {
      render(<Input size="small" placeholder="Small input" />);
      const input = screen.getByPlaceholderText('Small input');
      expect(input).toHaveClass('small');
    });

    it('applies medium size class by default', () => {
      render(<Input placeholder="Medium input" />);
      const input = screen.getByPlaceholderText('Medium input');
      expect(input).toHaveClass('medium');
    });

    it('applies large size class', () => {
      render(<Input size="large" placeholder="Large input" />);
      const input = screen.getByPlaceholderText('Large input');
      expect(input).toHaveClass('large');
    });
  });

  // Style Variants Tests
  describe('Style Variants', () => {
    it('applies outlined variant by default', () => {
      render(<Input placeholder="Outlined input" />);
      const input = screen.getByPlaceholderText('Outlined input');
      expect(input).toHaveClass('outlined');
    });

    it('applies filled variant', () => {
      render(<Input variant="filled" placeholder="Filled input" />);
      const input = screen.getByPlaceholderText('Filled input');
      expect(input).toHaveClass('filled');
    });
  });

  // State Tests
  describe('States', () => {
    it('applies disabled state correctly', () => {
      render(<Input disabled placeholder="Disabled input" />);
      const input = screen.getByPlaceholderText('Disabled input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled');
    });

    it('applies error state correctly', () => {
      render(<Input error="Error message" placeholder="Error input" />);
      const input = screen.getByPlaceholderText('Error input');
      expect(input).toHaveClass('error');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies full width class', () => {
      render(<Input fullWidth placeholder="Full width input" />);
      const input = screen.getByPlaceholderText('Full width input');
      expect(input).toHaveClass('fullWidth');
    });
  });

  // Icon Tests
  describe('Icons', () => {
    it('renders left icon', () => {
      const leftIcon = <span data-testid="left-icon">🔍</span>;
      render(<Input leftIcon={leftIcon} placeholder="With left icon" />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('With left icon')).toHaveClass('hasLeftIcon');
    });

    it('renders right icon', () => {
      const rightIcon = <span data-testid="right-icon">👁️</span>;
      render(<Input rightIcon={rightIcon} placeholder="With right icon" />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('With right icon')).toHaveClass('hasRightIcon');
    });

    it('renders both icons', () => {
      const leftIcon = <span data-testid="left-icon">🔍</span>;
      const rightIcon = <span data-testid="right-icon">👁️</span>;
      render(
        <Input
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          placeholder="With both icons"
        />
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      const input = screen.getByPlaceholderText('With both icons');
      expect(input).toHaveClass('hasLeftIcon');
      expect(input).toHaveClass('hasRightIcon');
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('associates label with input correctly', () => {
      render(<Input label="Test Label" placeholder="Test input" />);
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeInTheDocument();
    });

    it('associates error message with input', () => {
      render(<Input error="Error message" placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      expect(input).toHaveAttribute('aria-describedby');
      expect(screen.getByRole('alert')).toHaveTextContent('Error message');
    });

    it('associates helper text with input', () => {
      render(<Input helperText="Helper message" placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('prioritizes error over helper text for aria-describedby', () => {
      render(
        <Input
          error="Error message"
          helperText="Helper message"
          placeholder="Test input"
        />
      );
      const input = screen.getByPlaceholderText('Test input');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toContain('error');
      expect(describedBy).not.toContain('helper');
    });

    it('sets aria-invalid when error is present', () => {
      render(<Input error="Error message" placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when no error', () => {
      render(<Input placeholder="Test input" />);
      const input = screen.getByPlaceholderText('Test input');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
  });

  // Interaction Tests
  describe('User Interactions', () => {
    it('handles typing correctly', async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Type here" />);
      const input = screen.getByPlaceholderText('Type here');

      await user.type(input, 'Hello World');
      expect(input).toHaveValue('Hello World');
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      render(<Input onChange={handleChange} placeholder="Type here" />);
      const input = screen.getByPlaceholderText('Type here');

      await user.type(input, 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onFocus when input receives focus', async () => {
      const handleFocus = jest.fn();
      const user = userEvent.setup();
      render(<Input onFocus={handleFocus} placeholder="Focus me" />);
      const input = screen.getByPlaceholderText('Focus me');

      await user.click(input);
      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', async () => {
      const handleBlur = jest.fn();
      const user = userEvent.setup();
      render(<Input onBlur={handleBlur} placeholder="Blur me" />);
      const input = screen.getByPlaceholderText('Blur me');

      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('does not respond to interactions when disabled', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      render(<Input disabled onChange={handleChange} placeholder="Disabled input" />);
      const input = screen.getByPlaceholderText('Disabled input');

      await user.type(input, 'text');
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('');
    });
  });

  // Input Types Tests
  describe('Input Types', () => {
    it('renders email input type', () => {
      render(<Input type="email" placeholder="Email input" />);
      const input = screen.getByPlaceholderText('Email input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders password input type', () => {
      render(<Input type="password" placeholder="Password input" />);
      const input = screen.getByPlaceholderText('Password input');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders number input type', () => {
      render(<Input type="number" placeholder="Number input" />);
      const input = screen.getByPlaceholderText('Number input');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('renders search input type', () => {
      render(<Input type="search" placeholder="Search input" />);
      const input = screen.getByPlaceholderText('Search input');
      expect(input).toHaveAttribute('type', 'search');
    });
  });

  // Custom Props Tests
  describe('Custom Props', () => {
    it('forwards custom className', () => {
      render(<Input className="custom-class" placeholder="Custom input" />);
      const input = screen.getByPlaceholderText('Custom input');
      expect(input).toHaveClass('custom-class');
    });

    it('forwards HTML input attributes', () => {
      render(
        <Input
          placeholder="Min max input"
          type="number"
          min={0}
          max={100}
          step={5}
        />
      );
      const input = screen.getByPlaceholderText('Min max input');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
      expect(input).toHaveAttribute('step', '5');
    });

    it('uses provided id', () => {
      render(<Input id="custom-id" placeholder="Custom ID input" />);
      const input = screen.getByPlaceholderText('Custom ID input');
      expect(input).toHaveAttribute('id', 'custom-id');
    });

    it('generates unique id when not provided', () => {
      render(<Input placeholder="Auto ID input" />);
      const input = screen.getByPlaceholderText('Auto ID input');
      expect(input).toHaveAttribute('id');
      expect(input.getAttribute('id')).toMatch(/^input-/);
    });
  });

  // Ref Tests
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="Ref input" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByPlaceholderText('Ref input'));
    });

    it('allows focus through ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="Focus ref input" />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });
});