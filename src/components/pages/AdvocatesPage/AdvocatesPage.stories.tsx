import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AdvocatesPage from './index';

// Mock the stores for Storybook
jest.mock('../../../store/advocateStore', () => ({
  useAdvocateStore: () => ({
    advocates: [],
    filteredAdvocates: [],
    loading: false,
    error: null,
    hasMore: false,
    loadingMore: false,
    searchTerm: '',
    filters: {
      city: '',
      specialty: '',
      degree: '',
      experience: ''
    },
    filtersLoading: false,
    setSearchTerm: () => {},
    searchAdvocates: () => Promise.resolve(),
    resetSearch: () => {},
    setFilters: () => {},
    applyFilters: () => {},
    clearFilters: () => {},
    loadMoreAdvocates: () => Promise.resolve(),
    getResultsCount: () => 0,
    getTotalCount: () => 0
  })
}));

jest.mock('../../../store/themeStore', () => ({
  useThemeStore: () => ({
    isDarkMode: false,
    toggleTheme: () => {}
  })
}));

const meta: Meta<typeof AdvocatesPage> = {
  title: 'Pages/AdvocatesPage',
  component: AdvocatesPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The complete Advocates search page that integrates with Zustand stores to provide a full-featured advocate search and discovery interface. This page combines the SearchPageTemplate with real state management and data flow.'
      }
    }
  },
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name for the page container'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default state of the Advocates page with empty search results and no active filters.'
      }
    }
  }
};

export const CustomClassName: Story = {
  args: {
    className: 'custom-advocates-page'
  },
  parameters: {
    docs: {
      description: {
        story: 'Advocates page with a custom CSS class applied to the container.'
      }
    }
  }
};

// Note: For more comprehensive testing of the page states,
// we would need to mock the store returns differently.
// In a real implementation, you might want to create a
// decorator that provides mock store data for different scenarios.

export const WithMockData: Story = {
  render: (args) => {
    // This would typically be handled by a Storybook decorator
    // that provides mock store data
    return <AdvocatesPage {...args} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Advocates page with mocked store data. In a real implementation, this would use a Storybook decorator to provide various store states for comprehensive testing of different page scenarios.'
      }
    }
  }
};

// Responsive Stories
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'How the Advocates page appears on mobile devices with responsive layout and touch-friendly interactions.'
      }
    }
  }
};

export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'How the Advocates page appears on tablet devices with medium-sized layout adaptations.'
      }
    }
  }
};

export const Desktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'How the Advocates page appears on desktop devices with full sidebar and expanded layout.'
      }
    }
  }
};