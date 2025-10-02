import React from 'react';
import styles from './style.module.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  shape?: 'rounded' | 'pill';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  shape = 'rounded',
  className = '',
  onClick,
  icon,
  removable = false,
  onRemove,
}) => {
  const badgeClasses = [
    styles.badge,
    styles[variant],
    styles[size],
    styles[shape],
    onClick ? styles.clickable : '',
    className
  ].filter(Boolean).join(' ');

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // Use div wrapper when both clickable and removable to avoid button nesting
  const shouldUseDiv = onClick && removable && onRemove;
  const TagName = shouldUseDiv ? 'div' : (onClick ? 'button' : 'span');

  const content = (
    <>
      {icon && (
        <span className={styles.icon}>
          {icon}
        </span>
      )}

      <span className={styles.content}>
        {children}
      </span>

      {removable && onRemove && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remove"
          tabIndex={0}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </>
  );

  if (shouldUseDiv) {
    return (
      <div className={badgeClasses}>
        <button
          type="button"
          className={styles.clickableContent}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {icon && (
            <span className={styles.icon}>
              {icon}
            </span>
          )}
          <span className={styles.content}>
            {children}
          </span>
        </button>
        <button
          type="button"
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remove"
          tabIndex={0}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <TagName
      className={badgeClasses}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      type={onClick ? 'button' : undefined}
    >
      {content}
    </TagName>
  );
};

export default Badge;