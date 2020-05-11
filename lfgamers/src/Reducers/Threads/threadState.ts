export interface ThreadState {
    fetchingThreads: boolean;
    threads: Array<any>;
    selectedThread: any;
    fetchingComments: boolean;
    comments: Array<any>;
}