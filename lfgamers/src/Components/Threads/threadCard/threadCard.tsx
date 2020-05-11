import * as React from 'react';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardMeta, CardDescription } from 'semantic-ui-react';
import { ThreadCardProps } from '.';

require('./threadCard.css');

export function ThreadCard(props: ThreadCardProps) {
    const {
        thread
    } = props;

    return (
        <Card className="thread-card" style={{ width: '100%' }}>
            <CardContent>
                <CardHeader>
                    {thread.originalComment.title}
                </CardHeader>
                <CardMeta>
                    Posted by {thread.postedBy.username} @ {moment(thread.postedAt).format('HH:mm:ss MM/DD/YYYY')}
                </CardMeta>
                <CardDescription>
                    <p>{thread.originalComment.text}</p>
                </CardDescription>
            </CardContent>
        </Card>
    )
}