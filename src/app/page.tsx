"use client";

import { useEffect, useCallback } from "react";
import { useAdvocates, useSearch, useFilterOptions } from "../store";
import SearchBar from "../components/molecules/SearchBar";
import Badge from "../components/atoms/Badge";
import ThemeToggle from "../components/atoms/ThemeToggle";
import styles from "./page.module.css";

export default function Home() {
  const {
    advocates,
    loading,
    error,
    fetchAdvocates,
    clearError
  } = useAdvocates();

  const {
    searchQuery,
    filters,
    filteredAdvocates,
    setSearchQuery,
    setFilters,
    clearSearch
  } = useSearch();

  const { cityOptions, specialtyOptions, experienceOptions } = useFilterOptions();

  useEffect(() => {
    fetchAdvocates();
  }, [fetchAdvocates]);

  const handleSearch = useCallback((searchFilters: any) => {
    if (searchFilters.query !== undefined) {
      setSearchQuery(searchFilters.query);
    }
    if (searchFilters.city || searchFilters.specialty || searchFilters.experience) {
      setFilters({
        city: searchFilters.city || '',
        specialty: searchFilters.specialty || '',
        experience: searchFilters.experience || ''
      });
    }
  }, [setSearchQuery, setFilters]);

  const handleClear = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  if (error) {
    return (
      <div className={styles.error}>
        <h1>Error Loading Advocates</h1>
        <p>{error}</p>
        <button onClick={clearError}>Try Again</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Solace Advocates</h1>
        <ThemeToggle />
      </header>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filtersCard}>
            <h2 className={styles.filtersTitle}>Advanced Filters</h2>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Degree</label>
              <select
                className={styles.filterSelect}
                value={filters.degree || ''}
                onChange={(e) => setFilters({ degree: e.target.value })}
              >
                <option value="">All Degrees</option>
                <option value="MD">MD</option>
                <option value="PhD">PhD</option>
                <option value="MSW">MSW</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Years of Experience</label>
              <input
                type="number"
                placeholder="Min. years"
                className={styles.filterInput}
                value={filters.minExperience || ''}
                onChange={(e) => setFilters({ minExperience: e.target.value })}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Specialties</label>
              <select
                className={styles.filterSelect}
                value={filters.specialty || ''}
                onChange={(e) => setFilters({ specialty: e.target.value })}
              >
                <option value="">All Specialties</option>
                {specialtyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterButtons}>
              <button className={styles.applyButton}>Apply Filters</button>
              <button className={styles.clearButton} onClick={handleClear}>
                Clear Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Search Section */}
          <div className={styles.searchCard}>
            <h2 className={styles.searchTitle}>Search</h2>
            <SearchBar
              onSearch={handleSearch}
              onClear={handleClear}
              cityOptions={cityOptions}
              specialtyOptions={specialtyOptions}
              experienceOptions={experienceOptions}
              loading={loading}
              initialFilters={{
                query: searchQuery,
                city: filters.city,
                specialty: filters.specialty,
                experience: filters.experience
              }}
            />
          </div>

          {/* Results Table - Desktop */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Degree</th>
                  <th>Specialties</th>
                  <th>Years of Exp</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdvocates.map((advocate) => (
                  <tr key={advocate.id} className={styles.tableRow}>
                    <td>{advocate.firstName} {advocate.lastName}</td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td className={styles.specialties}>
                      {advocate.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="specialty"
                          size="small"
                          shape="pill"
                          className={styles.specialtyBadge}
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{advocate.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Results Cards - Mobile */}
          <div className={styles.cardsContainer}>
            {filteredAdvocates.map((advocate) => (
              <div key={advocate.id} className={styles.advocateCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.advocateName}>
                      {advocate.firstName} {advocate.lastName}, {advocate.degree}
                    </h3>
                    <p className={styles.advocateCity}>{advocate.city}</p>
                  </div>
                  <div className={styles.cardMeta}>
                    <p className={styles.advocateExp}>{advocate.yearsOfExperience} yrs exp.</p>
                  </div>
                </div>
                <div className={styles.specialties}>
                  {advocate.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="specialty"
                      size="small"
                      shape="pill"
                      className={styles.specialtyBadge}
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <p className={styles.advocatePhone}>{advocate.phoneNumber}</p>
              </div>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className={styles.loading}>
              <p>Loading advocates...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredAdvocates.length === 0 && advocates.length > 0 && (
            <div className={styles.empty}>
              <p>No advocates found matching your criteria.</p>
              <button onClick={handleClear}>Clear filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
