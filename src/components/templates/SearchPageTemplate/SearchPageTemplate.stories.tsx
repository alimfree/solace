import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchPageTemplate from './index';
import { Advocate, AdvocateFilters } from '../../../types/advocate';

const meta: Meta<typeof SearchPageTemplate> = {
  title: 'Templates/SearchPageTemplate',
  component: SearchPageTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A complete search page template that combines all organism components into a full-featured advocate search interface with sidebar filters, responsive design, and comprehensive state management.'
      }
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Title displayed in the header'
    },
    logoSrc: {
      control: { type: 'text' },
      description: 'URL for the logo image'
    },
    showThemeToggle: {
      control: { type: 'boolean' },
      description: 'Whether to show the theme toggle button'
    },
    isDarkMode: {
      control: { type: 'boolean' },
      description: 'Current theme mode'
    },
    showAddButton: {
      control: { type: 'boolean' },
      description: 'Whether to show the add advocate button'
    },
    searchTerm: {
      control: { type: 'text' },
      description: 'Current search term'
    },
    advocates: {
      control: { type: 'object' },
      description: 'Array of advocates to display'
    },
    resultsCount: {
      control: { type: 'number' },
      description: 'Number of search results'
    },
    totalCount: {
      control: { type: 'number' },
      description: 'Total number of advocates available'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the search is currently loading'
    },
    filtersLoading: {
      control: { type: 'boolean' },
      description: 'Whether filters are currently loading'
    },
    error: {
      control: { type: 'text' },
      description: 'Error message to display'
    },
    sidebarCollapsed: {
      control: { type: 'boolean' },
      description: 'Whether the sidebar is collapsed'
    },
    showLoadMore: {
      control: { type: 'boolean' },
      description: 'Whether to show the load more button'
    },
    hasMore: {
      control: { type: 'boolean' },
      description: 'Whether there are more advocates to load'
    },
    loadingMore: {
      control: { type: 'boolean' },
      description: 'Whether more advocates are currently loading'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleAdvocates: Advocate[] = [
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
    specialties: ['Clinical Psychology', 'Cognitive Behavioral Therapy'],
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
  },
  {
    id: 4,
    firstName: 'Dr. Robert',
    lastName: 'Thompson',
    city: 'Houston',
    degree: 'JD',
    specialties: ['Corporate Law', 'Mergers & Acquisitions'],
    yearsOfExperience: 25,
    phoneNumber: 7135551234
  },
  {
    id: 5,
    firstName: 'Lisa',
    lastName: 'Wong',
    city: 'San Francisco',
    degree: 'PhD',
    specialties: ['Neurology', 'Research'],
    yearsOfExperience: 15,
    phoneNumber: 4155551234
  },
  {
    id: 6,
    firstName: 'James',
    lastName: 'Smith',
    city: 'Miami',
    degree: 'MD',
    specialties: ['Emergency Medicine', 'Trauma'],
    yearsOfExperience: 7,
    phoneNumber: 3055551234
  }
];

const defaultFilters: AdvocateFilters = {
  city: '',
  specialty: '',
  degree: '',
  experience: ''
};

// Basic Stories
export const Default: Story = {
  args: {
    advocates: sampleAdvocates,
    searchTerm: '',
    filters: defaultFilters,
    resultsCount: sampleAdvocates.length,
    totalCount: sampleAdvocates.length,
    loading: false,
    error: null,
    sidebarCollapsed: false
  }
};

export const WithSearch: Story = {
  args: {
    ...Default.args,
    searchTerm: 'cardiology',
    advocates: sampleAdvocates.slice(0, 2),
    resultsCount: 2,
    totalCount: sampleAdvocates.length
  },
  parameters: {
    docs: {
      description: {
        story: 'Search page with an active search term showing filtered results.'
      }
    }
  }
};

export const WithFilters: Story = {
  args: {
    ...Default.args,
    filters: {
      city: 'New York',
      specialty: 'Cardiology',
      degree: 'MD',
      experience: '10-15'
    },
    advocates: sampleAdvocates.slice(0, 1),
    resultsCount: 1,
    totalCount: sampleAdvocates.length
  },
  parameters: {
    docs: {
      description: {
        story: 'Search page with active filters applied, showing reduced results.'
      }
    }
  }
};

export const Loading: Story = {
  args: {
    ...Default.args,
    advocates: [],
    loading: true,
    resultsCount: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state while advocates are being fetched.'
      }
    }
  }
};

export const LoadingFilters: Story = {
  args: {
    ...Default.args,
    filtersLoading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state specifically for filters while main content is available.'
      }
    }
  }
};

export const Error: Story = {
  args: {
    ...Default.args,
    advocates: [],
    error: 'Failed to load advocates. Please check your connection and try again.',
    resultsCount: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state when something goes wrong during the search.'
      }
    }
  }
};

export const Empty: Story = {
  args: {
    ...Default.args,
    advocates: [],
    resultsCount: 0,
    searchTerm: 'nonexistent specialty'
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no advocates match the search criteria.'
      }
    }
  }
};

export const WithPagination: Story = {
  args: {
    ...Default.args,
    advocates: sampleAdvocates.slice(0, 3),
    showLoadMore: true,
    hasMore: true,
    resultsCount: 3,
    totalCount: 10
  },
  parameters: {
    docs: {
      description: {
        story: 'Search page with pagination showing load more functionality.'
      }
    }
  }
};

export const LoadingMore: Story = {
  args: {
    ...WithPagination.args,
    loadingMore: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state when fetching additional advocates via pagination.'
      }
    }
  }
};

export const CollapsedSidebar: Story = {
  args: {
    ...Default.args,
    sidebarCollapsed: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Search page with collapsed sidebar for focused browsing.'
      }
    }
  }
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
    isDarkMode: true,
    showThemeToggle: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Search page in dark mode with theme toggle enabled.'
      }
    }
  }
};

// Interactive Stories
export const Interactive: Story = {
  render: (args) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<AdvocateFilters>(defaultFilters);
    const [advocates, setAdvocates] = useState(sampleAdvocates);
    const [loading, setLoading] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleSearch = () => {
      setLoading(true);
      setTimeout(() => {
        const filtered = sampleAdvocates.filter(advocate => {
          const matchesSearch = !searchTerm ||
            advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            advocate.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

          const matchesCity = !filters.city || advocate.city === filters.city;
          const matchesSpecialty = !filters.specialty ||
            advocate.specialties.some(s => s.toLowerCase().includes(filters.specialty.toLowerCase()));

          return matchesSearch && matchesCity && matchesSpecialty;
        });

        setAdvocates(filtered);
        setLoading(false);
      }, 1000);
    };

    const handleReset = () => {
      setSearchTerm('');
      setFilters(defaultFilters);
      setAdvocates(sampleAdvocates);
    };

    const handleFiltersChange = (newFilters: AdvocateFilters) => {
      setFilters(newFilters);
    };

    const handleAdvocateClick = (advocate: Advocate) => {
      alert(`Clicked: ${advocate.firstName} ${advocate.lastName}`);
    };

    const handleAddAdvocate = () => {
      alert('Add Advocate clicked!');
    };

    const handleThemeToggle = () => {
      setIsDarkMode(!isDarkMode);
    };

    const handleSidebarToggle = () => {
      setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
      <SearchPageTemplate
        {...args}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={handleSearch}
        onSearchReset={handleReset}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onFiltersApply={handleSearch}
        onFiltersClear={handleReset}
        advocates={advocates}
        resultsCount={advocates.length}
        totalCount={sampleAdvocates.length}
        loading={loading}
        onAdvocateClick={handleAdvocateClick}
        showAddButton={true}
        onAddAdvocate={handleAddAdvocate}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={handleSidebarToggle}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive search page with working search, filters, and UI controls.'
      }
    }
  }
};

// Responsive Stories
export const Mobile: Story = {
  args: {
    ...Default.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'How the search page appears on mobile devices with responsive layout.'
      }
    }
  }
};

export const Tablet: Story = {
  args: {
    ...Default.args
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'How the search page appears on tablet devices.'
      }
    }
  }
};

// Edge Cases
export const LongContent: Story = {
  args: {
    ...Default.args,
    advocates: [
      ...sampleAdvocates,
      ...sampleAdvocates.map(advocate => ({
        ...advocate,
        id: advocate.id + 10,
        firstName: advocate.firstName + ' (Extended)',
        specialties: [...advocate.specialties, 'Additional Specialty', 'Another Long Specialty Name']
      })),
      ...sampleAdvocates.map(advocate => ({
        ...advocate,
        id: advocate.id + 20,
        firstName: advocate.firstName + ' (Copy)',
        city: advocate.city + ' Extended Location Name'
      }))
    ],
    resultsCount: 18,
    totalCount: 18
  },
  parameters: {
    docs: {
      description: {
        story: 'Search page with many advocates and long content to test scrolling and layout.'
      }
    }
  }
};

export const SingleResult: Story = {
  args: {
    ...Default.args,
    advocates: [sampleAdvocates[0]],
    resultsCount: 1,
    searchTerm: 'Sarah Johnson'
  },
  parameters: {
    docs: {
      description: {
        story: 'Search page showing a single matching result.'
      }
    }
  }
};