import type { Meta, StoryObj } from '@storybook/react';
import AdvocateList from './index';
import { Advocate } from '../../../types/advocate';

const meta: Meta<typeof AdvocateList> = {
  title: 'Organisms/AdvocateList',
  component: AdvocateList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A complete organism component that displays a list of advocates with various layout options, loading states, error handling, and pagination support. Built using AdvocateCard molecules and LoadingState molecules.'
      }
    }
  },
  argTypes: {
    advocates: {
      control: { type: 'object' },
      description: 'Array of advocate objects to display'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the list is currently loading'
    },
    error: {
      control: { type: 'text' },
      description: 'Error message to display'
    },
    emptyMessage: {
      control: { type: 'text' },
      description: 'Message to show when no advocates are found'
    },
    layout: {
      control: { type: 'select' },
      options: ['grid', 'table', 'list'],
      description: 'Layout style for the advocate list'
    },
    onAdvocateClick: {
      action: 'advocate clicked',
      description: 'Callback fired when an advocate card is clicked'
    },
    showLoadMore: {
      control: { type: 'boolean' },
      description: 'Whether to show the load more button'
    },
    onLoadMore: {
      action: 'load more clicked',
      description: 'Callback fired when load more button is clicked'
    },
    loadingMore: {
      control: { type: 'boolean' },
      description: 'Whether more advocates are currently loading'
    },
    hasMore: {
      control: { type: 'boolean' },
      description: 'Whether there are more advocates to load'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample advocate data
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

// Basic Stories
export const Default: Story = {
  args: {
    advocates: sampleAdvocates
  }
};

export const GridLayout: Story = {
  args: {
    advocates: sampleAdvocates,
    layout: 'grid'
  },
  parameters: {
    docs: {
      description: {
        story: 'Default grid layout showing advocates in responsive cards.'
      }
    }
  }
};

export const TableLayout: Story = {
  args: {
    advocates: sampleAdvocates,
    layout: 'table'
  },
  parameters: {
    docs: {
      description: {
        story: 'Table layout for more compact display of advocate information.'
      }
    }
  }
};

export const ListLayout: Story = {
  args: {
    advocates: sampleAdvocates,
    layout: 'list'
  },
  parameters: {
    docs: {
      description: {
        story: 'List layout for minimal, streamlined advocate display.'
      }
    }
  }
};

// State Stories
export const Loading: Story = {
  args: {
    advocates: [],
    loading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state shown while advocates are being fetched.'
      }
    }
  }
};

export const Error: Story = {
  args: {
    advocates: [],
    error: 'Failed to load advocates. Please check your connection and try again.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state with retry functionality when something goes wrong.'
      }
    }
  }
};

export const Empty: Story = {
  args: {
    advocates: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no advocates match the search criteria.'
      }
    }
  }
};

export const EmptyWithCustomMessage: Story = {
  args: {
    advocates: [],
    emptyMessage: 'No advocates found matching your search criteria. Try adjusting your filters.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state with a custom message.'
      }
    }
  }
};

// Interactive Stories
export const Clickable: Story = {
  args: {
    advocates: sampleAdvocates,
    onAdvocateClick: (advocate) => {
      alert(`Clicked on ${advocate.firstName} ${advocate.lastName}`);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Advocates are clickable and trigger actions. Try clicking on any advocate card!'
      }
    }
  }
};

export const WithLoadMore: Story = {
  args: {
    advocates: sampleAdvocates.slice(0, 3),
    showLoadMore: true,
    hasMore: true,
    onLoadMore: () => {
      alert('Load more clicked! In real app, this would fetch more advocates.');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'List with load more functionality for pagination.'
      }
    }
  }
};

export const LoadingMore: Story = {
  args: {
    advocates: sampleAdvocates.slice(0, 3),
    showLoadMore: true,
    hasMore: true,
    loadingMore: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state for when more advocates are being fetched.'
      }
    }
  }
};

export const NoMoreToLoad: Story = {
  args: {
    advocates: sampleAdvocates,
    showLoadMore: true,
    hasMore: false
  },
  parameters: {
    docs: {
      description: {
        story: 'List when all advocates have been loaded (no more to load).'
      }
    }
  }
};

// Size Variants
export const SingleAdvocate: Story = {
  args: {
    advocates: [sampleAdvocates[0]]
  },
  parameters: {
    docs: {
      description: {
        story: 'List with a single advocate.'
      }
    }
  }
};

export const ManyAdvocates: Story = {
  args: {
    advocates: [
      ...sampleAdvocates,
      ...sampleAdvocates.map(advocate => ({
        ...advocate,
        id: advocate.id + 10,
        firstName: advocate.firstName + ' (Copy)'
      })),
      ...sampleAdvocates.map(advocate => ({
        ...advocate,
        id: advocate.id + 20,
        firstName: advocate.firstName + ' (Copy 2)'
      }))
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'List with many advocates to test scrolling and performance.'
      }
    }
  }
};

// Responsive Stories
export const Mobile: Story = {
  args: {
    advocates: sampleAdvocates
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'How the advocate list appears on mobile devices.'
      }
    }
  }
};

export const Tablet: Story = {
  args: {
    advocates: sampleAdvocates
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'How the advocate list appears on tablet devices.'
      }
    }
  }
};

// Real-world Scenarios
export const SearchResults: Story = {
  args: {
    advocates: sampleAdvocates.slice(0, 2),
    emptyMessage: 'No advocates found for "Cardiology" in "New York"'
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulated search results showing filtered advocates.'
      }
    }
  }
};

export const FilteredResults: Story = {
  args: {
    advocates: sampleAdvocates.filter(advocate =>
      advocate.specialties.some(s => s.includes('Medicine'))
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Results filtered by specialty (Medicine-related fields).'
      }
    }
  }
};

// Performance Story
export const WithInteractiveFeatures: Story = {
  render: (args) => {
    const [advocates, setAdvocates] = React.useState(sampleAdvocates.slice(0, 3));
    const [loading, setLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);

    const handleLoadMore = () => {
      setLoading(true);
      setTimeout(() => {
        const newAdvocates = sampleAdvocates.slice(advocates.length, advocates.length + 3);
        setAdvocates([...advocates, ...newAdvocates]);
        setLoading(false);
        if (advocates.length + newAdvocates.length >= sampleAdvocates.length) {
          setHasMore(false);
        }
      }, 1000);
    };

    const handleAdvocateClick = (advocate: Advocate) => {
      alert(`Clicked: ${advocate.firstName} ${advocate.lastName}`);
    };

    return (
      <AdvocateList
        advocates={advocates}
        onAdvocateClick={handleAdvocateClick}
        showLoadMore={true}
        hasMore={hasMore}
        loadingMore={loading}
        onLoadMore={handleLoadMore}
        {...args}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive example with working load more and click handlers.'
      }
    }
  }
};