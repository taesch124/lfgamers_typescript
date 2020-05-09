import { connect } from 'react-redux';
import { GamesContainer } from './GamesContainer';
import { AppState } from '../../Reducers/store';
import { Game } from '../../UI.d/Game';

export interface GamesContainerProps {
    selectedGame: Game | undefined;
}

const mapStateToProps = (state: AppState) => ({
    selectedGame: state.ui.selectedGame
});

export default connect(mapStateToProps)(GamesContainer);