import React from 'react';
import Button from '../../atoms/Button';
import styles from './style.module.css';

export interface NavigationHeaderProps {
  title?: string;
  logoSrc?: string;
  logoAlt?: string;
  showThemeToggle?: boolean;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title = 'Solace',
  logoSrc,
  logoAlt = 'Solace Logo',
  showThemeToggle = true,
  isDarkMode = false,
  onThemeToggle,
  className = '',
  children
}) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.container}>
        <div className={styles.brand}>
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoAlt}
              className={styles.logo}
            />
          ) : (
            <div className={styles.logoPlaceholder}>
              <span className={styles.logoIcon}>🏥</span>
            </div>
          )}
          <h1 className={styles.title}>{title}</h1>
        </div>

        <div className={styles.nav}>
          {children && (
            <div className={styles.navContent}>
              {children}
            </div>
          )}

          {showThemeToggle && (
            <Button
              variant="ghost"
              size="small"
              onClick={onThemeToggle}
              className={styles.themeToggle}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className={styles.themeIcon}>
                {isDarkMode ? '☀️' : '🌙'}
              </span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;