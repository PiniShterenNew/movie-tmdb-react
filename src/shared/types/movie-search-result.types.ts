import { Movie } from "./movie.types";
import { PaginatedResponse } from "./discovery.types";

export type SearchResponse = PaginatedResponse<Movie>;