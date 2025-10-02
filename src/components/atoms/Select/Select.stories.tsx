import type { Meta, StoryObj } from '@storybook/react';
import Select from './index';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable select dropdown component with multiple variants, sizes, and states. Supports labels, validation, and accessibility features.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the select'
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled'],
      description: 'The visual style variant'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the select is disabled'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the select is required'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the select takes full width'
    },
    label: {
      control: { type: 'text' },
      description: 'The select label'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'The placeholder text'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the select'
    },
    error: {
      control: { type: 'text' },
      description: 'Error message displayed below the select'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options for stories
const basicOptions = [
  { value: '', label: 'Select an option' },
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const cityOptions = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'houston', label: 'Houston' },
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'san-antonio', label: 'San Antonio' },
  { value: 'san-diego', label: 'San Diego' }
];

const specialtyOptions = [
  { value: 'civil', label: 'Civil Law' },
  { value: 'criminal', label: 'Criminal Law' },
  { value: 'corporate', label: 'Corporate Law' },
  { value: 'family', label: 'Family Law' },
  { value: 'immigration', label: 'Immigration Law' },
  { value: 'personal-injury', label: 'Personal Injury' },
  { value: 'real-estate', label: 'Real Estate Law' },
  { value: 'tax', label: 'Tax Law' }
];

const optionsWithDisabled = [
  { value: 'active1', label: 'Active Option 1' },
  { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
  { value: 'active2', label: 'Active Option 2' },
  { value: 'disabled2', label: 'Disabled Option 2', disabled: true },
  { value: 'active3', label: 'Active Option 3' }
];

// Basic Stories
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Choose an option'
  }
};

export const WithLabel: Story = {
  args: {
    label: 'Select City',
    options: cityOptions,
    placeholder: 'Choose a city'
  }
};

export const Required: Story = {
  args: {
    label: 'Legal Specialty',
    options: specialtyOptions,
    placeholder: 'Choose your specialty',
    required: true
  }
};

export const WithHelperText: Story = {
  args: {
    label: 'Preferred City',
    options: cityOptions,
    placeholder: 'Select your preferred city',
    helperText: 'This will help us find advocates near you'
  }
};

export const WithError: Story = {
  args: {
    label: 'Legal Specialty',
    options: specialtyOptions,
    placeholder: 'Choose your specialty',
    error: 'Please select a legal specialty'
  }
};

// Size Variants
export const Small: Story = {
  args: {
    label: 'Small Select',
    options: basicOptions,
    placeholder: 'Small size',
    size: 'small'
  }
};

export const Medium: Story = {
  args: {
    label: 'Medium Select',
    options: basicOptions,
    placeholder: 'Medium size (default)',
    size: 'medium'
  }
};

export const Large: Story = {
  args: {
    label: 'Large Select',
    options: basicOptions,
    placeholder: 'Large size',
    size: 'large'
  }
};

// Style Variants
export const Outlined: Story = {
  args: {
    label: 'Outlined Select',
    options: cityOptions,
    placeholder: 'Outlined variant (default)',
    variant: 'outlined'
  }
};

export const Filled: Story = {
  args: {
    label: 'Filled Select',
    options: cityOptions,
    placeholder: 'Filled variant',
    variant: 'filled'
  }
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options: basicOptions,
    placeholder: 'This select is disabled',
    disabled: true
  }
};

export const DisabledOptions: Story = {
  args: {
    label: 'Select with Disabled Options',
    options: optionsWithDisabled,
    placeholder: 'Some options are disabled'
  }
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Select',
    options: cityOptions,
    placeholder: 'This select takes full width',
    fullWidth: true
  },
  parameters: {
    layout: 'padded'
  }
};

export const WithPreselectedValue: Story = {
  args: {
    label: 'Preselected City',
    options: cityOptions,
    defaultValue: 'new-york'
  }
};

// Real-world Examples
export const CityFilter: Story = {
  args: {
    label: 'Filter by City',
    options: [
      { value: '', label: 'All Cities' },
      ...cityOptions
    ],
    placeholder: 'Select a city',
    helperText: 'Filter advocates by their location'
  }
};

export const SpecialtyFilter: Story = {
  args: {
    label: 'Legal Specialty',
    options: [
      { value: '', label: 'All Specialties' },
      ...specialtyOptions
    ],
    placeholder: 'Select specialty',
    helperText: 'Filter by area of legal expertise'
  }
};

export const ExperienceLevel: Story = {
  args: {
    label: 'Years of Experience',
    options: [
      { value: '', label: 'Any Experience Level' },
      { value: '0-2', label: '0-2 years' },
      { value: '3-5', label: '3-5 years' },
      { value: '6-10', label: '6-10 years' },
      { value: '11-15', label: '11-15 years' },
      { value: '16-20', label: '16-20 years' },
      { value: '20+', label: '20+ years' }
    ],
    placeholder: 'Select experience level'
  }
};

export const SortOptions: Story = {
  args: {
    label: 'Sort Results',
    options: [
      { value: 'relevance', label: 'Most Relevant' },
      { value: 'experience-desc', label: 'Most Experienced' },
      { value: 'experience-asc', label: 'Least Experienced' },
      { value: 'name-asc', label: 'Name (A-Z)' },
      { value: 'name-desc', label: 'Name (Z-A)' },
      { value: 'city-asc', label: 'City (A-Z)' }
    ],
    defaultValue: 'relevance'
  }
};

// Complex Examples
export const AdvancedFilters: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Select
        label="City"
        options={cityOptions}
        placeholder="Select city"
      />
      <Select
        label="Legal Specialty"
        options={specialtyOptions}
        placeholder="Select specialty"
        required
      />
      <Select
        label="Experience Level"
        options={[
          { value: '', label: 'Any Experience' },
          { value: '0-2', label: '0-2 years' },
          { value: '3-5', label: '3-5 years' },
          { value: '6-10', label: '6-10 years' },
          { value: '11+', label: '11+ years' }
        ]}
        placeholder="Select experience"
      />
      <Select
        label="Sort By"
        options={[
          { value: 'relevance', label: 'Most Relevant' },
          { value: 'experience', label: 'Most Experienced' },
          { value: 'name', label: 'Name (A-Z)' }
        ]}
        defaultValue="relevance"
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
      <Select
        label="Required Specialty"
        options={specialtyOptions}
        placeholder="Choose specialty"
        error="Please select a legal specialty"
        required
      />
      <Select
        label="Preferred City"
        options={cityOptions}
        placeholder="Choose city"
        error="This city is not in our service area"
      />
      <Select
        label="Experience Level"
        options={[
          { value: '', label: 'Select experience' },
          { value: '0-5', label: '0-5 years' },
          { value: '6+', label: '6+ years' }
        ]}
        error="Please specify experience level"
      />
    </div>
  ),
  parameters: {
    layout: 'centered'
  }
};