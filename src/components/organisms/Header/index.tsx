import React from 'react';
import NavigationHeader from '../../molecules/NavigationHeader';
import Button from '../../atoms/Button';
import styles from './style.module.css';

export interface HeaderProps {
  title?: string;
  logoSrc?: string;
  logoAlt?: string;
  showThemeToggle?: boolean;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  showAddButton?: boolean;
  onAddAdvocate?: () => void;
  showUserActions?: boolean;
  userName?: string;
  onUserMenuClick?: () => void;
  onLogout?: () => void;
  className?: string;
  variant?: 'simple' | 'full' | 'compact';
}

const Header: React.FC<HeaderProps> = ({
  title = 'Solace',
  logoSrc,
  logoAlt = 'Solace Logo',
  showThemeToggle = true,
  isDarkMode = false,
  onThemeToggle,
  showAddButton = false,
  onAddAdvocate,
  showUserActions = false,
  userName,
  onUserMenuClick,
  onLogout,
  className = '',
  variant = 'full'
}) => {
  const containerClasses = [
    styles.container,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  const renderActions = () => {
    const actions = [];

    // Add Advocate Button
    if (showAddButton) {
      actions.push(
        <Button
          key="add-advocate"
          variant="primary"
          size="small"
          onClick={onAddAdvocate}
          className={styles.addButton}
        >
          + Add Advocate
        </Button>
      );
    }

    // User Actions
    if (showUserActions) {
      actions.push(
        <div key="user-actions" className={styles.userActions}>
          {userName && (
            <span className={styles.userName}>
              Hello, {userName}
            </span>
          )}
          <div className={styles.userMenu}>
            <Button
              variant="ghost"
              size="small"
              onClick={onUserMenuClick}
              className={styles.userMenuButton}
              aria-label="User menu"
            >
              <span className={styles.userIcon}>👤</span>
            </Button>
            {onLogout && (
              <Button
                variant="ghost"
                size="small"
                onClick={onLogout}
                className={styles.logoutButton}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      );
    }

    return actions;
  };

  const actions = renderActions();

  return (
    <div className={containerClasses}>
      <NavigationHeader
        title={title}
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        showThemeToggle={showThemeToggle}
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        className={styles.navigation}
      >
        {actions.length > 0 && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </NavigationHeader>

      {variant === 'full' && (
        <div className={styles.breadcrumb}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbNav}>
            <ol className={styles.breadcrumbList}>
              <li className={styles.breadcrumbItem}>
                <a href="/" className={styles.breadcrumbLink}>
                  Home
                </a>
              </li>
              <li className={styles.breadcrumbSeparator} aria-hidden="true">
                /
              </li>
              <li className={styles.breadcrumbItem} aria-current="page">
                <span className={styles.breadcrumbCurrent}>
                  Advocates
                </span>
              </li>
            </ol>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;