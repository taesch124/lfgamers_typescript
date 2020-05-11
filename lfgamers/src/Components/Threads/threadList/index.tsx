import { connect, ConnectedProps } from 'react-redux';
import { ThreadList } from './threadList';
import { AppState } from '../../../Reducers/store';

const mapStateToProps = (state: AppState) => ({
    threads: state.threads.threads,
});

const enhance = connect(mapStateToProps);

export interface ThreadListProps extends
ConnectedProps<typeof enhance> {}

export default enhance(ThreadList);