import { Game } from "../../UI.d/Game";

export const SELECT_GAME = 'SELECT_GAME';
export const CLEAR_GAME_SELECTION = 'CLEAR_GAME_SELECTION';

interface UIActions {
    type: typeof SELECT_GAME | typeof CLEAR_GAME_SELECTION,
    payload?: Game,
}

export function selectGame(game: Game) : UIActionTypes {
    return {
        type: SELECT_GAME,
        payload: game
    }
}

export function clearGameSelection() : UIActionTypes {
    return {
        type: CLEAR_GAME_SELECTION,
    }
}

export type UIActionTypes = UIActions;