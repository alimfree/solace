import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationHeader from './index';

describe('NavigationHeader Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default title', () => {
      render(<NavigationHeader />);
      expect(screen.getByText('Solace')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      render(<NavigationHeader title="Custom Title" />);
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders default logo placeholder when no logo provided', () => {
      render(<NavigationHeader />);
      expect(screen.getByText('🏥')).toBeInTheDocument();
    });

    it('renders custom logo when provided', () => {
      render(
        <NavigationHeader
          logoSrc="/test-logo.png"
          logoAlt="Test Logo"
        />
      );
      const logo = screen.getByAltText('Test Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/test-logo.png');
    });

    it('applies custom className', () => {
      const { container } = render(
        <NavigationHeader className="custom-header" />
      );
      expect(container.firstChild).toHaveClass('custom-header');
    });
  });

  describe('Theme Toggle', () => {
    it('shows theme toggle by default', () => {
      render(<NavigationHeader />);
      const themeButton = screen.getByRole('button', { name: /switch to dark mode/i });
      expect(themeButton).toBeInTheDocument();
    });

    it('hides theme toggle when showThemeToggle is false', () => {
      render(<NavigationHeader showThemeToggle={false} />);
      expect(screen.queryByRole('button', { name: /switch to/i })).not.toBeInTheDocument();
    });

    it('shows light mode icon by default', () => {
      render(<NavigationHeader />);
      expect(screen.getByText('🌙')).toBeInTheDocument();
    });

    it('shows dark mode icon when isDarkMode is true', () => {
      render(<NavigationHeader isDarkMode={true} />);
      expect(screen.getByText('☀️')).toBeInTheDocument();
    });

    it('has correct aria-label for light mode', () => {
      render(<NavigationHeader isDarkMode={false} />);
      const themeButton = screen.getByRole('button', { name: 'Switch to dark mode' });
      expect(themeButton).toBeInTheDocument();
    });

    it('has correct aria-label for dark mode', () => {
      render(<NavigationHeader isDarkMode={true} />);
      const themeButton = screen.getByRole('button', { name: 'Switch to light mode' });
      expect(themeButton).toBeInTheDocument();
    });

    it('calls onThemeToggle when theme button is clicked', async () => {
      const handleThemeToggle = jest.fn();
      const user = userEvent.setup();

      render(<NavigationHeader onThemeToggle={handleThemeToggle} />);

      const themeButton = screen.getByRole('button', { name: /switch to/i });
      await user.click(themeButton);

      expect(handleThemeToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Children Content', () => {
    it('renders children in nav content area', () => {
      render(
        <NavigationHeader>
          <span data-testid="nav-child">Navigation Item</span>
        </NavigationHeader>
      );
      expect(screen.getByTestId('nav-child')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      render(
        <NavigationHeader>
          <span data-testid="nav-child-1">Item 1</span>
          <span data-testid="nav-child-2">Item 2</span>
        </NavigationHeader>
      );
      expect(screen.getByTestId('nav-child-1')).toBeInTheDocument();
      expect(screen.getByTestId('nav-child-2')).toBeInTheDocument();
    });

    it('does not render nav content wrapper when no children', () => {
      const { container } = render(<NavigationHeader />);
      expect(container.querySelector('.navContent')).not.toBeInTheDocument();
    });
  });

  describe('Logo Variants', () => {
    it('renders logo image with correct attributes', () => {
      render(
        <NavigationHeader
          logoSrc="/logo.svg"
          logoAlt="Company Logo"
        />
      );

      const logo = screen.getByAltText('Company Logo');
      expect(logo).toHaveAttribute('src', '/logo.svg');
      expect(logo).toHaveClass('logo');
    });

    it('uses default alt text when not provided', () => {
      render(<NavigationHeader logoSrc="/logo.svg" />);
      const logo = screen.getByAltText('Solace Logo');
      expect(logo).toBeInTheDocument();
    });

    it('renders placeholder when no logo src provided', () => {
      render(<NavigationHeader />);
      const placeholder = screen.getByText('🏥').parentElement;
      expect(placeholder).toHaveClass('logoPlaceholder');
    });
  });

  describe('Structure and Semantics', () => {
    it('renders as header element', () => {
      render(<NavigationHeader />);
      const header = screen.getByRole('banner');
      expect(header.tagName).toBe('HEADER');
    });

    it('title is rendered as h1', () => {
      render(<NavigationHeader title="Test Title" />);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('Test Title');
    });

    it('maintains proper heading hierarchy', () => {
      render(<NavigationHeader title="Main Title" />);
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(1);
      expect(headings[0].tagName).toBe('H1');
    });
  });

  describe('Accessibility', () => {
    it('theme toggle button is keyboard accessible', () => {
      render(<NavigationHeader />);
      const themeButton = screen.getByRole('button', { name: /switch to/i });
      expect(themeButton).toHaveAttribute('type', 'button');
    });

    it('logo image has proper alt text', () => {
      render(
        <NavigationHeader
          logoSrc="/logo.png"
          logoAlt="Accessible Logo Description"
        />
      );
      const logo = screen.getByAltText('Accessible Logo Description');
      expect(logo).toBeInTheDocument();
    });

    it('header has landmark role', () => {
      render(<NavigationHeader />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('prevents theme toggle from firing when onThemeToggle not provided', async () => {
      const user = userEvent.setup();

      render(<NavigationHeader />);
      const themeButton = screen.getByRole('button', { name: /switch to/i });

      // Should not throw error when clicked without handler
      await user.click(themeButton);
      expect(themeButton).toBeInTheDocument();
    });

    it('theme toggle works with keyboard interaction', async () => {
      const handleThemeToggle = jest.fn();
      const user = userEvent.setup();

      render(<NavigationHeader onThemeToggle={handleThemeToggle} />);

      const themeButton = screen.getByRole('button', { name: /switch to/i });
      themeButton.focus();
      await user.keyboard('{Enter}');

      expect(handleThemeToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Complex Scenarios', () => {
    it('renders complete navigation with all features', () => {
      const handleThemeToggle = jest.fn();

      render(
        <NavigationHeader
          title="Complete App"
          logoSrc="/app-logo.png"
          logoAlt="App Logo"
          isDarkMode={true}
          onThemeToggle={handleThemeToggle}
          className="custom-nav"
        >
          <span>Nav Item 1</span>
          <span>Nav Item 2</span>
        </NavigationHeader>
      );

      expect(screen.getByText('Complete App')).toBeInTheDocument();
      expect(screen.getByAltText('App Logo')).toBeInTheDocument();
      expect(screen.getByText('☀️')).toBeInTheDocument();
      expect(screen.getByText('Nav Item 1')).toBeInTheDocument();
      expect(screen.getByText('Nav Item 2')).toBeInTheDocument();
    });

    it('maintains layout with long title', () => {
      render(
        <NavigationHeader title="Very Long Application Title That Might Wrap" />
      );
      const title = screen.getByText('Very Long Application Title That Might Wrap');
      expect(title).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty title', () => {
      render(<NavigationHeader title="" />);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('handles undefined logo src gracefully', () => {
      render(<NavigationHeader logoSrc={undefined} />);
      expect(screen.getByText('🏥')).toBeInTheDocument();
    });

    it('handles children as null', () => {
      render(<NavigationHeader>{null}</NavigationHeader>);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });
});