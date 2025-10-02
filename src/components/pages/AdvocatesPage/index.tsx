'use client';

import React, { useEffect } from 'react';
import SearchPageTemplate from '../../templates/SearchPageTemplate';
import { useAdvocateStore } from '../../../store/advocateStore';
import { useThemeStore } from '../../../store/themeStore';

export interface AdvocatesPageProps {
  className?: string;
}

const AdvocatesPage: React.FC<AdvocatesPageProps> = ({ className = '' }) => {
  const {
    // Data
    advocates,
    filteredAdvocates,
    loading,
    error,
    hasMore,
    loadingMore,

    // Search
    searchTerm,

    // Filters
    filters,
    filtersLoading,

    // Actions
    setSearchTerm,
    searchAdvocates,
    resetSearch,
    setFilters,
    applyFilters,
    clearFilters,
    loadMoreAdvocates,

    // Stats
    getResultsCount,
    getTotalCount
  } = useAdvocateStore();

  const {
    isDarkMode,
    toggleTheme
  } = useThemeStore();

  // Load initial data
  useEffect(() => {
    searchAdvocates();
  }, [searchAdvocates]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSearch = () => {
    searchAdvocates();
  };

  const handleSearchReset = () => {
    resetSearch();
  };

  const handleFiltersApply = () => {
    applyFilters();
  };

  const handleFiltersClear = () => {
    clearFilters();
  };

  const handleAdvocateClick = (advocate: any) => {
    // TODO: Navigate to advocate detail page or open modal
    console.log('Advocate clicked:', advocate);
  };

  const handleAddAdvocate = () => {
    // TODO: Navigate to add advocate page or open modal
    console.log('Add advocate clicked');
  };

  return (
    <SearchPageTemplate
      // Header props
      title="Solace"
      showThemeToggle={true}
      isDarkMode={isDarkMode}
      onThemeToggle={toggleTheme}
      showAddButton={true}
      onAddAdvocate={handleAddAdvocate}

      // Search props
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onSearch={handleSearch}
      onSearchReset={handleSearchReset}

      // Filter props
      filters={filters}
      onFiltersChange={setFilters}
      onFiltersApply={handleFiltersApply}
      onFiltersClear={handleFiltersClear}

      // Data props
      advocates={filteredAdvocates}
      resultsCount={getResultsCount()}
      totalCount={getTotalCount()}
      loading={loading}
      filtersLoading={filtersLoading}
      error={error}

      // List props
      onAdvocateClick={handleAdvocateClick}
      showLoadMore={hasMore}
      onLoadMore={loadMoreAdvocates}
      loadingMore={loadingMore}
      hasMore={hasMore}

      // Layout props
      sidebarCollapsed={false}
      onSidebarToggle={() => {
        // TODO: Implement sidebar state management
        console.log('Sidebar toggle clicked');
      }}
      className={className}
    />
  );
};

export default AdvocatesPage;