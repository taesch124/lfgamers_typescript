import { createStore, combineReducers, compose } from 'redux';

import { authReducer } from './Auth/authReducer';
import { igdbReducer } from './IGDB/igdbReducer';
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    igdb: igdbReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeEnhancers()); 