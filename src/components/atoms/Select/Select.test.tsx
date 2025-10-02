import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select, { SelectOption } from './index';

describe('Select Component', () => {
  const mockOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const mockOptionsWithDisabled: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' }
  ];

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders select with options', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();

      mockOptions.forEach(option => {
        expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
      });
    });

    it('renders select with label', () => {
      render(<Select label="Test Label" options={mockOptions} />);
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('renders select with placeholder', () => {
      render(<Select placeholder="Choose option" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select.querySelector('option[value=""]')).toHaveTextContent('Choose option');
    });

    it('renders select with helper text', () => {
      render(<Select helperText="This is helper text" options={mockOptions} />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('renders select with error message', () => {
      render(<Select error="This is an error" options={mockOptions} />);
      expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    it('renders required indicator when required', () => {
      render(<Select label="Required Field" required options={mockOptions} />);
      const label = screen.getByText('Required Field');
      expect(label).toHaveClass('required');
    });
  });

  // Size Variants Tests
  describe('Size Variants', () => {
    it('applies small size class', () => {
      render(<Select size="small" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('small');
    });

    it('applies medium size class by default', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('medium');
    });

    it('applies large size class', () => {
      render(<Select size="large" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('large');
    });
  });

  // Style Variants Tests
  describe('Style Variants', () => {
    it('applies outlined variant by default', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('outlined');
    });

    it('applies filled variant', () => {
      render(<Select variant="filled" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('filled');
    });
  });

  // State Tests
  describe('States', () => {
    it('applies disabled state correctly', () => {
      render(<Select disabled options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeDisabled();
      expect(select).toHaveClass('disabled');
    });

    it('applies error state correctly', () => {
      render(<Select error="Error message" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('error');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies full width class', () => {
      render(<Select fullWidth options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('fullWidth');
    });
  });

  // Options Tests
  describe('Options', () => {
    it('renders all provided options', () => {
      render(<Select options={mockOptions} />);

      mockOptions.forEach(option => {
        const optionElement = screen.getByRole('option', { name: option.label });
        expect(optionElement).toBeInTheDocument();
        expect(optionElement).toHaveValue(option.value);
      });
    });

    it('renders disabled options correctly', () => {
      render(<Select options={mockOptionsWithDisabled} />);

      const disabledOption = screen.getByRole('option', { name: 'Option 2' });
      expect(disabledOption).toBeDisabled();

      const enabledOption = screen.getByRole('option', { name: 'Option 1' });
      expect(enabledOption).not.toBeDisabled();
    });

    it('renders placeholder as hidden disabled option', () => {
      render(<Select placeholder="Choose option" options={mockOptions} />);

      const select = screen.getByRole('combobox');
      const placeholderOption = select.querySelector('option[value=""]');
      expect(placeholderOption).toBeDisabled();
      expect(placeholderOption).toHaveValue('');
      expect(placeholderOption).toHaveTextContent('Choose option');
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('associates label with select correctly', () => {
      render(<Select label="Test Label" options={mockOptions} />);
      const select = screen.getByLabelText('Test Label');
      expect(select).toBeInTheDocument();
    });

    it('associates error message with select', () => {
      render(<Select error="Error message" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby');
      expect(screen.getByRole('alert')).toHaveTextContent('Error message');
    });

    it('associates helper text with select', () => {
      render(<Select helperText="Helper message" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby');
    });

    it('prioritizes error over helper text for aria-describedby', () => {
      render(
        <Select
          error="Error message"
          helperText="Helper message"
          options={mockOptions}
        />
      );
      const select = screen.getByRole('combobox');
      const describedBy = select.getAttribute('aria-describedby');
      expect(describedBy).toContain('error');
      expect(describedBy).not.toContain('helper');
    });

    it('sets aria-invalid when error is present', () => {
      render(<Select error="Error message" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid when no error', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-invalid', 'false');
    });
  });

  // Interaction Tests
  describe('User Interactions', () => {
    it('allows selection of options', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, 'option2');
      expect(select).toHaveValue('option2');
    });

    it('calls onChange when selection changes', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      render(<Select onChange={handleChange} options={mockOptions} />);
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, 'option1');
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onFocus when select receives focus', async () => {
      const handleFocus = jest.fn();
      const user = userEvent.setup();
      render(<Select onFocus={handleFocus} options={mockOptions} />);
      const select = screen.getByRole('combobox');

      await user.click(select);
      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur when select loses focus', async () => {
      const handleBlur = jest.fn();
      const user = userEvent.setup();
      render(<Select onBlur={handleBlur} options={mockOptions} />);
      const select = screen.getByRole('combobox');

      await user.click(select);
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('does not respond to interactions when disabled', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      render(<Select disabled onChange={handleChange} options={mockOptions} />);
      const select = screen.getByRole('combobox');

      await user.selectOptions(select, 'option1');
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('prevents selection of disabled options', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptionsWithDisabled} />);
      const select = screen.getByRole('combobox');

      // Try to select disabled option
      await user.selectOptions(select, 'option2');
      expect(select).not.toHaveValue('option2');
    });
  });

  // Custom Props Tests
  describe('Custom Props', () => {
    it('forwards custom className', () => {
      render(<Select className="custom-class" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('custom-class');
    });

    it('forwards HTML select attributes', () => {
      render(
        <Select
          multiple
          size={3}
          name="test-select"
          options={mockOptions}
        />
      );
      const select = screen.getByRole('listbox'); // multiple selects have role listbox
      expect(select).toHaveAttribute('multiple');
      expect(select).toHaveAttribute('name', 'test-select');
    });

    it('uses provided id', () => {
      render(<Select id="custom-id" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('id', 'custom-id');
    });

    it('generates unique id when not provided', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('id');
      expect(select.getAttribute('id')).toMatch(/^select-/);
    });

    it('uses default value when provided', () => {
      render(<Select defaultValue="option2" options={mockOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveValue('option2');
    });
  });

  // Ref Tests
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={mockOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
      expect(ref.current).toBe(screen.getByRole('combobox'));
    });

    it('allows focus through ref', () => {
      const ref = React.createRef<HTMLSelectElement>();
      render(<Select ref={ref} options={mockOptions} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      render(<Select options={[]} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('handles options with empty values', () => {
      const optionsWithEmpty = [
        { value: '', label: 'Empty Value' },
        { value: 'valid', label: 'Valid Value' }
      ];
      render(<Select options={optionsWithEmpty} />);

      expect(screen.getByRole('option', { name: 'Empty Value' })).toHaveValue('');
      expect(screen.getByRole('option', { name: 'Valid Value' })).toHaveValue('valid');
    });

    it('handles long option labels gracefully', () => {
      const longOptions = [
        { value: 'short', label: 'Short' },
        { value: 'long', label: 'This is a very long option label that might cause layout issues' }
      ];
      render(<Select options={longOptions} />);

      expect(screen.getByRole('option', { name: /This is a very long/ })).toBeInTheDocument();
    });

    it('handles special characters in option values and labels', () => {
      const specialOptions = [
        { value: 'special-chars!@#$%^&*()', label: 'Special: !@#$%^&*()' },
        { value: 'unicode-🚀', label: 'Unicode: 🚀 Rocket' }
      ];
      render(<Select options={specialOptions} />);

      expect(screen.getByRole('option', { name: 'Special: !@#$%^&*()' }))
        .toHaveValue('special-chars!@#$%^&*()');
      expect(screen.getByRole('option', { name: 'Unicode: 🚀 Rocket' }))
        .toHaveValue('unicode-🚀');
    });
  });
});