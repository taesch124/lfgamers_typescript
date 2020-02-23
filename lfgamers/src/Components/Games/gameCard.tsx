import React from 'react';
import moment from 'moment';
import {Card, CardContent, CardHeader, CardMeta, CardDescription} from 'semantic-ui-react';

import './gameCard.css';

const GameCard = (props: any) => {
    const {
        game
    } = props;
    console.log(game);

    return (
        <Card>
            <CardContent>
                <CardHeader>
                    {game.poster
                    ?
                    <img src={game.poster} />
                    :
                    null
                    }
                    <br/>
                    {game.name}
                </CardHeader>
                <CardMeta>
                    Released: {game.releaseDate ? moment(game.releaseDate).format('MM/DD/YYYY') : 'N/A'}
                </CardMeta>
                <CardDescription>
                    
                    {game.summary}
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default GameCard;