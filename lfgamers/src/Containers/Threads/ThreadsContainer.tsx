import * as React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
import { ThreadsContainerProps } from '.';
import CreateThreadForm from '../../Components/Forms/createThread';
import ThreadList from '../../Components/Threads/threadList';

require('./threadsContainer.css');

export function ThreadsContainer(props: ThreadsContainerProps) {
    const {
        game,
        threads,
        fetchingThreads,
        fetchThreads,
        setThreads,
    } = props;

    const [creatingThread, setCreatingThread] = React.useState<boolean>(false);

    const getThreads = React.useCallback(async () => {
        if (!game) return;
        
        fetchThreads();
        try {
            const threads = (await axios.get(`/api/threads/game/${game._id}`)).data;
            console.log(threads);
            setThreads(threads);
        } catch (error) {
            console.error(error);
        }
    }, [game, fetchThreads, setThreads]);

    React.useEffect(() => {
        getThreads();
    }, [getThreads]);

    return (
        <Grid>
            {creatingThread ?
                <CreateThreadForm
                    getThreads={getThreads}
                    closeForm={() => setCreatingThread(false)}
                />
            : fetchingThreads ?
                <Grid style={{width: '100%'}} centered>
                    <span>Loading threads...</span>
                </Grid>
            :   threads.length > 0 ?
                <Grid.Row centered>
                    <Button 
                        color="blue"
                        icon="plus"
                        iconPositin="left"
                        onClick={() => setCreatingThread(true)}
                    >
                        Create Thread
                    </Button>
                    <ThreadList />
                </Grid.Row>
            :
                    <Grid style={{width: '100%'}} centered>
                        <Grid.Row centered>
                            <span>No threads... Create one now!</span>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Button 
                                color="blue"
                                onClick={() => setCreatingThread(true)}
                            >
                                Create Thread
                            </Button>
                        </Grid.Row>
                    </Grid>
            }
        </Grid>
    )
}