import { Thread } from './../../UI.d/Thread';
import { Comment } from './../../UI.d/Comment';

export const SET_THREADS = 'SET_THREADS';
export const FETCHING_THREADS = 'FETCHING_THREADS';
export const SELECT_THREAD = 'SELECT_THREAD';
export const DESELECT_THREAD = 'DESELECT_THREAD';
export const SET_COMMENTS = 'SET_COMMENTS';
export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';

type ThreadActions = 
|
{
    type: typeof SET_THREADS,
    payload: Thread[],
}
|
{
    type: typeof FETCHING_THREADS 
        | typeof FETCHING_COMMENTS
        | typeof DESELECT_THREAD,
}
|
{
    type: typeof SET_COMMENTS,
    payload: Comment[]
}
|
{
    type: typeof SELECT_THREAD,
    payload: Thread,
}

export function setThreads(threads: Thread[]) : ThreadActions {
    return {
        type: SET_THREADS,
        payload: threads
    }
}

export function fetchThreads() : ThreadActions {
    return {
        type: FETCHING_THREADS,
    }
}

export function selectThread(thread: Thread): ThreadActions {
    return {
        type: SELECT_THREAD,
        payload: thread,
    }
}

export function deselectThread(): ThreadActions {
    return {
        type: DESELECT_THREAD,
    }
}

export function fetchComments(): ThreadActions {
    return {
        type: FETCHING_COMMENTS,
    }
}

export function setComments(comments: Comment[]): ThreadActions {
    return {
        type: SET_COMMENTS,
        payload: comments,
    }
}

export type ThreadActionTypes = ThreadActions;