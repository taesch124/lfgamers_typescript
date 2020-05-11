import { ThreadState } from './threadState';
import { 
    ThreadActionTypes, 
    SET_THREADS, 
    FETCHING_THREADS, 
    SELECT_THREAD, 
    DESELECT_THREAD,
    SET_COMMENTS,
    FETCHING_COMMENTS
} from './threadActions';

const initialState: ThreadState = {
    fetchingThreads: false,
    threads: [],
    selectedThread: undefined,
    fetchingComments: false,
    comments: [],
}

export const threadReducer = (state: ThreadState = initialState, action: ThreadActionTypes) : ThreadState => {
    switch(action.type) {
        case SET_THREADS:
            return {
                ...state,
                fetchingThreads: false,
                threads: action.payload
            }
        case FETCHING_THREADS:
            return {
                ...state,
                fetchingThreads: true,
            }
        case SELECT_THREAD:
            return {
                ...state,
                selectedThread: action.payload
            }
        case DESELECT_THREAD:
            return {
                ...state,
                selectedThread: undefined,
            }
        case SET_COMMENTS:
            return {
                ...state,
                fetchingComments: false,
                comments: action.payload,
            }
        case FETCHING_COMMENTS:
            return {
                ...state,
                fetchingComments: true,
            }
    }
    
    return state;
}