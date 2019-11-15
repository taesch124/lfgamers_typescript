import React from 'react';
import {Card, CardContent, CardHeader, CardMeta, CardDescription} from 'semantic-ui-react';

const GameCard = (props: any) => {
    const game = props.game;

    return (
        <Card>
            <CardContent>
                <CardHeader>
                    {game.name}
                </CardHeader>
            </CardContent>
        </Card>
    )
}

export default GameCard;