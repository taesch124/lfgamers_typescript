import React, { useEffect, useState } from 'react';
import { Grid, Divider, Segment, Header, Image } from 'semantic-ui-react';
import axios from 'axios';

import GameCard from './gameCard';

import { store } from './../../Reducers/store';
import logo from './../../Assets/Images/controller-icon.png';

const GamesList = () => {
    const [games, setGames] = useState<Array<any>>([]);

    console.log(store.getState());

    useEffect(() => {
        console.log('Getting games');
        axios.get('/api/games/browse')
        .then(response => {
            console.log(response.data);
            setGames(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    return (
        <Grid style={{ width: '100%' }} centered>
            <Grid.Column>
                <Divider hidden />
                <Header as="h2" color="blue" textAlign="center">
                    <Image src={logo} /> Games
                </Header>

                <Segment>
                    {games.length > 0 ?
                    games.map(game => <GameCard key={game.id} game={game} />) :
                    null
                    }
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default GamesList;