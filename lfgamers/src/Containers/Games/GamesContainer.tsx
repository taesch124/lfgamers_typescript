import * as React from 'react';
import { Grid, Header, Divider, Image } from 'semantic-ui-react';
import { GamesContainerProps } from '.';
import GamesList from '../../Components/Games/gamesList';
import GamePage from '../../Components/Games/gamePage';

import logo from './../../Assets/Images/controller-icon.png';

export function GamesContainer(props: GamesContainerProps) {
    const {
        selectedGame
    } = props;

    return (
        <Grid style={{ width: '100%' }} centered>
            <Grid.Column width={14}>
                <Divider hidden />
                {!selectedGame ?
                    <>
                        <Header as="h2" color="teal" textAlign="center">
                            <Image src={logo} /> Games
                        </Header>
                        <GamesList />
                    </>
                :
                    <GamePage />
                }
                
            </Grid.Column>
        </Grid>
    )
}

