import type { Meta, StoryObj } from '@storybook/react';
import NavigationHeader from './index';
import Button from '../../atoms/Button';

const meta: Meta<typeof NavigationHeader> = {
  title: 'Molecules/NavigationHeader',
  component: NavigationHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive navigation header component with branding, theme toggle, and customizable navigation content. Used at the top of all application pages.'
      }
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Application title displayed next to logo'
    },
    logoSrc: {
      control: { type: 'text' },
      description: 'URL to logo image'
    },
    logoAlt: {
      control: { type: 'text' },
      description: 'Alt text for logo image'
    },
    showThemeToggle: {
      control: { type: 'boolean' },
      description: 'Whether to show the theme toggle button'
    },
    isDarkMode: {
      control: { type: 'boolean' },
      description: 'Current theme state for toggle button'
    },
    onThemeToggle: {
      action: 'theme toggled',
      description: 'Callback fired when theme toggle is clicked'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    },
    children: {
      control: { type: 'text' },
      description: 'Navigation content (buttons, links, etc.)'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {}
};

export const CustomTitle: Story = {
  args: {
    title: 'Healthcare Portal'
  }
};

export const WithLogo: Story = {
  args: {
    logoSrc: 'https://via.placeholder.com/40x40/145A5A/FFFFFF?text=S',
    logoAlt: 'Solace Logo'
  }
};

export const DarkMode: Story = {
  args: {
    isDarkMode: true
  }
};

export const NoThemeToggle: Story = {
  args: {
    showThemeToggle: false
  }
};

// With Navigation Content
export const WithNavButtons: Story = {
  args: {
    children: (
      <>
        <Button variant="ghost" size="small">
          Dashboard
        </Button>
        <Button variant="ghost" size="small">
          Advocates
        </Button>
        <Button variant="primary" size="small">
          Sign In
        </Button>
      </>
    )
  }
};

export const WithSearchAndActions: Story = {
  args: {
    title: 'Advocate Portal',
    children: (
      <>
        <input
          type="search"
          placeholder="Search advocates..."
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
            fontSize: '0.875rem'
          }}
        />
        <Button variant="primary" size="small">
          Add Advocate
        </Button>
      </>
    )
  }
};

// Interactive Examples
export const InteractiveThemeToggle: Story = {
  render: (args) => {
    const [isDark, setIsDark] = React.useState(false);

    const handleThemeToggle = () => {
      setIsDark(!isDark);
      args.onThemeToggle?.();
    };

    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#1f2937' : '#f9fafb',
        transition: 'background-color 0.2s'
      }}>
        <NavigationHeader
          {...args}
          isDarkMode={isDark}
          onThemeToggle={handleThemeToggle}
        />
        <div style={{
          padding: '2rem',
          color: isDark ? '#f9fafb' : '#1f2937'
        }}>
          <h2>Theme: {isDark ? 'Dark' : 'Light'}</h2>
          <p>Click the theme toggle button to see the effect!</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive header with working theme toggle that affects the page background.'
      }
    }
  }
};

// Layout Examples
export const FullPage: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <NavigationHeader
        title="Solace"
        logoSrc="https://via.placeholder.com/40x40/145A5A/FFFFFF?text=S"
      >
        <Button variant="ghost" size="small">Home</Button>
        <Button variant="ghost" size="small">Advocates</Button>
        <Button variant="ghost" size="small">About</Button>
        <Button variant="primary" size="small">Contact</Button>
      </NavigationHeader>
      <main style={{ padding: '2rem' }}>
        <h1>Page Content</h1>
        <p>This demonstrates how the header looks in a full page layout.</p>
      </main>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete page layout showing the header in context with page content.'
      }
    }
  }
};

export const MobileView: Story = {
  args: {
    title: 'Mobile App',
    children: (
      <Button variant="primary" size="small">
        Menu
      </Button>
    )
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Header optimized for mobile viewing with responsive layout.'
      }
    }
  }
};

// Branding Variations
export const MinimalBranding: Story = {
  args: {
    title: 'App',
    showThemeToggle: false
  }
};

export const CorporateBranding: Story = {
  args: {
    title: 'Enterprise Healthcare Solutions',
    logoSrc: 'https://via.placeholder.com/40x40/2563eb/FFFFFF?text=EHS',
    logoAlt: 'Enterprise Healthcare Solutions',
    children: (
      <>
        <Button variant="ghost" size="small">Solutions</Button>
        <Button variant="ghost" size="small">Support</Button>
        <Button variant="primary" size="small">Get Started</Button>
      </>
    )
  }
};

// State Examples
export const LoadingState: Story = {
  args: {
    children: (
      <div style={{
        width: '20px',
        height: '20px',
        border: '2px solid #f3f4f6',
        borderTop: '2px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    )
  },
  decorators: [
    (Story) => (
      <div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header with loading indicator in the navigation area.'
      }
    }
  }
};

// Edge Cases
export const LongTitle: Story = {
  args: {
    title: 'Very Long Application Name That Might Need Truncation',
    logoSrc: 'https://via.placeholder.com/40x40/dc2626/FFFFFF?text=VL'
  }
};

export const ManyNavItems: Story = {
  args: {
    children: (
      <>
        <Button variant="ghost" size="small">Dashboard</Button>
        <Button variant="ghost" size="small">Advocates</Button>
        <Button variant="ghost" size="small">Patients</Button>
        <Button variant="ghost" size="small">Reports</Button>
        <Button variant="ghost" size="small">Settings</Button>
        <Button variant="primary" size="small">Logout</Button>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with many navigation items to test responsive behavior.'
      }
    }
  }
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    title: 'Custom Theme',
    className: 'custom-header'
  },
  decorators: [
    (Story) => (
      <div>
        <style>{`
          .custom-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-bottom: 3px solid #4c1d95;
          }
          .custom-header h1 {
            color: white;
          }
        `}</style>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header with custom gradient background styling.'
      }
    }
  }
};