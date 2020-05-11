import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps} from 'react-router-dom';
import { GamesContainer } from './GamesContainer';
import { AppState } from '../../Reducers/store';

const mapStateToProps = (state: AppState, props: GameContainerWithRouter) => {
    return {
        selectedGame: state.ui.selectedGame
    }
};

const enhance = connect(mapStateToProps);

interface GameContainerWithRouter extends 
RouteComponentProps<any> {}

interface GamesContainerWithConnect extends
ConnectedProps<typeof enhance> {}

export interface GamesContainerProps extends 
GameContainerWithRouter, 
GamesContainerWithConnect {}

export default enhance(withRouter(GamesContainer));