import React, { useEffect, useState } from 'react';
import { Grid, Divider, Segment, Header, Image } from 'semantic-ui-react';
import {connect} from 'react-redux';
import axios from 'axios';

import {setGames} from './../../Reducers/IGDB/igdbActions';
import {store, AppState } from './../../Reducers/store';
import List from './../List/List';
import GameCard from './gameCard';
import logo from './../../Assets/Images/controller-icon.png';

const GamesList = (props: any) => {
    console.log(store.getState());

    useEffect(() => {
        console.log('Getting games');
        axios.get('/api/games/browse')
        .then(response => {
            props.setGames(response.data);
            console.log(store.getState());
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
                    {props.games.length > 0 ?
                    <List>
                        {props.games.map((game: { id: any; }) => <GameCard key={game.id} game={game} />) }
                    </List>
                    :
                    null
                    }
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

const mapDispatchToProps =  {setGames};

const mapStateToProps = (state: AppState) => {
    return {
        games: state.igdb.games,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);