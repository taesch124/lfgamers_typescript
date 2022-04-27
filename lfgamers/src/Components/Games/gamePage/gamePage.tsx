import * as React from 'react';
import moment from 'moment';
import { Grid, Segment, Divider, Button } from 'semantic-ui-react';
import { GamePageProps } from '.';
import ThreadsContainer from '../../../Containers/Threads';

require('./gamePage.css');

export function GamePage(props: GamePageProps) {
    const {
        game,
        clearGameSelection
    } = props;

    const [showGameDetails, setShowGameDetails] = React.useState<boolean>(true);

    if(!game) return <div/>;

    return (
        <>
            <Segment>
                <Grid style={{ width: '100%' }}>
                    <Grid.Row className="header-back-button-row">
                        <Grid.Column>
                            <Button
                                color="violet"
                                icon="left arrow"
                                size="mini"
                                onClick={clearGameSelection}
                            />
                            <Button
                                color="violet"
                                size="mini"
                                onClick={() => setShowGameDetails(!showGameDetails)}
                            >
                                {showGameDetails ? 'Hide Details' : 'Show Details'}
                            </Button>
                            {!showGameDetails && <span className='game-title-no-details'>{game.name}</span>}
                        </Grid.Column>
                    </Grid.Row>
                    {showGameDetails &&
                        <Grid.Row>
                            {game.poster &&
                                <Grid.Column width={3}>
                                    <img alt="game poster" src={game.poster} className="game-poster" />
                                </Grid.Column>
                            }
                            <Grid.Column width={13}>
                                <h2 className='game-title'>{game.name}</h2>
                                <p className="game-metadata">Released: {game.releaseDate ? moment(game.releaseDate).format('MM/DD/YYYY') : 'N/A'}</p>
                                {game.genres && <p className="game-metadata">Genre(s): {game.genres.join(', ')}</p>}
                                {game.platforms && <p className="game-metadata">Platform(s): {game.platforms.join(', ')}</p>}
                                <p className="game-summary">{game.summary}</p>
                            </Grid.Column>
                        </Grid.Row>
                    }
                </Grid>
            </Segment>

            <Divider hidden />

            <Grid>
                <Grid.Column width={8}>
                    <Segment>
                        <ThreadsContainer />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Segment>
                        Chat
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
}