import { createStore, combineReducers } from 'redux';

import { authReducer } from './Auth/authReducer';

const rootReducer = combineReducers({
    auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer); 