import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import { GamePageProps } from '.';

export function GamePage(props: GamePageProps) {
    const {
        selectedGame
    } = props;

    if(!selectedGame) return <div/>

    return (
        <Segment>
            <h1>{selectedGame.name}</h1>
        </Segment>
    )
}