export interface Game {
    _id: string;
    id: string;
    name: string;
    summary: string;
    releaseDate: string;
    cover: number;
    rating: number;
    popularity: number;
    genres?: Array<string>,
    platforms?: Array<string>,
}