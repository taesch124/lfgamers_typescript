import { UIState } from './uiState';
import { UIActionTypes, SELECT_GAME, CLEAR_GAME_SELECTION } from './uiActions';

const initialState: UIState = {
    selectedGame: undefined
}

export const uiReducer = (state: UIState = initialState, action: UIActionTypes) : UIState => {
    switch(action.type) {
        case SELECT_GAME:
            return {
                ...state,
                selectedGame: action.payload
            }
        case CLEAR_GAME_SELECTION:
            return {
                ...state,
                selectedGame: undefined
            }
    }
    
    return state;
}