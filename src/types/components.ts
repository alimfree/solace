import { ReactNode } from 'react';
import { Advocate, SearchFilters } from './index';

/**
 * Base component props
 */
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Button component props
 */
export interface ButtonProps extends BaseComponentProps {
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Input component props
 */
export interface InputProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'tel';
  icon?: ReactNode;
  disabled?: boolean;
  error?: string;
}

/**
 * Select component props
 */
export interface SelectProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

/**
 * Badge component props
 */
export interface BadgeProps extends BaseComponentProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium';
}

/**
 * SearchBar component props
 */
export interface SearchBarProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  placeholder?: string;
  loading?: boolean;
}

/**
 * AdvocateCard component props
 */
export interface AdvocateCardProps extends BaseComponentProps {
  advocate: Advocate;
  onClick?: (advocate: Advocate) => void;
  layout?: 'card' | 'row';
}

/**
 * AdvocateList component props
 */
export interface AdvocateListProps extends BaseComponentProps {
  advocates: Advocate[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  layout?: 'grid' | 'table';
}

/**
 * AdvancedFilters component props
 */
export interface AdvancedFiltersProps extends BaseComponentProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onApply: () => void;
  onClear: () => void;
  loading?: boolean;
}