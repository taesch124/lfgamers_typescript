import * as React from 'react';
import { ThreadListProps } from '.';
import List from './../../List/List';
import ThreadCard from '../threadCard';

export function ThreadList(props: ThreadListProps){
    const {
        threads
    } = props;

    return (
        <List>
            {threads.map((thread) => <ThreadCard key={thread._id} thread={thread} />)}
        </List>
    )
}