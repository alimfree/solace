import React, { forwardRef } from 'react';
import styles from './style.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled';
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helperText,
  size = 'medium',
  variant = 'outlined',
  required = false,
  fullWidth = false,
  placeholder,
  options,
  className = '',
  disabled = false,
  id,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const selectClasses = [
    styles.select,
    styles[size],
    styles[variant],
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    styles.container,
    fullWidth ? styles.fullWidth : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label
          htmlFor={selectId}
          className={`${styles.label} ${required ? styles.required : ''}`}
        >
          {label}
        </label>
      )}

      <div className={styles.selectWrapper}>
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${selectId}-error` :
            helperText ? `${selectId}-helper` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className={styles.chevron}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </div>
      </div>

      {error && (
        <div
          id={`${selectId}-error`}
          className={styles.errorText}
          role="alert"
        >
          {error}
        </div>
      )}

      {helperText && !error && (
        <div
          id={`${selectId}-helper`}
          className={styles.helperText}
        >
          {helperText}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;