# MovieHub Pro - Full Product Specification

## Executive Summary

This document outlines the complete specification for transforming the existing Movie Discovery App into a comprehensive, modern movie and TV platform with rich features, premium UX, and full utilization of TMDB API v3.

---

## 1. Sitemap & Information Architecture

```
/                           → Home (Hero, Trending, Carousels)
/discover                   → Discover/Explore (Advanced Filters)
/discover/movies            → Movies Discovery
/discover/tv                → TV Shows Discovery
/search                     → Search Results (Multi-search with Tabs)
/movie/:id                  → Movie Details Page
/tv/:id                     → TV Show Details Page
/tv/:id/season/:seasonNum   → Season Details
/person/:id                 → Person Profile (Actor/Director)
/collection/:id             → Movie Collection (Franchise)
/watchlist                  → User Watchlist (Local)
/favorites                  → User Favorites (Local)
/compare                    → Compare Movies/Shows
/mood                       → Mood-based Discovery
```

---

## 2. User Flows

### Flow 1: Discovery Journey
```
Home → Browse Trending → Click Movie Card → Quick View Modal
                                          → Full Details Page
                                          → Add to Watchlist → Toast Confirmation
```

### Flow 2: Search Journey
```
Header Search → Type Query → See Autosuggest
             → Press Enter → Search Results (Tabs: All/Movies/TV/People)
             → Click Result → Details Page
```

### Flow 3: Advanced Filtering
```
Discover → Apply Filters (Genres, Year, Rating, Runtime)
        → Sort Results
        → Infinite Scroll
        → Click Movie → Quick View / Details
```

### Flow 4: Person Exploration
```
Movie Details → Click Actor → Person Page
             → View Filmography → Filter by Movie/TV/Year
             → Click Work → Details Page
```

### Flow 5: Mood-based Discovery
```
Mood Picker → Select Mood → Auto-apply Filters
           → Browse Results → Select Movie
```

---

## 3. Screen & Component Breakdown

### 3.1 Home Page (`/`)

**Sections:**
| Section | Component | Data Source | Priority |
|---------|-----------|-------------|----------|
| Hero Banner | `HeroBanner` | `/trending/all/day` | LCP Critical |
| Trending Today | `TrendingCarousel` | `/trending/all/day` | High |
| Trending This Week | `TrendingCarousel` | `/trending/all/week` | High |
| Now Playing | `MovieCarousel` | `/movie/now_playing` | Medium |
| Popular Movies | `MovieCarousel` | `/movie/popular` | Medium |
| Top Rated | `MovieCarousel` | `/movie/top_rated` | Medium |
| Upcoming | `MovieCarousel` | `/movie/upcoming` | Medium |
| Popular TV | `TVCarousel` | `/tv/popular` | Medium |
| Quick Genres | `GenreGrid` | `/genre/movie/list` | Medium |

**Hero Banner Features:**
- Auto-rotating backdrop (5s interval)
- Movie title, tagline, rating, year
- Quick actions: Play Trailer, More Info, Add to Watchlist
- Smooth crossfade transitions
- Pause on hover (desktop)

### 3.2 Discover Page (`/discover`)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Filter Bar (Sticky)                             │
│ [Genres▼] [Year▼] [Rating▼] [Runtime▼] [Sort▼] │
├─────────────────────────────────────────────────┤
│ Active Filters (Chips with X)                   │
├─────────────────────────────────────────────────┤
│ View Toggle: [Grid] [List] [Compact]            │
├─────────────────────────────────────────────────┤
│ Results Grid (Infinite Scroll)                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                │
│ │     │ │     │ │     │ │     │                │
│ │     │ │     │ │     │ │     │                │
│ └─────┘ └─────┘ └─────┘ └─────┘                │
└─────────────────────────────────────────────────┘
```

**Filter Parameters (from TMDB API):**
| Filter | API Parameter | Type |
|--------|--------------|------|
| Genres | `with_genres` | Multi-select (comma/pipe) |
| Primary Year | `primary_release_year` | Single year |
| Date Range | `primary_release_date.gte/lte` | Date picker |
| Min Rating | `vote_average.gte` | Slider 0-10 |
| Min Votes | `vote_count.gte` | Number |
| Runtime | `with_runtime.gte/lte` | Range slider |
| Language | `with_original_language` | Select |
| Region | `region` | Select |
| Certification | `certification` + `certification_country` | Select |
| Watch Providers | `with_watch_providers` + `watch_region` | Multi-select |
| Sort By | `sort_by` | Select |

**Sort Options:**
- `popularity.desc` (default)
- `vote_average.desc`
- `primary_release_date.desc`
- `revenue.desc`
- `vote_count.desc`

### 3.3 Search Page (`/search`)

**Components:**
- `SearchInput` - Debounced input with clear button
- `SearchSuggestions` - Autosuggest dropdown
- `SearchTabs` - All | Movies | TV | People
- `SearchResultsGrid` - Unified results display
- `SearchHistory` - Recent searches (localStorage)
- `TrendingSearches` - Popular searches display

**API Usage:**
- Primary: `/search/multi` for unified results
- Fallback: `/search/movie`, `/search/tv`, `/search/person` for tabs

### 3.4 Movie Details Page (`/movie/:id`)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ Backdrop (Full Width, Gradient Overlay)         │
│                                                 │
│   ┌────────┐  Title (Year)                     │
│   │ Poster │  Tagline                          │
│   │        │  ★ 8.5 | 2h 15m | Action, Drama   │
│   │        │  [▶ Trailer] [♡ Favorite] [📋 List]│
│   └────────┘                                    │
├─────────────────────────────────────────────────┤
│ Tab Navigation                                  │
│ [Overview] [Cast] [Media] [Similar] [Reviews]   │
├─────────────────────────────────────────────────┤
│ Tab Content Area                                │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Data Sources:**
| Section | Endpoint | Append to Response |
|---------|----------|-------------------|
| Details | `/movie/{id}` | Base call |
| Credits | `/movie/{id}/credits` | `append_to_response=credits` |
| Videos | `/movie/{id}/videos` | `append_to_response=videos` |
| Images | `/movie/{id}/images` | `append_to_response=images` |
| Keywords | `/movie/{id}/keywords` | `append_to_response=keywords` |
| Similar | `/movie/{id}/similar` | Separate call |
| Recommendations | `/movie/{id}/recommendations` | Separate call |
| Reviews | `/movie/{id}/reviews` | `append_to_response=reviews` |
| Watch Providers | `/movie/{id}/watch/providers` | `append_to_response=watch/providers` |

**Combined Request (Optimized):**
```
/movie/{id}?append_to_response=credits,videos,images,keywords,reviews,watch/providers
```

### 3.5 Person Page (`/person/:id`)

**Sections:**
- Profile header (photo, name, bio, known for)
- Known For carousel
- Filmography (filterable by Movies/TV, sortable by year)
- Photo gallery
- External links (IMDB, social)

**API:**
```
/person/{id}?append_to_response=combined_credits,images,external_ids
```

### 3.6 Quick View Modal

**Trigger:** Hover (desktop) or long-press (mobile) on movie card

**Content:**
- Poster + Backdrop
- Title, year, rating, runtime
- Brief overview (truncated)
- Genre chips
- Quick actions: Add to Watchlist, Favorite, View Details
- Trailer button (if available)

### 3.7 Watchlist & Favorites Pages

**Features:**
- Grid/List view toggle
- Sort by: Date Added, Title, Rating, Release Date
- Filter by: Movies/TV
- Bulk actions: Remove selected
- Export/Import JSON
- Undo remove (toast with action)

---

## 4. UI/Motion Decisions

### 4.1 Design System Tokens

**Colors:**
```css
/* Primary Palette */
--color-primary: #ff2d55;        /* Accent Red */
--color-primary-hover: #ff4d6d;
--color-secondary: #5856d6;      /* Purple accent */

/* Background Scale */
--color-bg-base: #0a0a0b;        /* Deepest black */
--color-bg-elevated: #141416;    /* Cards, modals */
--color-bg-surface: #1c1c1e;     /* Interactive surfaces */
--color-bg-hover: #2c2c2e;       /* Hover states */

/* Text Scale */
--color-text-primary: #ffffff;
--color-text-secondary: #a1a1a6;
--color-text-tertiary: #6e6e73;
--color-text-inverse: #000000;

/* Semantic */
--color-success: #34c759;
--color-warning: #ff9f0a;
--color-error: #ff453a;
--color-info: #0a84ff;

/* Gradients */
--gradient-hero: linear-gradient(to top, var(--color-bg-base), transparent);
--gradient-card: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
```

**Typography:**
```css
/* Font Family */
--font-primary: 'Rubik', 'Assistant', system-ui;
--font-display: 'Rubik', sans-serif;

/* Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

**Spacing:**
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

**Shadows:**
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
--shadow-md: 0 4px 6px rgba(0,0,0,0.4);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.5);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.6);
--shadow-glow: 0 0 20px rgba(255,45,85,0.3);
```

**Border Radius:**
```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

### 4.2 Motion Specifications

**Timing Functions:**
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

**Durations:**
```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
```

**Animation Types:**

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page transition | Fade + Slide Y | 300ms | ease-out |
| Modal open | Scale + Fade | 200ms | spring |
| Modal close | Fade + Scale | 150ms | ease-in |
| Card hover | Scale 1.02 + Shadow | 200ms | ease-out |
| Carousel slide | Slide X | 400ms | ease-in-out |
| Skeleton shimmer | Linear gradient | 1.5s | linear (loop) |
| Toast enter | Slide Y + Fade | 300ms | spring |
| Toast exit | Fade + Slide Y | 200ms | ease-in |
| Button press | Scale 0.97 | 100ms | ease-out |
| Backdrop load | Crossfade | 500ms | ease-in-out |

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4.3 Theme Modes

**Dark Mode (Default):**
- Deep blacks with subtle blue undertones
- High contrast text
- Accent colors pop

**Light Mode:**
- Warm white backgrounds
- Softer shadows
- Adjusted accent colors for legibility

**Cinema Mode:**
- True black background (#000)
- Maximum contrast
- Larger backdrop images
- Ambient glow effects

---

## 5. API Endpoints by Screen

### Home Page
| Endpoint | Purpose | Cache |
|----------|---------|-------|
| `GET /trending/all/day` | Hero + Trending Today | 1h |
| `GET /trending/all/week` | Trending This Week | 1h |
| `GET /movie/now_playing` | Now Playing carousel | 1h |
| `GET /movie/popular` | Popular carousel | 1h |
| `GET /movie/top_rated` | Top Rated carousel | 6h |
| `GET /movie/upcoming` | Upcoming carousel | 1h |
| `GET /tv/popular` | Popular TV carousel | 1h |
| `GET /genre/movie/list` | Genre chips | 24h |
| `GET /genre/tv/list` | TV Genre chips | 24h |

### Discover Page
| Endpoint | Purpose | Cache |
|----------|---------|-------|
| `GET /discover/movie` | Filtered movies | 5m |
| `GET /discover/tv` | Filtered TV shows | 5m |
| `GET /watch/providers/movie` | Provider list | 24h |
| `GET /configuration/countries` | Region list | 24h |
| `GET /configuration/languages` | Language list | 24h |
| `GET /certification/movie/list` | Certifications | 24h |

### Search Page
| Endpoint | Purpose | Cache |
|----------|---------|-------|
| `GET /search/multi` | Unified search | 5m |
| `GET /search/movie` | Movie search | 5m |
| `GET /search/tv` | TV search | 5m |
| `GET /search/person` | Person search | 5m |
| `GET /trending/all/day` | Trending suggestions | 1h |

### Movie Details
| Endpoint | Purpose | Cache |
|----------|---------|-------|
| `GET /movie/{id}?append_to_response=credits,videos,images,keywords,reviews,watch/providers` | All movie data | 1h |
| `GET /movie/{id}/similar` | Similar movies | 1h |
| `GET /movie/{id}/recommendations` | Recommendations | 1h |

### TV Details
| Endpoint | Purpose | Cache |
|----------|---------|-------|
| `GET /tv/{id}?append_to_response=credits,videos,images,keywords,reviews,watch/providers,aggregate_credits` | All TV data | 1h |
| `GET /tv/{id}/season/{num}` | Season details | 1h |

### Person Page
| Endpoint | Purpose | Cache |
|----------|---------|-------|
| `GET /person/{id}?append_to_response=combined_credits,images,external_ids` | Person data | 6h |

### Collections
| Endpoint | Purpose | Cache |
|----------|---------|-------|
| `GET /collection/{id}` | Collection details | 6h |

---

## 6. Component Library

### Core Components

```
src/components/
├── ui/                      # Primitives (shadcn/ui base)
│   ├── Button.tsx
│   ├── IconButton.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Slider.tsx
│   ├── Checkbox.tsx
│   ├── Switch.tsx
│   ├── Tabs.tsx
│   ├── Dialog.tsx
│   ├── Drawer.tsx
│   ├── Popover.tsx
│   ├── Tooltip.tsx
│   ├── Toast.tsx
│   ├── Skeleton.tsx
│   ├── Badge.tsx
│   ├── Chip.tsx
│   ├── Avatar.tsx
│   ├── Card.tsx
│   └── Separator.tsx
│
├── media/                   # Media-specific
│   ├── ResponsiveImage.tsx
│   ├── LazyImage.tsx
│   ├── VideoPlayer.tsx
│   ├── ImageLightbox.tsx
│   └── BackdropImage.tsx
│
├── data-display/           # Data presentation
│   ├── RatingBadge.tsx
│   ├── RatingStars.tsx
│   ├── GenreChips.tsx
│   ├── RuntimeBadge.tsx
│   ├── YearBadge.tsx
│   ├── CertificationBadge.tsx
│   └── WatchProviderLogo.tsx
│
├── navigation/             # Navigation
│   ├── Header.tsx
│   ├── MobileNav.tsx
│   ├── Breadcrumb.tsx
│   ├── TabNav.tsx
│   └── Pagination.tsx
│
├── layout/                 # Layout
│   ├── Container.tsx
│   ├── Grid.tsx
│   ├── Section.tsx
│   ├── PageHeader.tsx
│   └── Footer.tsx
│
├── feedback/               # User feedback
│   ├── LoadingSpinner.tsx
│   ├── SkeletonCard.tsx
│   ├── SkeletonCarousel.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   └── Toaster.tsx
│
└── patterns/               # Composite patterns
    ├── Carousel.tsx
    ├── InfiniteGrid.tsx
    ├── FilterBar.tsx
    ├── SearchBar.tsx
    └── ActionBar.tsx
```

### Feature Components

```
src/features/
├── home/
│   ├── components/
│   │   ├── HeroBanner.tsx
│   │   ├── HeroSlide.tsx
│   │   ├── TrendingSection.tsx
│   │   ├── MediaCarousel.tsx
│   │   ├── GenreQuickAccess.tsx
│   │   └── ContinueBrowsing.tsx
│   ├── hooks/
│   │   ├── useTrending.ts
│   │   ├── useNowPlaying.ts
│   │   └── useUpcoming.ts
│   └── index.ts
│
├── discover/
│   ├── components/
│   │   ├── DiscoverFilters.tsx
│   │   ├── FilterDrawer.tsx
│   │   ├── GenreFilter.tsx
│   │   ├── YearFilter.tsx
│   │   ├── RatingFilter.tsx
│   │   ├── RuntimeFilter.tsx
│   │   ├── ProviderFilter.tsx
│   │   ├── SortSelect.tsx
│   │   ├── ViewToggle.tsx
│   │   ├── ActiveFilters.tsx
│   │   └── ResultsGrid.tsx
│   ├── hooks/
│   │   └── useDiscover.ts
│   └── index.ts
│
├── search/
│   ├── components/
│   │   ├── SearchInput.tsx
│   │   ├── SearchSuggestions.tsx
│   │   ├── SearchTabs.tsx
│   │   ├── SearchResults.tsx
│   │   ├── SearchHistory.tsx
│   │   └── TrendingSearches.tsx
│   ├── hooks/
│   │   ├── useMultiSearch.ts
│   │   └── useSearchHistory.ts
│   └── index.ts
│
├── movie-details/
│   ├── components/
│   │   ├── MovieHero.tsx
│   │   ├── MovieInfo.tsx
│   │   ├── MovieActions.tsx
│   │   ├── MovieTabs.tsx
│   │   ├── OverviewTab.tsx
│   │   ├── CastTab.tsx
│   │   ├── MediaTab.tsx
│   │   ├── SimilarTab.tsx
│   │   ├── ReviewsTab.tsx
│   │   ├── CastCard.tsx
│   │   ├── CrewCard.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── VideoCard.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── WatchProviders.tsx
│   │   └── Keywords.tsx
│   ├── hooks/
│   │   ├── useMovieDetails.ts
│   │   ├── useMovieCredits.ts
│   │   ├── useMovieVideos.ts
│   │   ├── useMovieImages.ts
│   │   ├── useSimilarMovies.ts
│   │   └── useRecommendations.ts
│   └── index.ts
│
├── tv-details/
│   ├── components/
│   │   ├── TVHero.tsx
│   │   ├── SeasonSelector.tsx
│   │   ├── EpisodeList.tsx
│   │   ├── EpisodeCard.tsx
│   │   └── TVInfo.tsx
│   ├── hooks/
│   │   ├── useTVDetails.ts
│   │   └── useSeasonDetails.ts
│   └── index.ts
│
├── person/
│   ├── components/
│   │   ├── PersonHeader.tsx
│   │   ├── PersonBio.tsx
│   │   ├── KnownFor.tsx
│   │   ├── Filmography.tsx
│   │   ├── FilmographyFilters.tsx
│   │   ├── CreditCard.tsx
│   │   └── PersonGallery.tsx
│   ├── hooks/
│   │   └── usePersonDetails.ts
│   └── index.ts
│
├── collection/
│   ├── components/
│   │   ├── CollectionHeader.tsx
│   │   ├── CollectionMovies.tsx
│   │   └── CollectionStats.tsx
│   ├── hooks/
│   │   └── useCollection.ts
│   └── index.ts
│
├── watchlist/
│   ├── components/
│   │   ├── WatchlistGrid.tsx
│   │   ├── WatchlistItem.tsx
│   │   ├── WatchlistActions.tsx
│   │   └── ExportImport.tsx
│   ├── hooks/
│   │   └── useWatchlist.ts
│   └── index.ts
│
├── favorites/
│   ├── components/
│   │   └── FavoritesGrid.tsx
│   ├── hooks/
│   │   └── useFavorites.ts
│   └── index.ts
│
├── quick-view/
│   ├── components/
│   │   ├── QuickViewModal.tsx
│   │   └── QuickViewContent.tsx
│   └── index.ts
│
├── compare/
│   ├── components/
│   │   ├── CompareSelector.tsx
│   │   ├── CompareTable.tsx
│   │   └── CompareCard.tsx
│   ├── hooks/
│   │   └── useCompare.ts
│   └── index.ts
│
└── mood/
    ├── components/
    │   ├── MoodPicker.tsx
    │   ├── MoodCard.tsx
    │   └── MoodResults.tsx
    ├── lib/
    │   └── moodFilters.ts
    └── index.ts
```

---

## 7. State Management

### Zustand Stores

```typescript
// stores/userPreferences.store.ts
interface UserPreferencesState {
  language: 'he' | 'en';
  theme: 'dark' | 'light' | 'cinema';
  viewMode: 'grid' | 'list' | 'compact';
  reducedMotion: boolean;
  setLanguage: (lang: 'he' | 'en') => void;
  setTheme: (theme: 'dark' | 'light' | 'cinema') => void;
  setViewMode: (mode: 'grid' | 'list' | 'compact') => void;
}

// stores/watchlist.store.ts
interface WatchlistState {
  items: WatchlistItem[];
  addItem: (item: MediaItem) => void;
  removeItem: (id: number, type: 'movie' | 'tv') => void;
  isInWatchlist: (id: number, type: 'movie' | 'tv') => boolean;
  clearAll: () => void;
  exportData: () => string;
  importData: (json: string) => void;
}

// stores/favorites.store.ts
interface FavoritesState {
  items: FavoriteItem[];
  addFavorite: (item: MediaItem) => void;
  removeFavorite: (id: number, type: 'movie' | 'tv') => void;
  isFavorite: (id: number, type: 'movie' | 'tv') => boolean;
}

// stores/searchHistory.store.ts
interface SearchHistoryState {
  searches: string[];
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearHistory: () => void;
}

// stores/recentlyViewed.store.ts
interface RecentlyViewedState {
  items: ViewedItem[];
  addViewed: (item: MediaItem) => void;
  clearRecent: () => void;
}

// stores/compare.store.ts
interface CompareState {
  items: MediaItem[];
  addToCompare: (item: MediaItem) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
}
```

### TanStack Query Keys

```typescript
export const queryKeys = {
  trending: (timeWindow: 'day' | 'week') => ['trending', timeWindow],
  discover: (type: 'movie' | 'tv', filters: DiscoverFilters) => ['discover', type, filters],
  search: (type: 'multi' | 'movie' | 'tv' | 'person', query: string) => ['search', type, query],
  movie: (id: number) => ['movie', id],
  movieCredits: (id: number) => ['movie', id, 'credits'],
  movieVideos: (id: number) => ['movie', id, 'videos'],
  movieImages: (id: number) => ['movie', id, 'images'],
  movieSimilar: (id: number) => ['movie', id, 'similar'],
  movieRecommendations: (id: number) => ['movie', id, 'recommendations'],
  tv: (id: number) => ['tv', id],
  tvSeason: (id: number, season: number) => ['tv', id, 'season', season],
  person: (id: number) => ['person', id],
  collection: (id: number) => ['collection', id],
  genres: (type: 'movie' | 'tv') => ['genres', type],
  watchProviders: (type: 'movie' | 'tv') => ['watchProviders', type],
  configuration: () => ['configuration'],
};
```

---

## 8. Implementation Phases

### Phase 1: Foundation (MVP Core)
**Priority: Critical**

1. Design System setup
   - CSS variables and tokens
   - Theme provider (dark/light/cinema)
   - Base component updates

2. API layer enhancement
   - Add missing endpoints
   - Implement `append_to_response`
   - Configuration caching

3. Route structure
   - Add TV routes
   - Add Person route
   - Add Collection route

### Phase 2: Home Page Enhancement
**Priority: High**

1. Hero Banner component
   - Auto-rotating backdrop
   - Quick actions
   - Responsive layout

2. Trending sections
   - Day/Week toggle
   - Mixed media support

3. Enhanced carousels
   - Smooth snapping
   - Touch gestures
   - Lazy loading

### Phase 3: Advanced Discover
**Priority: High**

1. Full filter implementation
   - All TMDB discover params
   - URL state sync
   - Mobile drawer

2. View modes
   - Grid/List/Compact
   - Responsive adjustments

3. Watch providers integration

### Phase 4: Search Enhancement
**Priority: High**

1. Multi-search implementation
2. Tabbed results
3. Search history
4. Autosuggest

### Phase 5: Rich Details Pages
**Priority: High**

1. Movie details enhancement
   - Tabbed interface
   - All data sections
   - Watch providers

2. TV Show details
   - Season browser
   - Episode list

3. Quick View modal

### Phase 6: Person & Collection Pages
**Priority: Medium**

1. Person profile page
   - Filmography filters
   - Photo gallery

2. Collection page
   - Franchise view
   - Stats

### Phase 7: User Features
**Priority: Medium**

1. Watchlist implementation
2. Favorites implementation
3. Recently viewed
4. Export/Import

### Phase 8: Advanced Features
**Priority: Low**

1. Compare feature
2. Mood picker
3. Smart recommendations
4. Cinema mode

---

## 9. Accessibility Requirements

- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen reader support
- Focus visible states
- Skip links
- Aria labels and roles
- Color contrast 4.5:1 minimum
- Reduced motion support
- RTL layout support

---

## 10. Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| LCP | < 2.5s | ~3s |
| FID | < 100ms | OK |
| CLS | < 0.1 | OK |
| Performance Score | 95+ | 88 |
| Accessibility Score | 100 | 92 |
| Bundle Size (gzipped) | < 200KB | ~250KB |

---

## 11. File Structure Summary

```
src/
├── components/           # Shared UI components
├── features/            # Feature modules
│   ├── home/
│   ├── discover/
│   ├── search/
│   ├── movie-details/
│   ├── tv-details/
│   ├── person/
│   ├── collection/
│   ├── watchlist/
│   ├── favorites/
│   ├── quick-view/
│   ├── compare/
│   └── mood/
├── shared/
│   ├── api/             # API layer
│   ├── hooks/           # Shared hooks
│   ├── stores/          # Zustand stores
│   ├── types/           # TypeScript types
│   ├── constants/       # Constants
│   └── lib/             # Utilities
├── styles/
│   ├── tokens.css       # Design tokens
│   └── themes/          # Theme variants
├── App.tsx
├── main.tsx
└── routes.tsx           # Route definitions
```

---

## 12. Enhancement Proposals

### Quick View (P1)
Fast preview without navigation. Triggered by hover (desktop) or long-press (mobile).

### Compare (P2)
Side-by-side comparison of 2-4 movies/shows. Compare ratings, runtime, cast overlap, genres.

### Mood Picker (P2)
Mood-to-filter mapping:
- "Excited" → Action, Adventure, High Rating
- "Relaxed" → Comedy, Romance, Family
- "Thoughtful" → Drama, Documentary
- "Scared" → Horror, Thriller
- "Nostalgic" → Classic years filter

### Smart Recommendations (P3)
Based on:
- Watchlist genres frequency
- Favorite actors/directors
- Rating patterns
- Recently viewed

### Collections View (P2)
Dedicated page for movie franchises (Marvel, Star Wars, etc.)

---

*Document Version: 1.0*
*Last Updated: 2026-01-31*
