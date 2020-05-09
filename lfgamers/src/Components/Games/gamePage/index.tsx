import { connect } from 'react-redux';
import { Game } from '../../../UI.d/Game';
import { AppState } from '../../../Reducers/store';
import { GamePage } from './gamePage';

export interface GamePageProps {
    selectedGame: Game | undefined;
}

const mapStateToProps = (state: AppState) => ({
    selectedGame: state.ui.selectedGame,
});

export default connect(mapStateToProps)(GamePage);