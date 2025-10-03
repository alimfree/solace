import React from 'react';
import styles from './style.module.css';

export interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'medium',
  className = '',
  fullScreen = false,
  overlay = false
}) => {
  const containerClasses = [
    styles.container,
    styles[size],
    fullScreen ? styles.fullScreen : '',
    overlay ? styles.overlay : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} aria-hidden="true">
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
          <div className={styles.spinnerRing}></div>
        </div>
      </div>
      {message && (
        <div className={styles.message}>
          {message}
        </div>
      )}
      <span className={styles.srOnly}>Loading content, please wait</span>
    </div>
  );
};

export default LoadingState;