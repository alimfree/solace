# Solace Advocates - Implementation Plan

## Overview
Transform the monolithic Next.js application into a professional, atomic design-based system with improved search functionality, TypeScript safety, and component reusability.

## Database Schema Analysis

### Current Schema (Drizzle ORM)
```typescript
// src/db/schema.ts
const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("payload").default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});
```

### Required TypeScript Types (Minimal Exposure)
```typescript
// src/types/advocate.ts
export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number; // Only for display, no editing
}

// src/types/search.ts
export interface SearchFilters {
  searchTerm: string;
  degree: string;
  minExperience: number | null;
  specialty: string;
}

export interface SearchState {
  filters: SearchFilters;
  results: Advocate[];
  loading: boolean;
  error: string | null;
}
```

## Mockup Analysis & Component Breakdown

### Design System (From mockup.html)
- **Primary Color**: #145A5A (teal)
- **Layout**: Sidebar filters + main content area
- **Cards**: Clean white cards with shadows
- **Typography**: Inter font family
- **Dark mode**: Full dark theme support

### Component Hierarchy (Based on Mockup)

#### Atoms
1. **Button** - Primary, secondary, and ghost variants
2. **Input** - Text input with search icon
3. **Select** - Dropdown for filters
4. **Badge** - Specialty tags (green/teal variants)
5. **Label** - Form labels
6. **Icon** - Material icons wrapper

#### Molecules
1. **SearchBar** - Input + search icon + buttons
2. **FilterGroup** - Label + Select/Input
3. **AdvocateCard** - Name, city, degree, specialties, experience, phone
4. **SpecialtyTags** - Multiple badges for specialties
5. **FilterActions** - Apply/Clear filter buttons

#### Organisms
1. **AdvancedFilters** - Complete sidebar with all filters
2. **SearchSection** - Search bar with actions
3. **AdvocateList** - Grid/table of advocate cards
4. **Header** - App title and branding

#### Templates
1. **SearchPageTemplate** - Two-column layout (filters + content)

#### Pages
1. **AdvocatesPage** - Complete page with Zustand integration

## Implementation Steps

### Phase 1: Foundation Setup (Days 1-2)

#### 1.1 Install Dependencies
```bash
npm install zustand
npm install --save-dev @storybook/react @storybook/addon-essentials
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

#### 1.2 Create Directory Structure
```
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── pages/
├── store/
├── types/
├── styles/
└── utils/
```

#### 1.3 Setup TypeScript Types
- Create `src/types/advocate.ts`
- Create `src/types/search.ts`
- Create `src/types/filters.ts`

#### 1.4 Setup CSS Modules with Design Tokens
```css
/* src/styles/tokens.css */
:root {
  --color-primary: #145A5A;
  --color-background-light: #F8F7F4;
  --color-card-light: #FFFFFF;
  --color-text-light: #333333;
  --color-subtle-light: #6B7280;
  /* Dark theme variables */
}
```

### Phase 2: Atomic Components (Days 3-5)

#### 2.1 Create Atoms
**Priority Order:**
1. **Button** (`src/components/atoms/Button/`)
   ```tsx
   interface ButtonProps {
     children: React.ReactNode;
     onClick?: () => void;
     variant?: 'primary' | 'secondary' | 'ghost';
     size?: 'small' | 'medium' | 'large';
     type?: 'button' | 'submit' | 'reset';
     disabled?: boolean;
   }
   ```

2. **Input** (`src/components/atoms/Input/`)
   ```tsx
   interface InputProps {
     value: string;
     onChange: (value: string) => void;
     placeholder?: string;
     type?: 'text' | 'number' | 'email';
     icon?: React.ReactNode;
     disabled?: boolean;
   }
   ```

3. **Select** (`src/components/atoms/Select/`)
   ```tsx
   interface SelectProps {
     value: string;
     onChange: (value: string) => void;
     options: { value: string; label: string }[];
     placeholder?: string;
     disabled?: boolean;
   }
   ```

4. **Badge** (`src/components/atoms/Badge/`)
   ```tsx
   interface BadgeProps {
     text: string;
     variant?: 'primary' | 'secondary' | 'success';
     size?: 'small' | 'medium';
   }
   ```

#### 2.2 Add Storybook & Jest for Each Atom
- Create `.stories.tsx` file for each component
- Create `.test.tsx` file for each component
- Document props and variants in Storybook

### Phase 3: Molecular Components (Days 6-8)

#### 3.1 SearchBar Molecule
```tsx
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  placeholder?: string;
  loading?: boolean;
}
```

#### 3.2 FilterGroup Molecule
```tsx
interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}
```

#### 3.3 AdvocateCard Molecule
```tsx
interface AdvocateCardProps {
  advocate: Advocate;
  onClick?: (advocate: Advocate) => void;
}
```

#### 3.4 SpecialtyTags Molecule
```tsx
interface SpecialtyTagsProps {
  specialties: string[];
  maxVisible?: number;
}
```

### Phase 4: State Management (Days 9-10)

#### 4.1 Create Zustand Store Structure
```typescript
// src/store/index.ts
export const useStore = create<StoreState>()((...a) => ({
  ...createAdvocatesSlice(...a),
  ...createSearchSlice(...a),
  ...createFiltersSlice(...a),
}));
```

#### 4.2 Advocates Slice
```typescript
// src/store/advocatesSlice.ts
export interface AdvocatesSlice {
  advocates: Advocate[];
  loading: boolean;
  error: string | null;
  fetchAdvocates: () => Promise<void>;
}
```

#### 4.3 Search & Filters Slice
```typescript
// src/store/searchSlice.ts
export interface SearchSlice {
  searchTerm: string;
  filteredAdvocates: Advocate[];
  setSearchTerm: (term: string) => void;
  debounceSearch: (term: string) => void;
}

// src/store/filtersSlice.ts
export interface FiltersSlice {
  filters: SearchFilters;
  setDegreeFilter: (degree: string) => void;
  setExperienceFilter: (years: number | null) => void;
  setSpecialtyFilter: (specialty: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}
```

### Phase 5: Organism Components (Days 11-13)

#### 5.1 AdvancedFilters Organism
```tsx
interface AdvancedFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onApply: () => void;
  onClear: () => void;
}
```

#### 5.2 SearchSection Organism
```tsx
interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearch: () => void;
  onReset: () => void;
}
```

#### 5.3 AdvocateList Organism
```tsx
interface AdvocateListProps {
  advocates: Advocate[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}
```

### Phase 6: Templates & Pages (Days 14-15)

#### 6.1 SearchPageTemplate
```tsx
interface SearchPageTemplateProps {
  header: React.ReactNode;
  filters: React.ReactNode;
  searchSection: React.ReactNode;
  results: React.ReactNode;
}
```

#### 6.2 AdvocatesPage (Replace current page.tsx)
- Connect all organisms with Zustand store
- Handle loading and error states
- Implement search debouncing

### Phase 7: Database Improvements (Day 16)

#### 7.1 Add Database Indexes
```sql
-- Improve search performance
CREATE INDEX idx_advocates_name ON advocates(first_name, last_name);
CREATE INDEX idx_advocates_city ON advocates(city);
CREATE INDEX idx_advocates_degree ON advocates(degree);
CREATE INDEX idx_advocates_experience ON advocates(years_of_experience);
CREATE INDEX idx_advocates_specialties ON advocates USING GIN(payload);
```

#### 7.2 Optimize Search Query
```typescript
// Enhanced search with better performance
const searchAdvocates = async (filters: SearchFilters) => {
  const query = db.select().from(advocates);

  if (filters.searchTerm) {
    query.where(
      or(
        ilike(advocates.firstName, `%${filters.searchTerm}%`),
        ilike(advocates.lastName, `%${filters.searchTerm}%`),
        ilike(advocates.city, `%${filters.searchTerm}%`)
      )
    );
  }

  if (filters.degree) {
    query.where(eq(advocates.degree, filters.degree));
  }

  // Add other filters...

  return query.limit(50); // Pagination
};
```

### Phase 8: Testing & Storybook (Days 17-18)

#### 8.1 Complete Component Tests
- Unit tests for all atoms and molecules
- Integration tests for organisms
- Storybook stories for all components

#### 8.2 Setup Storybook
```javascript
// .storybook/main.js
module.exports = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
};
```

## Database Indexing Strategy

### Current Issues
- No indexes on searchable fields
- JSONB specialties field not optimized
- Full table scans on every search

### Implementation
```sql
-- Text search indexes
CREATE INDEX CONCURRENTLY idx_advocates_search_text ON advocates
USING gin(to_tsvector('english', first_name || ' ' || last_name || ' ' || city));

-- Individual field indexes
CREATE INDEX CONCURRENTLY idx_advocates_degree ON advocates(degree);
CREATE INDEX CONCURRENTLY idx_advocates_experience ON advocates(years_of_experience);

-- JSONB specialties index
CREATE INDEX CONCURRENTLY idx_advocates_specialties ON advocates
USING gin(payload);

-- Composite index for common filter combinations
CREATE INDEX CONCURRENTLY idx_advocates_degree_experience ON advocates(degree, years_of_experience);
```

## Integration Timeline

### Week 1: Foundation (Days 1-5)
- ✅ Dependencies and structure
- ✅ TypeScript types
- ✅ Atomic components with tests

### Week 2: Core Features (Days 6-10)
- ✅ Molecular components
- ✅ Zustand store setup
- ✅ Basic functionality

### Week 3: Advanced Features (Days 11-16)
- ✅ Organism components
- ✅ Template and pages
- ✅ Database optimization
- ✅ Advanced search and filters

### Week 4: Polish & Testing (Days 17-20)
- ✅ Complete test coverage
- ✅ Storybook documentation
- ✅ Performance optimization
- ✅ Accessibility improvements

## Success Metrics

### Performance
- Search response time < 100ms
- Component bundle size < 50KB per route
- Lighthouse score > 90

### Code Quality
- 90%+ test coverage
- All components documented in Storybook
- Zero TypeScript errors
- ESLint compliance

### User Experience
- Responsive design (mobile-first)
- Accessible (WCAG 2.1 AA)
- Loading states for all async operations
- Clear error handling

This implementation plan transforms the current monolithic structure into a maintainable, scalable, and performant application following atomic design principles and modern development practices.