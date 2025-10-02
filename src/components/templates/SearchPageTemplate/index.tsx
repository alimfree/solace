import React from 'react';
import Header from '../../organisms/Header';
import AdvancedFilters from '../../organisms/AdvancedFilters';
import SearchSection from '../../organisms/SearchSection';
import AdvocateList from '../../organisms/AdvocateList';
import LoadingState from '../../molecules/LoadingState';
import { Advocate, AdvocateFilters } from '../../../types/advocate';
import styles from './style.module.css';

export interface SearchPageTemplateProps {
  // Header props
  title?: string;
  logoSrc?: string;
  showThemeToggle?: boolean;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  showAddButton?: boolean;
  onAddAdvocate?: () => void;

  // Search props
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: () => void;
  onSearchReset: () => void;

  // Filter props
  filters: AdvocateFilters;
  onFiltersChange: (filters: AdvocateFilters) => void;
  onFiltersApply: () => void;
  onFiltersClear: () => void;

  // Data props
  advocates: Advocate[];
  resultsCount?: number;
  totalCount?: number;
  loading?: boolean;
  filtersLoading?: boolean;
  error?: string | null;

  // List props
  onAdvocateClick?: (advocate: Advocate) => void;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  hasMore?: boolean;

  // Layout props
  className?: string;
}

const SearchPageTemplate: React.FC<SearchPageTemplateProps> = ({
  // Header
  title = 'Solace',
  logoSrc,
  showThemeToggle = true,
  isDarkMode = false,
  onThemeToggle,
  showAddButton = true,
  onAddAdvocate,

  // Search
  searchTerm,
  onSearchChange,
  onSearch,
  onSearchReset,

  // Filters
  filters,
  onFiltersChange,
  onFiltersApply,
  onFiltersClear,

  // Data
  advocates,
  resultsCount,
  totalCount,
  loading = false,
  filtersLoading = false,
  error = null,

  // List
  onAdvocateClick,
  showLoadMore = false,
  onLoadMore,
  loadingMore = false,
  hasMore = false,

  // Layout
  className = ''
}) => {
  const containerClasses = [
    styles.container,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Header */}
      <Header
        title={title}
        logoSrc={logoSrc}
        showThemeToggle={showThemeToggle}
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        showAddButton={showAddButton}
        onAddAdvocate={onAddAdvocate}
        variant="full"
        className={styles.header}
      />

      {/* Main Content Area */}
      <div className={styles.main}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <AdvancedFilters
              filters={filters}
              onFiltersChange={onFiltersChange}
              onApply={onFiltersApply}
              onClear={onFiltersClear}
              loading={filtersLoading}
              className={styles.filters}
            />
          </div>
        </aside>

        {/* Content */}
        <main className={styles.content}>
          {/* Search Section */}
          <SearchSection
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onSearch={onSearch}
            onReset={onSearchReset}
            filters={filters}
            resultsCount={resultsCount}
            totalCount={totalCount}
            loading={loading}
            className={styles.searchSection}
          />

          {/* Results */}
          <div className={styles.results}>
            {loading && advocates.length === 0 ? (
              <div className={styles.loadingContainer}>
                <LoadingState
                  message="Searching advocates..."
                  size="large"
                />
              </div>
            ) : (
              <AdvocateList
                advocates={advocates}
                loading={loading}
                error={error}
                emptyMessage="No advocates found matching your search criteria. Try adjusting your filters or search terms."
                layout="grid"
                onAdvocateClick={onAdvocateClick}
                showLoadMore={showLoadMore}
                onLoadMore={onLoadMore}
                loadingMore={loadingMore}
                hasMore={hasMore}
                className={styles.advocateList}
              />
            )}
          </div>
        </main>
      </div>

    </div>
  );
};

export default SearchPageTemplate;