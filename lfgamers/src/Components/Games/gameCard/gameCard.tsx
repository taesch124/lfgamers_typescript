import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {Card, CardContent, CardHeader, CardMeta, CardDescription} from 'semantic-ui-react';

import {selectGame} from './../../../Reducers/UI/uiActions';

import './gameCard.css';

const GameCard = (props: any) => {
    const {
        game,
        selectGame
    } = props;

    return (
        <Card className="igdb-game-card" onClick={() => selectGame(game)}>
            <CardContent>
                <CardHeader>
                    {game.poster
                    ?
                    <img src={game.poster} alt={`${game.name}'s poster`}/>
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

const mapDispatchToProps =  {selectGame};

export default connect(null, mapDispatchToProps)(GameCard);
