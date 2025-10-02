import React from 'react';
import FilterPanel from '../../molecules/FilterPanel';
import Button from '../../atoms/Button';
import { AdvocateFilters } from '../../../types/advocate';
import styles from './style.module.css';

export interface AdvancedFiltersProps {
  filters: AdvocateFilters;
  onFiltersChange: (filters: AdvocateFilters) => void;
  onApply: () => void;
  onClear: () => void;
  loading?: boolean;
  className?: string;
  collapsible?: boolean;
  initiallyCollapsed?: boolean;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onApply,
  onClear,
  loading = false,
  className = '',
  collapsible = false,
  initiallyCollapsed = false
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(initiallyCollapsed);

  const hasActiveFilters = Boolean(
    filters.specialty ||
    filters.city ||
    filters.degree ||
    filters.experienceRange
  );

  const handleClearFilters = () => {
    onClear();
    // Also clear the FilterPanel filters
    onFiltersChange({
      specialty: undefined,
      city: undefined,
      degree: undefined,
      experienceRange: undefined
    });
  };

  const containerClasses = [
    styles.container,
    isCollapsed ? styles.collapsed : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {collapsible && (
        <div className={styles.header}>
          <h2 className={styles.title}>Filters</h2>
          <Button
            variant="ghost"
            size="small"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={styles.toggleButton}
            aria-label={isCollapsed ? 'Expand filters' : 'Collapse filters'}
          >
            <span className={`${styles.chevron} ${isCollapsed ? styles.chevronDown : styles.chevronUp}`}>
              ⌄
            </span>
          </Button>
        </div>
      )}

      <div className={styles.content}>
        <FilterPanel
          filters={filters}
          onFiltersChange={onFiltersChange}
          onClearFilters={handleClearFilters}
          className={styles.filterPanel}
        />

        <div className={styles.actions}>
          <Button
            variant="primary"
            onClick={onApply}
            disabled={loading}
            loading={loading}
            className={styles.applyButton}
          >
            Apply Filters
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={handleClearFilters}
              disabled={loading}
              className={styles.clearButton}
            >
              Clear All
            </Button>
          )}
        </div>

        {hasActiveFilters && (
          <div className={styles.summary}>
            <span className={styles.summaryText}>
              Active filters: {[
                filters.specialty && 'Specialty',
                filters.city && 'City',
                filters.degree && 'Degree',
                filters.experienceRange && 'Experience'
              ].filter(Boolean).join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedFilters;