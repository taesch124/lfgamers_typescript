import { IgdbState } from './igdbState';
import { IgdbActionTypes, SET_GAMES } from './igdbActions';

const initialState: IgdbState = {
    games: []
}

export const igdbReducer = (state: IgdbState = initialState, action: IgdbActionTypes) : IgdbState => {
    switch(action.type) {
        case SET_GAMES:
            const newState = {...state, games: action.payload};
            return {
                ...state,
                games: action.payload
            }
    }
    
    return state;
}