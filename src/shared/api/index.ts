export * from './tmdb.general.api';

// Trending
export {
  fetchTrending,
  fetchTrendingMovies,
  fetchTrendingTV,
  fetchTrendingPeople,
} from "./trending.api";

// Movies
export {
  fetchNowPlaying,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchFullMovieDetails,
  fetchSimilarMovies,
  fetchMovieRecommendations,
} from "./movies.api";

// TV
export {
  fetchPopularTV,
  fetchTopRatedTV,
  fetchOnTheAirTV,
  fetchAiringTodayTV,
  fetchTVDetails,
  fetchFullTVDetails,
  fetchSeasonDetails,
  fetchSimilarTV,
  fetchTVRecommendations,
} from "./tv.api";

// Person
export {
  fetchPersonDetails,
  fetchFullPersonDetails,
  fetchPersonCredits,
  fetchPersonMovieCredits,
  fetchPersonTVCredits,
  fetchPersonImages,
  fetchPersonExternalIds,
} from "./person.api";

// Collection
export { fetchCollection } from "./collection.api";

// Search
export { searchMulti, searchMovies, searchTV, searchPerson } from "./search.api";

// Configuration
export {
  fetchConfiguration,
  fetchCountries,
  fetchLanguages,
  fetchMovieWatchProviders,
  fetchTVWatchProviders,
  fetchMovieCertifications,
  fetchTVCertifications,
} from "./configuration.api";