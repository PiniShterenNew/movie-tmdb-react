export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const TMDB_IMAGE_SIZE_SMALL = "w200";
export const TMDB_IMAGE_SIZE_MEDIUM = "w500";
export const TMDB_IMAGE_SIZE_LARGE = "w780";
export const TMDB_IMAGE_SIZE_ORIGINAL = "original";

export const TMDB_IMAGE_URL = (path: string, size: string = TMDB_IMAGE_SIZE_MEDIUM) => {
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
