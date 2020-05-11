import { Game } from "./Game";

export interface User {
    _id: string;
    username: string;
    password?: string;
    email: string;
    favoriteGames: Game[];
}