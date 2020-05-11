import React from 'react';
import moment from 'moment';
import {Card, CardContent, CardMeta, CardDescription, Grid} from 'semantic-ui-react';
import { GameCardProps } from '.';
import { Game } from '../../../UI.d/Game';

import './gameCard.css';
import { FavoriteGameButton } from '../../Buttons';

export const GameCard = (props: GameCardProps) => {
    const {
        game,
        history,
        selectGame
    } = props;

    const goToGamePage = (game: Game) => {
        history.push(`/games/game/${game._id}`);
        selectGame(game);
    }

    return (
        <Card className="igdb-game-card" onClick={() => goToGamePage(game)}>
            <CardContent>
                <Grid>
                    <Grid.Row>
                            <Grid.Column width={2}>
                                {game.poster &&
                                    <img className="game-card-poster" src={game.poster} alt={`${game.name}'s poster`}/>
                                }
                            </Grid.Column>
                            <Grid.Column width={13}>
                                <h4 className="game-card-title">{game.name}</h4>
                                <CardMeta>
                                    Released: {game.releaseDate ? moment(game.releaseDate).format('MM/DD/YYYY') : 'N/A'}
                                </CardMeta>
                            </Grid.Column>
                            <Grid.Column width={1} textAlign="right">
                                <FavoriteGameButton />
                            </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <CardDescription>
                            <p className="game-card-summary">{game.summary}</p>
                        </CardDescription>
                    </Grid.Row>
                </Grid>
            </CardContent>
        </Card>
    )
}