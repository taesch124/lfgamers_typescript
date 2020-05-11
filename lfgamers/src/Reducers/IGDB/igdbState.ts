import { Game } from "../../UI.d/Game";

export interface IgdbState {
    fetching: boolean;
    games: Array<Game>;
}