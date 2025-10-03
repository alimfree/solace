import React, { useState } from 'react';
import Select from '../../atoms/Select';
import Button from '../../atoms/Button';
import { AdvocateFilters } from '../../../types/advocate';
import styles from './style.module.css';

export interface FilterPanelProps {
  filters: AdvocateFilters;
  onFiltersChange: (filters: AdvocateFilters) => void;
  onClearFilters: () => void;
  className?: string;
  defaultCollapsed?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className = '',
  defaultCollapsed = false
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const handleSpecialtyChange = (value: string) => {
    onFiltersChange({
      ...filters,
      specialty: value || undefined
    });
  };

  const handleCityChange = (value: string) => {
    onFiltersChange({
      ...filters,
      city: value || undefined
    });
  };

  const handleDegreeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      degree: value || undefined
    });
  };

  const handleExperienceChange = (value: string) => {
    onFiltersChange({
      ...filters,
      experienceRange: value || undefined
    });
  };

  const hasActiveFilters = Boolean(
    filters.specialty ||
    filters.city ||
    filters.degree ||
    filters.experienceRange
  );

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.filterPanel} ${isCollapsed ? styles.collapsed : ''} ${className}`}>
      <button
        type="button"
        onClick={toggleCollapse}
        className={styles.toggleButton}
        aria-expanded={!isCollapsed}
        aria-controls="filter-content"
      >
        <h3 className={styles.title}>Advanced Filters</h3>
        <span className={`${styles.toggleIcon} ${isCollapsed ? styles.rotated : ''}`}>
          ▼
        </span>
      </button>

      {!isCollapsed && (
        <>
          {hasActiveFilters && (
            <div className={styles.clearButtonContainer}>
              <Button
                variant="ghost"
                size="small"
                onClick={onClearFilters}
                className={styles.clearButton}
              >
                Clear All
              </Button>
            </div>
          )}
          <div id="filter-content" className={styles.filters}>
        <div className={styles.filterGroup}>
          <Select
            label="Specialty"
            value={filters.specialty || ''}
            onChange={handleSpecialtyChange}
            placeholder="All Specialties"
            className={styles.select}
            options={[
              { value: '', label: 'All Specialties' },
              { value: 'Cardiology', label: 'Cardiology' },
              { value: 'Internal Medicine', label: 'Internal Medicine' },
              { value: 'Neurology', label: 'Neurology' },
              { value: 'Pulmonology', label: 'Pulmonology' },
              { value: 'Critical Care', label: 'Critical Care' },
              { value: 'Emergency Medicine', label: 'Emergency Medicine' },
              { value: 'Clinical Psychology', label: 'Clinical Psychology' },
              { value: 'Cognitive Behavioral Therapy', label: 'Cognitive Behavioral Therapy' },
              { value: 'Trauma & PTSD', label: 'Trauma & PTSD' },
              { value: 'Anxiety Disorders', label: 'Anxiety Disorders' },
              { value: 'Depression Treatment', label: 'Depression Treatment' },
              { value: 'Social Work', label: 'Social Work' },
              { value: 'Corporate Law', label: 'Corporate Law' },
              { value: 'Mergers & Acquisitions', label: 'Mergers & Acquisitions' },
              { value: 'Securities Law', label: 'Securities Law' }
            ]}
          />
        </div>

        <div className={styles.filterGroup}>
          <Select
            label="City"
            value={filters.city || ''}
            onChange={handleCityChange}
            placeholder="All Cities"
            className={styles.select}
            options={[
              { value: '', label: 'All Cities' },
              { value: 'New York', label: 'New York' },
              { value: 'Los Angeles', label: 'Los Angeles' },
              { value: 'Chicago', label: 'Chicago' },
              { value: 'Houston', label: 'Houston' },
              { value: 'San Francisco', label: 'San Francisco' },
              { value: 'Miami', label: 'Miami' },
              { value: 'Boston', label: 'Boston' },
              { value: 'Seattle', label: 'Seattle' },
              { value: 'Atlanta', label: 'Atlanta' },
              { value: 'Denver', label: 'Denver' }
            ]}
          />
        </div>

        <div className={styles.filterGroup}>
          <Select
            label="Degree"
            value={filters.degree || ''}
            onChange={handleDegreeChange}
            placeholder="All Degrees"
            className={styles.select}
            options={[
              { value: '', label: 'All Degrees' },
              { value: 'MD', label: 'MD' },
              { value: 'PhD', label: 'PhD' },
              { value: 'JD', label: 'JD' },
              { value: 'MSW', label: 'MSW' },
              { value: 'PsyD', label: 'PsyD' },
              { value: 'DNP', label: 'DNP' },
              { value: 'PharmD', label: 'PharmD' }
            ]}
          />
        </div>

        <div className={styles.filterGroup}>
          <Select
            label="Experience"
            value={filters.experienceRange || ''}
            onChange={handleExperienceChange}
            placeholder="Any Experience"
            className={styles.select}
            options={[
              { value: '', label: 'Any Experience' },
              { value: '0-2', label: '0-2 years' },
              { value: '3-5', label: '3-5 years' },
              { value: '6-10', label: '6-10 years' },
              { value: '11-15', label: '11-15 years' },
              { value: '16-20', label: '16-20 years' },
              { value: '20+', label: '20+ years' }
            ]}
          />
        </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;