import React, { useEffect, useState } from 'react';
import { Grid, Divider, Segment, Header, Image } from 'semantic-ui-react';
import SearchGames from './../Forms/IGDB/searchGames';
import {connect} from 'react-redux';
import axios from 'axios';

import {setGames, fetchingGames} from './../../Reducers/IGDB/igdbActions';
import { AppState } from './../../Reducers/store';
import List from './../List/List';
import GameCard from './gameCard';
import logo from './../../Assets/Images/controller-icon.png';
import { timeoutPromise } from '../../Lib/promiseHelper';

const GamesList = (props: any) => {
    const {
        games,
        fetching,
        fetchingGames,
        setGames,
    } = props;
    const [apiTimeout, setTimeout] = React.useState<boolean>(false);

    useEffect(() => {
        async function retrieveGames() {
            fetchingGames();
            const timeout = timeoutPromise(8000);
            const games = axios.get('/api/games/browse');
            try {
                const response = await Promise.race<any>([timeout, games]);
                console.log(response.data);
                if(response.timeout) setTimeout(true);
                else if(response.data) setGames(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        retrieveGames();
    }, []);

    return (
        <Grid style={{ width: '100%' }} centered>
            <Grid.Column width={14}>
                <Divider hidden />
                <Header as="h2" color="blue" textAlign="center">
                    <Image src={logo} /> Games
                </Header>

                <Segment>
                    <Divider hidden />
                    <Grid style={{ width: '100%' }} centered>
                        <Grid.Column width={6}>
                            <SearchGames />
                        </Grid.Column>
                    </Grid>
                    <Divider hidden />
                    {fetching ? 
                        <p>Retrieving Games...</p>
                    : games.length > 0 ?
                        <List>
                            {games.map((game: { id: any; }) => <GameCard key={game.id} game={game} />) }
                        </List>
                    : apiTimeout ?
                        <p>Connection to IGDB timed out</p>
                    : null
                    }
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

const mapDispatchToProps =  {setGames, fetchingGames};

const mapStateToProps = (state: AppState) => {
    return {
        fetching: state.igdb.fetching,
        games: state.igdb.games,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);