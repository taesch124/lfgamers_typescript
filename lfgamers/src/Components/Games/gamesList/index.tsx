import { connect, ConnectedProps } from 'react-redux';
import { GamesList } from './gamesList';
import { setGames, fetchingGames } from '../../../Reducers/IGDB/igdbActions';
import { AppState } from '../../../Reducers/store';

const mapDispatchToProps =  {setGames, fetchingGames};

const mapStateToProps = (state: AppState) => {
    return {
        fetching: state.igdb.fetching,
        games: state.igdb.games,
    }
}

const enhance = connect(mapStateToProps, mapDispatchToProps);

export interface GamesListProps extends ConnectedProps<typeof enhance>{};

export default enhance(GamesList);