import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../Reducers/store';
import { GamePage } from './gamePage';
import { clearGameSelection } from './../../../Reducers/UI/uiActions';

const mapStateToProps = (state: AppState) => ({
    game: state.ui.selectedGame,
});

const mapDispatchToProps = { clearGameSelection };

const enhance = connect(mapStateToProps, mapDispatchToProps);

export interface GamePageProps extends ConnectedProps<typeof enhance> {}

export default enhance(GamePage);