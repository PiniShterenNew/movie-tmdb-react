# CLAUDE.md - AI Assistant Guidelines for Movie Discovery App

This document provides guidance for AI assistants working with this codebase.

## Project Overview

A modern React SPA for movie discovery using The Movie Database (TMDB) API. Features Hebrew RTL support, advanced filtering, infinite scroll, and a feature-based architecture.

**Live App**: Deployed on Vercel

## Quick Reference

```bash
# Development
pnpm install          # Install dependencies (prefer pnpm)
pnpm dev              # Start dev server at localhost:5173
pnpm build            # Type check + production build
pnpm lint             # Run ESLint
pnpm test             # Run Vitest tests
pnpm test:ui          # Interactive test UI
pnpm preview          # Preview production build
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 7.2 |
| State (Server) | TanStack Query 5.x |
| State (Client) | Zustand 5.x |
| Styling | Tailwind CSS 3.4 + shadcn/ui |
| Routing | React Router DOM 7.x |
| HTTP | Axios |
| Validation | Zod |
| Testing | Vitest + Testing Library |

## Architecture

### Directory Structure

```
src/
├── features/              # Feature modules (main code organization)
│   ├── discovery/         # Movie browsing & filtering
│   ├── search/            # Search functionality
│   ├── movie-details/     # Movie details modal
│   └── filters/           # Filter UI components
├── shared/                # Cross-feature shared code
│   ├── api/               # TMDB API configuration
│   ├── components/        # Shared components (ErrorBoundary)
│   ├── constants/         # App constants
│   ├── hooks/             # Reusable hooks
│   ├── lib/               # Utilities (tmdb.ts, queryClient.ts)
│   ├── store/             # Zustand stores
│   └── types/             # TypeScript interfaces
├── components/            # Global components
│   ├── layout/            # Layout (Header)
│   ├── MovieModal/        # Full-screen modal
│   └── ui/                # shadcn/ui components
├── App.tsx                # Router & main layout
└── main.tsx               # Entry point
```

### Feature Module Pattern

Each feature follows this structure:
```
feature-name/
├── api/           # API service functions
├── components/    # Feature-specific components
├── hooks/         # Feature-specific hooks
├── lib/           # Business logic, validation
├── pages/         # Page components (if applicable)
└── index.ts       # Public exports
```

## Code Conventions

### File Naming
- **Components**: `PascalCase.tsx` (e.g., `MovieCard.tsx`)
- **Hooks**: `use[Name].ts` (e.g., `useDebounce.ts`)
- **Types**: `[name].types.ts` (e.g., `movie.types.ts`)
- **API**: `[feature].api.ts` (e.g., `discovery.api.ts`)
- **Validation**: `[feature].validation.ts`
- **Utils**: `camelCase.ts` (e.g., `sanitize.ts`)

### Import Conventions
```typescript
// Always use path alias @/ for src imports
import { MovieCard } from '@/features/discovery/components/MovieCard';
import { useLanguageStore } from '@/shared/store/language.store';
import { cn } from '@/shared/lib/utils';

// Use type imports for types only
import type { Movie } from '@/shared/types';
```

### Component Patterns
```typescript
// Props interface above component
interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

// Functional component with destructured props
export const MovieCard: React.FC<MovieCardProps> = ({ movie, priority = false }) => {
  // Use cn() for className merging
  return (
    <div className={cn('base-classes', conditional && 'conditional-class')}>
      {/* Component content */}
    </div>
  );
};
```

### Hook Patterns
```typescript
// TanStack Query for server state
export const useDiscoveryQuery = (params: DiscoveryParams) => {
  return useInfiniteQuery({
    queryKey: ['discovery', params],
    queryFn: ({ pageParam }) => fetchDiscoveryMovies({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
};

// Zustand for client state
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'he',
      setLanguage: (lang) => set({ language: lang }),
    }),
    { name: 'moviehub-language' }
  )
);
```

### API Patterns
```typescript
// Validate params with Zod before API calls
const paramsSchema = z.object({
  page: z.number().int().positive(),
  with_genres: z.string().optional(),
});

export const fetchDiscoveryMovies = async (params: DiscoveryParams) => {
  const validated = paramsSchema.parse(params);
  const response = await tmdb.get<DiscoveryResponse>('/discover/movie', { params: validated });
  return response.data;
};
```

## TypeScript Configuration

Strict mode is enabled with these key settings:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `verbatimModuleSyntax: true` (explicit type imports required)

## Environment Variables

Required in `.env`:
```env
VITE_TMDB_READ_TOKEN=<your-tmdb-api-read-token>
```

Get API token from: https://www.themoviedb.org/settings/api

## API Integration

### TMDB API Endpoints Used
| Endpoint | Purpose |
|----------|---------|
| `/discover/movie` | Browse movies with filters |
| `/search/movie` | Search movies |
| `/movie/{id}` | Movie details |
| `/movie/{id}/credits` | Cast & crew |
| `/movie/{id}/videos` | Trailers |
| `/genre/movie/list` | Genre list |

### Query Configuration
- **staleTime**: 5 minutes
- **gcTime**: 30 minutes
- **retry**: 2 attempts
- **refetchOnWindowFocus**: disabled

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/shared/lib/tmdb.ts` | Axios instance with interceptors |
| `src/shared/lib/queryClient.ts` | TanStack Query client config |
| `src/shared/store/language.store.ts` | Language state (he/en) |
| `src/shared/store/movieModal.store.ts` | Modal state management |
| `src/shared/types/index.ts` | All TypeScript interfaces |
| `vite.config.ts` | Build & test configuration |
| `tailwind.config.cjs` | Tailwind with RTL plugin |
| `vercel.json` | Deployment & security headers |

## Styling Guidelines

### Tailwind CSS
- Use utility classes directly
- Use `cn()` from `@/shared/lib/utils` for conditional classes
- RTL support via `tailwindcss-rtl` plugin (use `rtl:` and `ltr:` prefixes)
- Dark mode via class-based toggle

### CSS Variables (defined in index.css)
```css
--background, --foreground, --primary, --secondary, --muted, --accent, --destructive
--card, --popover, --border, --input, --ring
--radius (border radius)
```

### shadcn/ui
- Components in `src/components/ui/`
- Style: "new-york"
- Add new components via shadcn CLI when needed

## Testing

### Setup
- Framework: Vitest with jsdom environment
- Testing Library: @testing-library/react
- Setup file: `tests/setup.ts`

### Running Tests
```bash
pnpm test           # Watch mode
pnpm test:ui        # Interactive UI
pnpm test:coverage  # Coverage report
```

### Test Patterns (when writing tests)
```typescript
import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/queryClient';

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

test('renders movie card', () => {
  render(<MovieCard movie={mockMovie} />, { wrapper });
  expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
});
```

## Deployment

### Vercel (Primary)
- Auto-deploys from main branch
- Build: `pnpm run build`
- Output: `dist/`
- Configure `VITE_TMDB_READ_TOKEN` in Vercel dashboard

### Security Headers (configured in vercel.json)
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff

## Common Tasks

### Adding a New Feature
1. Create directory under `src/features/[feature-name]/`
2. Add subdirectories: `api/`, `components/`, `hooks/`, `lib/`
3. Create `index.ts` for public exports
4. Add types to `src/shared/types/` if shared

### Adding a shadcn/ui Component
```bash
npx shadcn@latest add [component-name]
```

### Adding a New API Endpoint
1. Create Zod schema for validation in `lib/[name].validation.ts`
2. Create API function in `api/[name].api.ts`
3. Create hook using TanStack Query in `hooks/use[Name].ts`

### Modifying Styling
1. For global theme changes: edit CSS variables in `src/index.css`
2. For component-specific: use Tailwind utilities
3. For animations: use Framer Motion or `tailwindcss-animate`

## Known Issues & Roadmap

### Current Limitations
- Bundle size needs optimization (code splitting not fully implemented)
- Tests not yet written (infrastructure ready)
- No offline/PWA support

### Performance Targets (from Lighthouse audit)
- Performance: 95+ (currently ~88)
- Accessibility: 100 (currently ~92)
- SEO: 90+ (currently improving)

See `LIGHTHOUSE_AUDIT_ANALYSIS.md` for detailed audit information.

## Language & RTL Support

- Default language: Hebrew (`he`)
- RTL mode enabled in HTML root
- Language persisted in localStorage (`moviehub-language`)
- All text comes from TMDB API in selected language

## Do's and Don'ts

### Do
- Use the `@/` path alias for all imports
- Validate API params with Zod
- Use TanStack Query for server state
- Use Zustand for client state
- Follow the feature-based architecture
- Use `cn()` for className merging
- Add TypeScript types for all data

### Don't
- Don't bypass TypeScript with `any`
- Don't store server state in Zustand
- Don't create new utility functions if one exists in `shared/lib/`
- Don't add dependencies without considering bundle size
- Don't hardcode API keys (use env variables)
- Don't ignore accessibility (use proper ARIA attributes)
