import React from 'react';
import { Grid, Divider, Segment, Header, Image } from 'semantic-ui-react';

import { store } from './../../Reducers/store';
import logo from './../../Assets/Images/controller-icon.png';

const GamesList = () => {

    console.log(store.getState());

    return (
        <Grid style={{ width: '100%' }} centered>
            <Grid.Column>
                <Divider hidden />
                <Header as="h2" color="blue" textAlign="center">
                    <Image src={logo} /> Games
                </Header>

                <Segment>
                    Games list here
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default GamesList;