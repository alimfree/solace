import React from 'react';
import AdvocateCard from '../../molecules/AdvocateCard';
import LoadingState from '../../molecules/LoadingState';
import Button from '../../atoms/Button';
import { Advocate } from '../../../types/advocate';
import styles from './style.module.css';

export interface AdvocateListProps {
  advocates: Advocate[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  layout?: 'grid' | 'table' | 'list';
  onAdvocateClick?: (advocate: Advocate) => void;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  hasMore?: boolean;
  className?: string;
  itemsPerPage?: number;
}

const AdvocateList: React.FC<AdvocateListProps> = ({
  advocates,
  loading = false,
  error = null,
  emptyMessage = 'No advocates found',
  layout = 'grid',
  onAdvocateClick,
  showLoadMore = false,
  onLoadMore,
  loadingMore = false,
  hasMore = false,
  className = '',
  itemsPerPage = 12
}) => {
  const containerClasses = [
    styles.container,
    styles[layout],
    className
  ].filter(Boolean).join(' ');

  // Loading state
  if (loading && advocates.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingState
          message="Loading advocates..."
          size="large"
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3 className={styles.errorTitle}>Something went wrong</h3>
          <p className={styles.errorMessage}>{error}</p>
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && advocates.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3 className={styles.emptyTitle}>No advocates found</h3>
          <p className={styles.emptyMessage}>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className={styles.list}>
        {advocates.map((advocate) => (
          <div key={advocate.id} className={styles.item}>
            <AdvocateCard
              advocate={advocate}
              onClick={onAdvocateClick}
              className={styles.card}
            />
          </div>
        ))}
      </div>

      {/* Load More / Pagination */}
      {showLoadMore && hasMore && (
        <div className={styles.loadMoreContainer}>
          <Button
            variant="secondary"
            onClick={onLoadMore}
            loading={loadingMore}
            disabled={loadingMore}
            className={styles.loadMoreButton}
          >
            {loadingMore ? 'Loading...' : 'Load More Advocates'}
          </Button>
        </div>
      )}

      {/* Loading more state */}
      {loadingMore && (
        <div className={styles.loadingMoreContainer}>
          <LoadingState
            message="Loading more advocates..."
            size="small"
          />
        </div>
      )}

      {/* Results summary */}
      <div className={styles.summary}>
        <span className={styles.summaryText}>
          Showing {advocates.length} advocate{advocates.length !== 1 ? 's' : ''}
          {hasMore && ' (more available)'}
        </span>
      </div>
    </div>
  );
};

export default AdvocateList;