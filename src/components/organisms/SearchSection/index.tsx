import React from 'react';
import SearchBar from '../../molecules/SearchBar';
import Button from '../../atoms/Button';
import Badge from '../../atoms/Badge';
import { AdvocateFilters } from '../../../types/advocate';
import styles from './style.module.css';

export interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: () => void;
  onReset: () => void;
  filters?: AdvocateFilters;
  resultsCount?: number;
  totalCount?: number;
  loading?: boolean;
  className?: string;
  showResultsCount?: boolean;
  showActiveFilters?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onReset,
  filters,
  resultsCount,
  totalCount,
  loading = false,
  className = '',
  showResultsCount = true,
  showActiveFilters = true
}) => {
  const activeFilters = React.useMemo(() => {
    if (!filters) return [];

    const active = [];
    if (filters.specialty) active.push({ key: 'specialty', label: `Specialty: ${filters.specialty}` });
    if (filters.city) active.push({ key: 'city', label: `City: ${filters.city}` });
    if (filters.degree) active.push({ key: 'degree', label: `Degree: ${filters.degree}` });
    if (filters.experienceRange) active.push({ key: 'experience', label: `Experience: ${filters.experienceRange} years` });

    return active;
  }, [filters]);

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.searchWrapper}>
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          onSearch={onSearch}
          onReset={onReset}
          placeholder="Search advocates by name, city, or specialty..."
          loading={loading}
          className={styles.searchBar}
        />
      </div>

      <div className={styles.meta}>
        {showResultsCount && (resultsCount !== undefined || totalCount !== undefined) && (
          <div className={styles.resultsCount}>
            {loading ? (
              <span className={styles.countText}>Searching...</span>
            ) : (
              <span className={styles.countText}>
                {resultsCount !== undefined && totalCount !== undefined ? (
                  `Showing ${resultsCount} of ${totalCount} advocates`
                ) : resultsCount !== undefined ? (
                  `${resultsCount} advocates found`
                ) : totalCount !== undefined ? (
                  `${totalCount} total advocates`
                ) : (
                  'No results'
                )}
              </span>
            )}
          </div>
        )}

        {showActiveFilters && hasActiveFilters && (
          <div className={styles.activeFilters}>
            <span className={styles.filtersLabel}>Active filters:</span>
            <div className={styles.filterBadges}>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.key}
                  variant="info"
                  size="small"
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="small"
            onClick={onReset}
            className={styles.clearAllButton}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchSection;