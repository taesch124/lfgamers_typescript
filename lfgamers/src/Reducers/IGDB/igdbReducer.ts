import { IgdbState } from './igdbState';
import { IgdbActionTypes, SET_GAMES, FETCHING_GAMES } from './igdbActions';

const initialState: IgdbState = {
    fetching: false,
    games: []
}

export const igdbReducer = (state: IgdbState = initialState, action: IgdbActionTypes) : IgdbState => {
    switch(action.type) {
        case SET_GAMES:
            return {
                ...state,
                fetching: false,
                games: action.payload
            }
        case FETCHING_GAMES:
            return {
                ...state,
                fetching: true
            }
    }
    
    return state;
}