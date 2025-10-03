import React, { useState, useCallback } from 'react';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import styles from './style.module.css';

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: () => void;
  onReset?: () => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onReset,
  placeholder = 'Search advocates by name, city, or specialty...',
  loading = false,
  className = '',
}) => {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  }, [onSearch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }, [onSearch]);

  const handleClear = useCallback(() => {
    onSearchChange('');
    onReset?.();
  }, [onSearchChange, onReset]);

  const containerClasses = [
    styles.searchBar,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchInputWrapper}>
          <Input
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            size="large"
            fullWidth
            leftIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            }
            className={styles.searchInput}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="large"
          loading={loading}
          className={styles.searchButton}
        >
          Search
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="large"
          onClick={handleClear}
          className={styles.resetButton}
        >
          Reset
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;