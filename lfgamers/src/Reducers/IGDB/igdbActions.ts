export const SET_GAMES = 'SET_GAMES';
export const FETCHING_GAMES = 'FETCHING_GAMES';

interface SetGamesAction {
    type: typeof SET_GAMES | typeof FETCHING_GAMES,
    payload?: Array<{}>,
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

export type IgdbActionTypes = SetGamesAction;