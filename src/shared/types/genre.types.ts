export interface MovieGenre {
    id: number;
    name: string;
}

export interface GenreListResponse {
    genres: MovieGenre[];
}