export const SET_GAMES = 'SET_GAMES';

interface SetGamesAction {
    type: typeof SET_GAMES,
    payload: [],
}

export function setGames(games: []) : IgdbActionTypes {
    return {
        type: SET_GAMES,
        payload: games
    }
}



export type IgdbActionTypes = SetGamesAction;