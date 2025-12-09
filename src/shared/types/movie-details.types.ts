import { MovieGenre } from "./genre.types";
import { Movie } from "./movie.types";

export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface MovieDetails extends Movie {
    backdrop_path?: string | null;
    vote_count: number;
    popularity: number;
    adult: boolean;
    tagline?: string;
    status?: string;
    original_language?: string;
    origin_country?: string[];

    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];

    production_companies: {
        id: number;
        name: string;
        logo_path: string | null;
        origin_country: string;
    }[];

    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];

    genres: MovieGenre[];
    runtime: number | null;
    budget: number | null;
    revenue: number | null;
    homepage: string | null;
    imdb_id?: string;
}