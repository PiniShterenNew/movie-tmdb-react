# 🎬 Movie Discovery App

A modern, feature-rich React application for discovering and exploring movies using The Movie Database (TMDB) API. Built with TypeScript, Vite, and a comprehensive feature-based architecture.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![React](https://img.shields.io/badge/React-19.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Architecture Overview](#-architecture-overview)
- [API Layer](#-api-layer)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Building](#-building)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)

## 🎯 Introduction

This is a production-ready movie discovery application that provides users with an intuitive interface to explore movies by categories, genres, and various filters. The application features full RTL (Right-to-Left) support for Hebrew, modern UI animations, and a robust architecture designed for scalability and maintainability.

### Key Highlights

- **Modern Stack**: React 19 + TypeScript + Vite for optimal developer experience
- **Full RTL Support**: Native Hebrew language support with proper text direction
- **Rich Filtering**: Advanced filtering system with genre combinations and date ranges
- **Infinite Scroll**: Seamless pagination using TanStack Query's infinite queries
- **Type Safety**: Comprehensive TypeScript types and Zod validation schemas
- **Performance**: Optimized queries with intelligent caching strategies

## 🛠 Tech Stack

### Core Framework
- **React** `19.2.0` - UI library
- **TypeScript** `5.9.3` - Type safety
- **Vite** `7.2.4` - Build tool and dev server

### State Management & Data Fetching
- **TanStack Query** `5.90.11` - Server state management and caching
- **Zustand** `5.0.9` - Client state management

### UI & Styling
- **Tailwind CSS** `3.4.13` - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - High-quality component library
- **Framer Motion** `12.23.25` - Animation library
- **Lucide React** `0.555.0` - Icon library
- **React Icons** `5.5.0` - Additional icons

### Routing & Navigation
- **React Router DOM** `7.10.1` - Client-side routing

### Validation & Utilities
- **Zod** - Schema validation (via dependencies)
- **Axios** `1.13.2` - HTTP client
- **date-fns** `4.1.0` - Date manipulation
- **clsx** `2.1.1` - Conditional class names
- **tailwind-merge** `3.4.0` - Tailwind class merging

### RTL & Internationalization
- **tailwindcss-rtl** `0.9.0` - RTL support for Tailwind

### Development Tools
- **Vitest** `2.1.8` - Unit testing framework
- **ESLint** `9.39.1` - Code linting
- **TypeScript ESLint** `8.46.4` - TypeScript-specific linting
- **rollup-plugin-visualizer** `6.0.5` - Bundle analysis

## ✨ Features

### Current Implementation

#### 🎬 Movie Discovery
- **Discover Movies**: Browse movies using TMDB's discover API
- **Multiple Categories**: Pre-configured sections for trending, coming soon, and recommended movies
- **Genre Filtering**: Filter movies by single or multiple genres
- **Date Range Filtering**: Filter by release date ranges or specific years
- **Sort Options**: Sort by popularity, vote average, or release date (ascending/descending)

#### 🎨 User Interface
- **Responsive Design**: Fully responsive layout for all screen sizes
- **RTL Support**: Complete Right-to-Left support for Hebrew interface
- **Modern Animations**: Smooth transitions and animations using Framer Motion
- **Skeleton Loading States**: Elegant loading placeholders during data fetch
- **Empty States**: User-friendly empty state components
- **Error Handling**: Comprehensive error boundaries and error messages
- **Movie Cards**: Beautiful, responsive movie cards with posters
- **Full-Screen Modal**: Immersive movie details modal

#### 🔍 Search Functionality
- **Movie Search**: Real-time search with debouncing
- **Search Results**: Paginated search results with infinite scroll

#### 🎯 Advanced Features
- **Infinite Scroll**: Automatic pagination using Intersection Observer API
- **Query Caching**: Intelligent caching with TanStack Query (5-minute stale time, 30-minute garbage collection)
- **Filter State Management**: Persistent filter state with URL synchronization
- **Scroll Restoration**: Maintains scroll position on navigation
- **Language Support**: Multi-language support via Zustand store

#### 🏗 Architecture Features
- **Feature-Based Structure**: Organized by features (discovery, search, movie-details, filters)
- **Separation of Concerns**: Clear separation between UI components, hooks, API layer, and business logic
- **Type Safety**: Comprehensive TypeScript types throughout the application
- **Validation Layer**: Zod schemas for API parameter validation
- **Reusable Components**: Shared UI components library
- **Custom Hooks**: Reusable hooks for common functionality (debounce, infinite scroll, intersection observer)

## 🏛 Architecture Overview

The project follows a **feature-based architecture** pattern, organizing code by features rather than by technical layers. This approach improves maintainability and scalability.

### Directory Structure

```
src/
├── features/              # Feature modules
│   ├── discovery/        # Movie discovery feature
│   │   ├── api/          # API calls
│   │   ├── components/   # Feature-specific components
│   │   ├── hooks/        # Feature-specific hooks
│   │   └── lib/          # Feature-specific utilities & validation
│   ├── search/           # Search feature
│   ├── movie-details/    # Movie details feature
│   └── filters/          # Filter components
├── shared/               # Shared code across features
│   ├── api/              # Shared API configuration
│   ├── components/       # Shared UI components
│   ├── hooks/            # Shared React hooks
│   ├── lib/              # Shared utilities
│   ├── types/            # TypeScript type definitions
│   ├── constants/        # Application constants
│   └── store/            # Global state stores
├── components/           # Global layout components
│   ├── layout/           # Layout components (Header, etc.)
│   ├── MovieModal/       # Movie modal component
│   └── ui/               # Base UI components (shadcn)
└── main.tsx              # Application entry point
```

### Feature Module Structure

Each feature follows a consistent structure:

```
feature-name/
├── api/              # API service functions
├── components/       # Feature-specific React components
├── hooks/           # Feature-specific React hooks
├── lib/             # Business logic, validation, utilities
├── types/           # Feature-specific TypeScript types (if needed)
└── index.ts         # Public API exports
```

### Key Architectural Principles

1. **Feature Isolation**: Each feature is self-contained with its own API, components, hooks, and logic
2. **Shared Code**: Common functionality lives in `shared/` directory
3. **Type Safety**: All API responses and parameters are typed
4. **Validation**: API parameters validated using Zod schemas before requests
5. **Separation of Concerns**: UI components contain minimal logic; business logic in hooks and lib
6. **Reusability**: Shared components and hooks for common patterns

### Component Organization

- **UI Components** (`components/ui/`): Base, reusable components from shadcn/ui
- **Feature Components** (`features/*/components/`): Feature-specific components
- **Layout Components** (`components/layout/`): Application-wide layout components

## 🔌 API Layer

### TMDB Integration

The application integrates with [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) for movie data.

#### Configuration

```typescript
// src/shared/lib/tmdb.ts
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
    Accept: "application/json",
  },
  timeout: 10000,
});
```

#### API Endpoints Used

| Endpoint | Purpose | Feature |
|----------|---------|---------|
| `/discover/movie` | Discover movies with filters | Discovery |
| `/genre/movie/list` | Get movie genres | Filters |
| `/search/movie` | Search movies | Search |
| `/movie/{id}` | Get movie details | Movie Details |
| `/movie/{id}/credits` | Get movie cast & crew | Movie Details |
| `/movie/{id}/videos` | Get movie videos/trailers | Movie Details |

#### Request Interceptors

- **Language Parameter**: Automatically adds language parameter from Zustand store to all requests
- **Error Handling**: Centralized error handling for 401, 429, and 500 status codes

#### Validation

All API parameters are validated using Zod schemas before making requests:

```typescript
// Example: Discovery parameters validation
const discoverParamsSchema = z.object({
  with_genres: z.string().optional(),
  primary_release_year: z.number().int().min(1900).max(2100).optional(),
  sort_by: z.enum([...]).optional(),
  primary_release_date_gte: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  primary_release_date_lte: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
```

### Query Configuration

TanStack Query is configured with optimal defaults:

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,  // 5 minutes
      gcTime: 1000 * 60 * 30      // 30 minutes
    },
  },
});
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 20.x`
- **npm** `>= 9.x` (or compatible package manager)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd my-react-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_TMDB_READ_TOKEN=your_tmdb_api_token_here
```

To obtain a TMDB API token:
1. Create an account at [TMDB](https://www.themoviedb.org/)
2. Go to [API Settings](https://www.themoviedb.org/settings/api)
3. Request an API key
4. Copy your API read access token

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## 💻 Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Vitest |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:coverage` | Run tests with coverage report |

### Development Tools

- **React Query Devtools**: Available in development mode (press the React Query icon in the bottom-left corner)
- **Bundle Analyzer**: Run `npm run build` to generate `dist/bundle-analysis.html` for bundle size analysis

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React and TypeScript rules
- **File Naming**: 
  - Components: `PascalCase.tsx`
  - Utilities/Hooks: `camelCase.ts`
  - Feature-based organization

## 🏗 Building

### Production Build

```bash
npm run build
```

This command:
1. Type-checks the codebase (`tsc -b`)
2. Builds the application with Vite (`vite build`)
3. Generates bundle analysis report (`dist/bundle-analysis.html`)

### Build Output

The production build is output to the `dist/` directory:
- `dist/index.html` - Entry HTML file
- `dist/assets/` - Optimized JavaScript and CSS bundles
- `dist/bundle-analysis.html` - Bundle size visualization

### Build Configuration

Key build settings in `vite.config.ts`:
- **Base Path**: `/` (configurable for subdirectory deployment)
- **Output Directory**: `dist/`
- **Path Aliases**: `@/*` maps to `./src/*`

## 🚢 Deployment

### Vercel Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/).

#### Automatic Deployment

1. **Connect Repository**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import the repository in Vercel dashboard

2. **Configure Environment Variables**
   - In Vercel project settings, add:
     ```
     VITE_TMDB_READ_TOKEN=your_tmdb_api_token_here
     ```

3. **Deploy**
   - Vercel will automatically detect Vite and deploy
   - Each push to `main` branch triggers a new deployment

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Vercel Configuration

The project works out-of-the-box with Vercel's default settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables

Ensure the following environment variable is set in your deployment platform:

- `VITE_TMDB_READ_TOKEN` - TMDB API read access token

### CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:
- Runs on push/PR to `main` branch
- Installs dependencies
- Builds the project
- Runs tests (if present)

## 🗺 Roadmap

### Performance Optimization

#### Code Splitting
- [ ] Implement route-based code splitting
- [ ] Lazy load feature modules
- [ ] Dynamic imports for heavy components (MovieModal, Filters)
- [ ] Split vendor bundles (React, TanStack Query, etc.)

#### Bundle Optimization
- [ ] Analyze and optimize bundle size (currently large)
- [ ] Tree-shake unused dependencies
- [ ] Optimize image loading strategies
- [ ] Implement resource hints (preload, prefetch)
- [ ] Reduce initial JavaScript payload

#### Caching Strategies
- [ ] Implement service worker for offline support
- [ ] Cache TMDB API responses in IndexedDB
- [ ] Optimize TanStack Query cache configuration
- [ ] Implement stale-while-revalidate pattern
- [ ] Cache movie posters and images

#### Dynamic Imports
- [ ] Lazy load Framer Motion animations
- [ ] Code-split modal components
- [ ] Dynamic import for heavy UI libraries
- [ ] Load filters on demand

### Performance & UX Improvements

#### Animation Enhancements
- [ ] Optimize Framer Motion animations for performance
- [ ] Implement viewport-based animation triggers
- [ ] Add skeleton animations
- [ ] Reduce animation complexity on low-end devices

#### Mobile Optimization
- [ ] Enhanced mobile touch interactions
- [ ] Optimize images for mobile (WebP, responsive sizes)
- [ ] Implement pull-to-refresh
- [ ] Improve mobile navigation patterns
- [ ] Optimize infinite scroll for mobile performance

### Testing

#### Automated Testing
- [ ] Set up Vitest test suite
- [ ] Unit tests for hooks (`useDiscoveryQuery`, `useInfiniteScroll`)
- [ ] Component tests with React Testing Library
- [ ] Integration tests for API layer
- [ ] E2E tests with Playwright/Cypress
- [ ] Visual regression testing

#### Test Coverage Goals
- [ ] Achieve 80%+ code coverage
- [ ] Test critical user flows
- [ ] Test error handling paths
- [ ] Test filter combinations

### Feature Enhancements

#### User Experience
- [ ] User favorites/watchlist functionality
- [ ] Movie rating system
- [ ] User reviews and comments
- [ ] Personalized recommendations
- [ ] Search history
- [ ] Filter presets/saved filters

#### Advanced Filtering
- [ ] Filter by cast/crew
- [ ] Filter by rating range
- [ ] Filter by runtime
- [ ] Filter by production companies
- [ ] Multi-select genre filtering UI improvements

#### Movie Details
- [ ] Expand movie details modal
- [ ] Related movies section
- [ ] Cast and crew carousel
- [ ] Movie trailers integration
- [ ] Similar movies recommendations

### Technical Debt

#### Code Quality
- [ ] Remove duplicate `.js` files (migrate fully to TypeScript)
- [ ] Consolidate component variants
- [ ] Improve error handling consistency
- [ ] Add JSDoc comments to public APIs
- [ ] Refactor large components (>200 lines)

#### Infrastructure
- [ ] Set up error tracking (Sentry)
- [ ] Implement analytics
- [ ] Add performance monitoring
- [ ] Set up staging environment
- [ ] Implement feature flags

### Accessibility

- [ ] ARIA labels and roles
- [ ] Keyboard navigation improvements
- [ ] Screen reader optimization
- [ ] Focus management
- [ ] Color contrast improvements
- [ ] Reduced motion support

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [shadcn/ui](https://ui.shadcn.com/) for the excellent component library
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [TanStack Query](https://tanstack.com/query) for powerful data fetching

---

**Built with ❤️ using React, TypeScript, and Vite**
