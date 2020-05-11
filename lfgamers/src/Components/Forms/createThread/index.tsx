import { connect, ConnectedProps } from 'react-redux';
import { CreateThreadForm, CreateThreadFormValues } from './createThread';
import { AppState } from '../../../Reducers/store';

const mapStateToProps = (state: AppState) => ({
    user: state.auth.user,
    game: state.ui.selectedGame,
});

const enhance = connect(mapStateToProps);

export interface CreateThreadFormProps extends
ConnectedProps<typeof enhance> {
    getThreads: () => void;
    closeForm: () => void;
}

export default enhance(CreateThreadForm);