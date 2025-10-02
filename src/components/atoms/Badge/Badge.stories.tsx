import type { Meta, StoryObj } from '@storybook/react';
import Badge from './index';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile badge component for displaying status, categories, tags, and other metadata. Supports multiple variants, sizes, and interactive features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'The color variant of the badge'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the badge'
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'pill'],
      description: 'The shape of the badge corners'
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Whether the badge can be removed'
    },
    children: {
      control: { type: 'text' },
      description: 'The badge content'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    children: 'Default Badge'
  }
};

export const WithText: Story = {
  args: {
    children: 'Civil Law'
  }
};

export const WithIcon: Story = {
  args: {
    children: 'Verified',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20,6 9,17 4,12" />
      </svg>
    )
  }
};

// Variant Stories
export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success'
  }
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning'
  }
};

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error'
  }
};

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info'
  }
};

// Size Variants
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'small'
  }
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'medium'
  }
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'large'
  }
};

// Shape Variants
export const Rounded: Story = {
  args: {
    children: 'Rounded',
    shape: 'rounded'
  }
};

export const Pill: Story = {
  args: {
    children: 'Pill Shape',
    shape: 'pill'
  }
};

// Interactive Features
export const Clickable: Story = {
  args: {
    children: 'Clickable Badge',
    onClick: () => alert('Badge clicked!')
  }
};

export const Removable: Story = {
  args: {
    children: 'Removable',
    removable: true,
    onRemove: () => alert('Badge removed!')
  }
};

export const RemovableWithIcon: Story = {
  args: {
    children: 'Tagged',
    removable: true,
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    onRemove: () => alert('Tag removed!')
  }
};

// Legal Specialty Examples
export const LegalSpecialties: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Badge variant="primary">Civil Law</Badge>
      <Badge variant="info">Criminal Law</Badge>
      <Badge variant="success">Corporate Law</Badge>
      <Badge variant="warning">Family Law</Badge>
      <Badge variant="secondary">Immigration</Badge>
      <Badge variant="error">Personal Injury</Badge>
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
};

export const AdvocateStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
      <Badge variant="success" icon={
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="16,12 12,8 8,12" />
        </svg>
      }>
        Available
      </Badge>
      <Badge variant="warning" icon={
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      }>
        Busy
      </Badge>
      <Badge variant="error" icon={
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      }>
        Unavailable
      </Badge>
      <Badge variant="secondary" icon={
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      }>
        Verified
      </Badge>
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
};

export const FilterTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Badge
        variant="primary"
        removable
        onRemove={() => console.log('Removed: New York')}
      >
        New York
      </Badge>
      <Badge
        variant="secondary"
        removable
        onRemove={() => console.log('Removed: 5+ years')}
      >
        5+ years experience
      </Badge>
      <Badge
        variant="info"
        removable
        onRemove={() => console.log('Removed: Corporate Law')}
      >
        Corporate Law
      </Badge>
      <Badge
        variant="success"
        removable
        onRemove={() => console.log('Removed: Available')}
      >
        Available
      </Badge>
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
};

// Size Comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Badge size="small" variant="primary">Small</Badge>
      <Badge size="medium" variant="primary">Medium</Badge>
      <Badge size="large" variant="primary">Large</Badge>
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
};

// Variant Showcase
export const VariantShowcase: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', alignItems: 'center' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
};

// Complex Examples
export const AdvocateProfile: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      width: '300px'
    }}>
      <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
        Sarah Johnson
      </h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <Badge variant="success" size="small" icon={
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        }>
          Verified
        </Badge>
        <Badge variant="warning" size="small">Available</Badge>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
          Specialties
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          <Badge variant="primary" size="small">Corporate Law</Badge>
          <Badge variant="info" size="small">Tax Law</Badge>
          <Badge variant="secondary" size="small">Real Estate</Badge>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Badge variant="secondary" size="small" shape="pill">15 years</Badge>
        <Badge variant="secondary" size="small" shape="pill">New York</Badge>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
};