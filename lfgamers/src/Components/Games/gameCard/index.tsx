import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { GameCard } from './gameCard';
import {selectGame} from './../../../Reducers/UI/uiActions';
import { Game } from '../../../UI.d/Game';

const mapDispatchToProps =  {selectGame};

const enhance = connect(null, mapDispatchToProps);

export interface GameCardProps extends 
RouteComponentProps<any>,
ConnectedProps<typeof enhance> {
    game: Game
}

export default withRouter(enhance(GameCard));