import { connect, ConnectedProps } from 'react-redux';
import { ThreadsContainer } from './ThreadsContainer';
import { AppState } from '../../Reducers/store';
import { fetchThreads, setThreads } from './../../Reducers/Threads/threadActions';

const mapStateToProps = (state: AppState) => ({
    game: state.ui.selectedGame,
    threads: state.threads.threads,
    fetchingThreads: state.threads.fetchingThreads,
    selectedThread: state.threads.selectedThread,
});

const mapDispatchToProps = {fetchThreads, setThreads};

const enhance = connect(mapStateToProps, mapDispatchToProps);

export interface ThreadsContainerProps extends
ConnectedProps<typeof enhance>
{}

export default enhance(ThreadsContainer);