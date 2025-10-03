import type { Meta, StoryObj } from '@storybook/react';
import Input from './index';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with multiple variants, sizes, and states. Supports icons, validation, and accessibility features.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the input'
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled'],
      description: 'The visual style variant'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the input takes full width'
    },
    label: {
      control: { type: 'text' },
      description: 'The input label'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'The placeholder text'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the input'
    },
    error: {
      control: { type: 'text' },
      description: 'Error message displayed below the input'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    placeholder: 'Enter text...'
  }
};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name'
  }
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
    type: 'email'
  }
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    helperText: 'Must be at least 8 characters long'
  }
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: 'Please enter a valid email address'
  }
};

// Size Variants
export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'small'
  }
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size (default)',
    size: 'medium'
  }
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'large'
  }
};

// Style Variants
export const Outlined: Story = {
  args: {
    label: 'Outlined Input',
    placeholder: 'Outlined variant (default)',
    variant: 'outlined'
  }
};

export const Filled: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'Filled variant',
    variant: 'filled'
  }
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search advocates...',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    )
  }
};

export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    rightIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
};

export const WithBothIcons: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    type: 'number',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    rightIcon: (
      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>USD</span>
    )
  }
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 'Cannot edit this text'
  }
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes full width',
    fullWidth: true
  },
  parameters: {
    layout: 'padded'
  }
};

// Input Types
export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'user@example.com',
    type: 'email'
  }
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password'
  }
};

export const NumberInput: Story = {
  args: {
    label: 'Years of Experience',
    placeholder: '0',
    type: 'number',
    min: 0,
    max: 50
  }
};

export const TelInput: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    type: 'tel'
  }
};

export const SearchInput: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for advocates, specialties, or cities',
    type: 'search',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    )
  }
};

// Complex Examples
export const CompleteForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input
        label="First Name"
        placeholder="Enter your first name"
        required
      />
      <Input
        label="Last Name"
        placeholder="Enter your last name"
        required
      />
      <Input
        label="Email Address"
        placeholder="user@example.com"
        type="email"
        required
        helperText="We'll never share your email"
      />
      <Input
        label="Phone Number"
        placeholder="+1 (555) 123-4567"
        type="tel"
      />
      <Input
        label="Years of Experience"
        placeholder="0"
        type="number"
        min={0}
        max={50}
        helperText="Enter total years of professional experience"
      />
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
};

export const ErrorStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input
        label="Email Address"
        placeholder="Enter your email"
        value="invalid-email"
        error="Please enter a valid email address"
        type="email"
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        value="123"
        error="Password must be at least 8 characters long"
        type="password"
      />
      <Input
        label="Phone Number"
        placeholder="Enter your phone"
        value="invalid"
        error="Please enter a valid phone number"
        type="tel"
      />
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
};