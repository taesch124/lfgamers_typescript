import React, { useEffect, useState } from 'react';
import { Grid, Divider, Segment } from 'semantic-ui-react';
import SearchGames from '../../Forms/IGDB/searchGames';
import axios from 'axios';

import List from '../../List/List';
import GameCard from '../gameCard/gameCard';
import { timeoutPromise } from './../../../Lib/promiseHelper';
import { IGDB_TIMEOUT } from './../../../Lib/constants';

export const GamesList = (props: any) => {
    const {
        games,
        fetching,
        fetchingGames,
        setGames,
    } = props;
    const [apiTimeout, setTimeout] = useState<boolean>(false);

    useEffect(() => {
        async function retrieveGames() {
            fetchingGames();
            const timeout = timeoutPromise(IGDB_TIMEOUT);
            const games = axios.get('/api/games/browse');
            try {
                const response = await Promise.race<any>([timeout, games]);
                if(response.timeout) setTimeout(true);
                else if(response.data) setGames(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        retrieveGames();
    }, []);

    return (
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
    )
}

