import { createStore, combineReducers, compose } from 'redux';

import { authReducer } from './Auth/authReducer';
import { igdbReducer } from './IGDB/igdbReducer';
import { threadReducer } from './Threads/threadReducer';
import { uiReducer } from './UI/uiReducer';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    igdb: igdbReducer,
    threads: threadReducer,
    ui: uiReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeEnhancers()); 