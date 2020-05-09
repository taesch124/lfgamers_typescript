import { Game } from "../../UI.d/Game";

export const SET_GAMES = 'SET_GAMES';
export const FETCHING_GAMES = 'FETCHING_GAMES';

interface IGDBActions {
    type: typeof SET_GAMES | typeof FETCHING_GAMES,
    payload?: Array<Game>,
}

export function setGames(games: []) : IgdbActionTypes {
    return {
        type: SET_GAMES,
        payload: games
    }
}

export function fetchingGames() : IgdbActionTypes {
    return {
        type: FETCHING_GAMES,
    }
}

export type IgdbActionTypes = IGDBActions;