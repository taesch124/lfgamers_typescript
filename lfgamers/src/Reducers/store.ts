import { createStore, combineReducers } from 'redux';

import { authReducer } from './Auth/authReducer';
import { igdbReducer } from './IGDB/igdbReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    igdb: igdbReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer); 