import {connect, ConnectedProps} from 'react-redux';
import { SearchGamesField } from './searchGamesField';
import { setGames, fetchingGames } from '../../../../Reducers/IGDB/igdbActions';

const mapDispatchToProps =  {setGames, fetchingGames};

const enhance = connect(null, mapDispatchToProps);

export interface SearchGamesFieldProps extends ConnectedProps<typeof enhance> {}

export default enhance(SearchGamesField);