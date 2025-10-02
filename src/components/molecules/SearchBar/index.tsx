import React, { useState, useCallback } from 'react';
import Input from '../../atoms/Input';
import Select from '../../atoms/Select';
import Button from '../../atoms/Button';
import Badge from '../../atoms/Badge';
import styles from './style.module.css';

export interface SearchFilters {
  query: string;
  city: string;
  specialty: string;
  experience: string;
}

export interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  onClear?: () => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
  showAdvancedFilters?: boolean;
  cityOptions?: Array<{ value: string; label: string }>;
  specialtyOptions?: Array<{ value: string; label: string }>;
  experienceOptions?: Array<{ value: string; label: string }>;
  initialFilters?: Partial<SearchFilters>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  placeholder = 'Search advocates by name, specialty, or location...',
  loading = false,
  className = '',
  showAdvancedFilters = true,
  cityOptions = [],
  specialtyOptions = [],
  experienceOptions = [],
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    city: '',
    specialty: '',
    experience: '',
    ...initialFilters,
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleInputChange = useCallback((field: keyof SearchFilters) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newFilters = { ...filters, [field]: e.target.value };
    setFilters(newFilters);
  }, [filters]);

  const handleSelectChange = useCallback((field: keyof SearchFilters) => (
    value: string
  ) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  }, [filters]);

  const handleSearch = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch(filters);
  }, [filters, onSearch]);

  const handleClear = useCallback(() => {
    const clearedFilters = {
      query: '',
      city: '',
      specialty: '',
      experience: '',
    };
    setFilters(clearedFilters);
    onClear?.();
    onSearch(clearedFilters);
  }, [onClear, onSearch]);

  const handleRemoveFilter = useCallback((field: keyof SearchFilters) => {
    const newFilters = { ...filters, [field]: '' };
    setFilters(newFilters);
    onSearch(newFilters);
  }, [filters, onSearch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const getActiveFilters = useCallback(() => {
    const active: Array<{ key: keyof SearchFilters; label: string; value: string }> = [];

    if (filters.city) {
      const cityLabel = cityOptions.find(opt => opt.value === filters.city)?.label || filters.city;
      active.push({ key: 'city', label: `City: ${cityLabel}`, value: filters.city });
    }

    if (filters.specialty) {
      const specialtyLabel = specialtyOptions.find(opt => opt.value === filters.specialty)?.label || filters.specialty;
      active.push({ key: 'specialty', label: `Specialty: ${specialtyLabel}`, value: filters.specialty });
    }

    if (filters.experience) {
      const experienceLabel = experienceOptions.find(opt => opt.value === filters.experience)?.label || filters.experience;
      active.push({ key: 'experience', label: `Experience: ${experienceLabel}`, value: filters.experience });
    }

    return active;
  }, [filters, cityOptions, specialtyOptions, experienceOptions]);

  const activeFilters = getActiveFilters();
  const hasFilters = activeFilters.length > 0 || filters.query.length > 0;

  const containerClasses = [
    styles.searchBar,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        {/* Main Search Input */}
        <div className={styles.searchInputWrapper}>
          <Input
            value={filters.query}
            onChange={handleInputChange('query')}
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

          {showAdvancedFilters && (
            <Button
              type="button"
              variant="ghost"
              size="large"
              onClick={() => setShowFilters(!showFilters)}
              className={styles.filterToggle}
              aria-label={showFilters ? 'Hide filters' : 'Show filters'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
              </svg>
              Filters
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && showFilters && (
          <div className={styles.filtersSection}>
            <div className={styles.filtersGrid}>
              <Select
                label="City"
                value={filters.city}
                onChange={handleSelectChange('city')}
                options={[
                  { value: '', label: 'All Cities' },
                  ...cityOptions
                ]}
                placeholder="Select city"
                size="medium"
              />

              <Select
                label="Legal Specialty"
                value={filters.specialty}
                onChange={handleSelectChange('specialty')}
                options={[
                  { value: '', label: 'All Specialties' },
                  ...specialtyOptions
                ]}
                placeholder="Select specialty"
                size="medium"
              />

              <Select
                label="Experience Level"
                value={filters.experience}
                onChange={handleSelectChange('experience')}
                options={[
                  { value: '', label: 'Any Experience' },
                  ...experienceOptions
                ]}
                placeholder="Select experience"
                size="medium"
              />
            </div>
          </div>
        )}

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className={styles.activeFilters}>
            <span className={styles.activeFiltersLabel}>Active filters:</span>
            <div className={styles.filterTags}>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.key}
                  variant="secondary"
                  size="small"
                  removable
                  onRemove={() => handleRemoveFilter(filter.key)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.searchActions}>
          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={loading}
            className={styles.searchButton}
          >
            Search
          </Button>

          {hasFilters && (
            <Button
              type="button"
              variant="secondary"
              size="large"
              onClick={handleClear}
              className={styles.clearButton}
            >
              Clear All
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;