import type { Meta, StoryObj } from '@storybook/react';
import FilterPanel from './index';
import { AdvocateFilters } from '../../../types/advocate';

const meta: Meta<typeof FilterPanel> = {
  title: 'Molecules/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive filter panel component for filtering advocate data. Includes specialty, city, degree, and experience range filters with a clear all functionality.'
      }
    }
  },
  argTypes: {
    filters: {
      control: { type: 'object' },
      description: 'Current filter values'
    },
    onFiltersChange: {
      action: 'filters changed',
      description: 'Callback fired when any filter value changes'
    },
    onClearFilters: {
      action: 'filters cleared',
      description: 'Callback fired when clear all button is clicked'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample filter states
const emptyFilters: AdvocateFilters = {
  specialty: undefined,
  city: undefined,
  degree: undefined,
  experienceRange: undefined
};

const partialFilters: AdvocateFilters = {
  specialty: 'Cardiology',
  city: undefined,
  degree: 'MD',
  experienceRange: undefined
};

const fullFilters: AdvocateFilters = {
  specialty: 'Clinical Psychology',
  city: 'New York',
  degree: 'PhD',
  experienceRange: '6-10'
};

// Basic Stories
export const Default: Story = {
  args: {
    filters: emptyFilters
  }
};

export const WithPartialFilters: Story = {
  args: {
    filters: partialFilters
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel with some filters applied, showing the clear button.'
      }
    }
  }
};

export const WithAllFilters: Story = {
  args: {
    filters: fullFilters
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel with all filters applied.'
      }
    }
  }
};

// Interactive Examples
export const Interactive: Story = {
  render: (args) => {
    const [filters, setFilters] = React.useState<AdvocateFilters>(emptyFilters);

    const handleFiltersChange = (newFilters: AdvocateFilters) => {
      setFilters(newFilters);
      args.onFiltersChange?.(newFilters);
    };

    const handleClearFilters = () => {
      setFilters(emptyFilters);
      args.onClearFilters?.();
    };

    return (
      <FilterPanel
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        className={args.className}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive filter panel where you can test the filter functionality.'
      }
    }
  }
};

// Layout Examples
export const InSidebar: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      gap: '2rem',
      maxWidth: '1200px',
      height: '600px'
    }}>
      <div style={{
        width: '300px',
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '8px'
      }}>
        <FilterPanel
          filters={partialFilters}
          onFiltersChange={() => {}}
          onClearFilters={() => {}}
        />
      </div>
      <div style={{
        flex: 1,
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280'
      }}>
        Main Content Area
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filter panel positioned in a sidebar layout as typically used in the application.'
      }
    }
  }
};

export const MobileView: Story = {
  args: {
    filters: fullFilters
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Filter panel optimized for mobile viewing with responsive layout.'
      }
    }
  }
};

// State Examples
export const NoActiveFilters: Story = {
  args: {
    filters: emptyFilters
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel with no active filters - clear button is hidden.'
      }
    }
  }
};

export const SingleFilterActive: Story = {
  args: {
    filters: {
      specialty: 'Neurology',
      city: undefined,
      degree: undefined,
      experienceRange: undefined
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel with only one filter active.'
      }
    }
  }
};

// Specialty Variations
export const MedicalSpecialties: Story = {
  args: {
    filters: {
      specialty: 'Emergency Medicine',
      city: 'Chicago',
      degree: 'MD',
      experienceRange: '11-15'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel configured for medical specialties.'
      }
    }
  }
};

export const PsychologySpecialties: Story = {
  args: {
    filters: {
      specialty: 'Trauma & PTSD',
      city: 'Los Angeles',
      degree: 'PsyD',
      experienceRange: '3-5'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel configured for psychology specialties.'
      }
    }
  }
};

export const LegalSpecialties: Story = {
  args: {
    filters: {
      specialty: 'Corporate Law',
      city: 'Houston',
      degree: 'JD',
      experienceRange: '20+'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel configured for legal specialties.'
      }
    }
  }
};

// Edge Cases
export const LongSpecialtyName: Story = {
  args: {
    filters: {
      specialty: 'Cognitive Behavioral Therapy',
      city: 'San Francisco',
      degree: 'PhD',
      experienceRange: '6-10'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel with long specialty name testing text wrapping.'
      }
    }
  }
};

export const AllExperienceRanges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {['0-2', '3-5', '6-10', '11-15', '16-20', '20+'].map(range => (
        <FilterPanel
          key={range}
          filters={{
            specialty: undefined,
            city: undefined,
            degree: undefined,
            experienceRange: range
          }}
          onFiltersChange={() => {}}
          onClearFilters={() => {}}
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple filter panels showing all experience range options.'
      }
    }
  }
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    filters: partialFilters,
    className: 'custom-filter-panel'
  },
  decorators: [
    (Story) => (
      <div>
        <style>{`
          .custom-filter-panel {
            border: 2px solid #10b981;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          }
        `}</style>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Filter panel with custom styling applied.'
      }
    }
  }
};