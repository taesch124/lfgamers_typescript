import { string, object } from "prop-types"

import { AuthState, UserState } from './authState';
import { AuthActionTypes, LOGON, LOGOUT } from './authActions';

const initialState: AuthState = {
    user: {},
    loggedIn: false
}

export const authReducer = (state: AuthState = initialState, action: AuthActionTypes) : AuthState => {
    switch(action.type) {
        case LOGON:
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case LOGOUT:
            return {
                ...state,
                user: {},
                loggedIn: false
            }
    }
    
    return state;
}