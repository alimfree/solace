import type { Meta, StoryObj } from '@storybook/react';
// Remove addon-actions dependency and use console.log instead
const action = (name: string) => (...args: any[]) => {
  console.log(name, ...args);
};
import SearchBar from './index';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive search bar molecule that combines input, select dropdowns, and filter badges to create a powerful search interface for finding advocates.'
      }
    }
  },
  argTypes: {
    onSearch: {
      action: 'search',
      description: 'Callback fired when search is performed'
    },
    onClear: {
      action: 'clear',
      description: 'Callback fired when filters are cleared'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the search is in loading state'
    },
    showAdvancedFilters: {
      control: { type: 'boolean' },
      description: 'Whether to show advanced filter options'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the search input'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const cityOptions = [
  { value: 'new-york', label: 'New York' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'houston', label: 'Houston' },
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'san-antonio', label: 'San Antonio' },
  { value: 'san-diego', label: 'San Diego' },
  { value: 'dallas', label: 'Dallas' },
  { value: 'san-jose', label: 'San Jose' }
];

const specialtyOptions = [
  { value: 'civil', label: 'Civil Law' },
  { value: 'criminal', label: 'Criminal Law' },
  { value: 'corporate', label: 'Corporate Law' },
  { value: 'family', label: 'Family Law' },
  { value: 'immigration', label: 'Immigration Law' },
  { value: 'personal-injury', label: 'Personal Injury' },
  { value: 'real-estate', label: 'Real Estate Law' },
  { value: 'tax', label: 'Tax Law' },
  { value: 'employment', label: 'Employment Law' },
  { value: 'intellectual-property', label: 'Intellectual Property' },
  { value: 'bankruptcy', label: 'Bankruptcy Law' },
  { value: 'environmental', label: 'Environmental Law' }
];

const experienceOptions = [
  { value: '0-2', label: '0-2 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '6-10', label: '6-10 years' },
  { value: '11-15', label: '11-15 years' },
  { value: '16-20', label: '16-20 years' },
  { value: '20+', label: '20+ years' }
];

// Basic Stories
export const Default: Story = {
  args: {
    onSearch: action('search'),
    onClear: action('clear'),
    cityOptions,
    specialtyOptions,
    experienceOptions
  }
};

export const SimpleSearch: Story = {
  args: {
    onSearch: action('search'),
    onClear: action('clear'),
    showAdvancedFilters: false,
    placeholder: 'Search advocates...'
  }
};

export const WithInitialFilters: Story = {
  args: {
    onSearch: action('search'),
    onClear: action('clear'),
    cityOptions,
    specialtyOptions,
    experienceOptions,
    initialFilters: {
      query: 'John Smith',
      city: 'new-york',
      specialty: 'corporate'
    }
  }
};

export const LoadingState: Story = {
  args: {
    onSearch: action('search'),
    onClear: action('clear'),
    loading: true,
    cityOptions,
    specialtyOptions,
    experienceOptions,
    initialFilters: {
      query: 'corporate lawyer'
    }
  }
};

// Interactive Examples
export const FullFeatured: Story = {
  render: () => {
    const handleSearch = (filters: any) => {
      console.log('Search filters:', filters);
      action('search')(filters);
    };

    const handleClear = () => {
      console.log('Filters cleared');
      action('clear')();
    };

    return (
      <SearchBar
        onSearch={handleSearch}
        onClear={handleClear}
        cityOptions={cityOptions}
        specialtyOptions={specialtyOptions}
        experienceOptions={experienceOptions}
        placeholder="Search advocates by name, specialty, location, or expertise..."
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A fully featured search bar with all filter options and interactive functionality.'
      }
    }
  }
};

export const MobileResponsive: Story = {
  render: () => (
    <div style={{ maxWidth: '375px' }}>
      <SearchBar
        onSearch={action('search')}
        onClear={action('clear')}
        cityOptions={cityOptions.slice(0, 5)}
        specialtyOptions={specialtyOptions.slice(0, 6)}
        experienceOptions={experienceOptions.slice(0, 4)}
        initialFilters={{
          city: 'new-york',
          specialty: 'corporate',
          experience: '6-10'
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Search bar optimized for mobile devices with responsive layout.'
      }
    }
  }
};

// Use Case Examples
export const CorporateLawSearch: Story = {
  args: {
    onSearch: action('corporate-search'),
    onClear: action('clear'),
    placeholder: 'Find corporate law specialists...',
    cityOptions: [
      { value: 'new-york', label: 'New York' },
      { value: 'san-francisco', label: 'San Francisco' },
      { value: 'chicago', label: 'Chicago' },
      { value: 'boston', label: 'Boston' }
    ],
    specialtyOptions: [
      { value: 'mergers-acquisitions', label: 'Mergers & Acquisitions' },
      { value: 'securities', label: 'Securities Law' },
      { value: 'corporate-governance', label: 'Corporate Governance' },
      { value: 'contract-law', label: 'Contract Law' }
    ],
    experienceOptions: [
      { value: '5+', label: '5+ years' },
      { value: '10+', label: '10+ years' },
      { value: '15+', label: '15+ years' }
    ],
    initialFilters: {
      specialty: 'mergers-acquisitions'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Specialized search configuration for corporate law with relevant filters.'
      }
    }
  }
};

export const ImmigrationLawSearch: Story = {
  args: {
    onSearch: action('immigration-search'),
    onClear: action('clear'),
    placeholder: 'Find immigration law advocates...',
    cityOptions: [
      { value: 'miami', label: 'Miami' },
      { value: 'los-angeles', label: 'Los Angeles' },
      { value: 'new-york', label: 'New York' },
      { value: 'houston', label: 'Houston' },
      { value: 'phoenix', label: 'Phoenix' }
    ],
    specialtyOptions: [
      { value: 'family-based', label: 'Family-Based Immigration' },
      { value: 'employment-based', label: 'Employment-Based Immigration' },
      { value: 'asylum-refugee', label: 'Asylum & Refugee Law' },
      { value: 'citizenship', label: 'Citizenship & Naturalization' },
      { value: 'deportation-defense', label: 'Deportation Defense' }
    ],
    experienceOptions: experienceOptions,
    initialFilters: {
      specialty: 'family-based'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Immigration law focused search with relevant specialties and major immigration centers.'
      }
    }
  }
};

export const PersonalInjurySearch: Story = {
  args: {
    onSearch: action('personal-injury-search'),
    onClear: action('clear'),
    placeholder: 'Find personal injury lawyers...',
    cityOptions: cityOptions,
    specialtyOptions: [
      { value: 'auto-accidents', label: 'Auto Accidents' },
      { value: 'medical-malpractice', label: 'Medical Malpractice' },
      { value: 'workplace-injury', label: 'Workplace Injury' },
      { value: 'slip-fall', label: 'Slip & Fall' },
      { value: 'product-liability', label: 'Product Liability' }
    ],
    experienceOptions: [
      { value: '3+', label: '3+ years' },
      { value: '7+', label: '7+ years' },
      { value: '12+', label: '12+ years' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Personal injury law search with case-type specific filters.'
      }
    }
  }
};

// State Examples
export const EmptyState: Story = {
  args: {
    onSearch: action('search'),
    onClear: action('clear'),
    cityOptions: [],
    specialtyOptions: [],
    experienceOptions: [],
    placeholder: 'No advocates available for search...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Search bar with empty filter options.'
      }
    }
  }
};

export const LimitedOptions: Story = {
  args: {
    onSearch: action('search'),
    onClear: action('clear'),
    cityOptions: cityOptions.slice(0, 3),
    specialtyOptions: specialtyOptions.slice(0, 4),
    experienceOptions: experienceOptions.slice(0, 3),
    placeholder: 'Search in available locations and specialties...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Search bar with limited filter options for smaller datasets.'
      }
    }
  }
};

// Performance Examples
export const WithManyFilters: Story = {
  args: {
    onSearch: action('search'),
    onClear: action('clear'),
    cityOptions: [
      ...cityOptions,
      { value: 'atlanta', label: 'Atlanta' },
      { value: 'seattle', label: 'Seattle' },
      { value: 'denver', label: 'Denver' },
      { value: 'nashville', label: 'Nashville' },
      { value: 'austin', label: 'Austin' },
      { value: 'portland', label: 'Portland' },
      { value: 'milwaukee', label: 'Milwaukee' },
      { value: 'oklahoma-city', label: 'Oklahoma City' }
    ],
    specialtyOptions: [
      ...specialtyOptions,
      { value: 'maritime', label: 'Maritime Law' },
      { value: 'aviation', label: 'Aviation Law' },
      { value: 'sports', label: 'Sports Law' },
      { value: 'entertainment', label: 'Entertainment Law' },
      { value: 'health', label: 'Health Law' },
      { value: 'education', label: 'Education Law' }
    ],
    experienceOptions: experienceOptions,
    initialFilters: {
      query: 'experienced advocate',
      city: 'new-york',
      specialty: 'corporate',
      experience: '10+'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Search bar with extensive filter options and pre-selected filters.'
      }
    }
  }
};

// Accessibility Example
export const AccessibilityFocused: Story = {
  args: {
    onSearch: action('search'),
    onClear: action('clear'),
    cityOptions: cityOptions.slice(0, 5),
    specialtyOptions: specialtyOptions.slice(0, 5),
    experienceOptions: experienceOptions.slice(0, 4),
    placeholder: 'Search advocates with keyboard navigation support...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard navigation and screen reader compatibility. Try using Tab, Enter, and arrow keys.'
      }
    }
  }
};