import type { Meta, StoryObj } from '@storybook/react';
import AdvocateCard from './index';
import { Advocate } from '../../../types/advocate';

const meta: Meta<typeof AdvocateCard> = {
  title: 'Molecules/AdvocateCard',
  component: AdvocateCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A card component that displays advocate information including name, location, specialties, experience, and contact details. Used in both mobile card layouts and as clickable items.'
      }
    }
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Callback fired when the card is clicked'
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

// Sample advocates for stories
const sampleAdvocate: Advocate = {
  id: 1,
  firstName: 'Dr. Sarah',
  lastName: 'Johnson',
  city: 'New York',
  degree: 'MD',
  specialties: ['Cardiology', 'Internal Medicine'],
  yearsOfExperience: 12,
  phoneNumber: 2125551234
};

const advocateWithManySpecialties: Advocate = {
  id: 2,
  firstName: 'Michael',
  lastName: 'Chen',
  city: 'Los Angeles',
  degree: 'PhD',
  specialties: ['Clinical Psychology', 'Cognitive Behavioral Therapy', 'Trauma & PTSD', 'Anxiety Disorders', 'Depression Treatment'],
  yearsOfExperience: 8,
  phoneNumber: 3105551234
};

const newAdvocate: Advocate = {
  id: 3,
  firstName: 'Emily',
  lastName: 'Rodriguez',
  city: 'Chicago',
  degree: 'MSW',
  specialties: ['Social Work'],
  yearsOfExperience: 2,
  phoneNumber: 3125551234
};

const seniorAdvocate: Advocate = {
  id: 4,
  firstName: 'Dr. Robert',
  lastName: 'Thompson',
  city: 'Houston',
  degree: 'JD',
  specialties: ['Corporate Law', 'Mergers & Acquisitions', 'Securities Law'],
  yearsOfExperience: 25,
  phoneNumber: 7135551234
};

// Basic Stories
export const Default: Story = {
  args: {
    advocate: sampleAdvocate
  }
};

export const Clickable: Story = {
  args: {
    advocate: sampleAdvocate,
    onClick: (advocate) => {
      console.log('Clicked advocate:', advocate);
    }
  }
};

export const WithManySpecialties: Story = {
  args: {
    advocate: advocateWithManySpecialties
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with multiple specialties demonstrating badge wrapping behavior.'
      }
    }
  }
};

export const NewAdvocate: Story = {
  args: {
    advocate: newAdvocate
  },
  parameters: {
    docs: {
      description: {
        story: 'Recently graduated advocate with minimal experience.'
      }
    }
  }
};

export const SeniorAdvocate: Story = {
  args: {
    advocate: seniorAdvocate
  },
  parameters: {
    docs: {
      description: {
        story: 'Experienced advocate with extensive background.'
      }
    }
  }
};

// Layout Examples
export const InGrid: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      maxWidth: '800px'
    }}>
      <AdvocateCard advocate={sampleAdvocate} />
      <AdvocateCard advocate={advocateWithManySpecialties} />
      <AdvocateCard advocate={newAdvocate} />
      <AdvocateCard advocate={seniorAdvocate} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple advocate cards in a responsive grid layout.'
      }
    }
  }
};

export const MobileView: Story = {
  args: {
    advocate: advocateWithManySpecialties
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Card optimized for mobile viewing with responsive layout.'
      }
    }
  }
};

// Interactive Examples
export const ClickableWithFeedback: Story = {
  render: () => {
    const handleClick = (advocate: Advocate) => {
      alert(`Viewing details for ${advocate.firstName} ${advocate.lastName}`);
    };

    return (
      <AdvocateCard
        advocate={sampleAdvocate}
        onClick={handleClick}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable card with user feedback. Try clicking the card!'
      }
    }
  }
};

// Edge Cases
export const NoSpecialties: Story = {
  args: {
    advocate: {
      ...sampleAdvocate,
      specialties: []
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with an advocate who has no listed specialties.'
      }
    }
  }
};

export const LongName: Story = {
  args: {
    advocate: {
      ...sampleAdvocate,
      firstName: 'Dr. Elizabeth Margaret',
      lastName: 'van der Westhuizen-Smith',
      city: 'San Francisco'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with very long name demonstrating text wrapping.'
      }
    }
  }
};

export const LongCityName: Story = {
  args: {
    advocate: {
      ...sampleAdvocate,
      city: 'Rancho Santa Margarita'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with long city name.'
      }
    }
  }
};

// State Examples
export const Loading: Story = {
  render: () => (
    <div style={{ position: 'relative' }}>
      <AdvocateCard advocate={sampleAdvocate} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.5rem'
      }}>
        Loading...
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with loading overlay state.'
      }
    }
  }
};