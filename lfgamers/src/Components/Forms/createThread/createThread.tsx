import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Divider, TextArea } from 'semantic-ui-react';
import { CreateThreadFormProps } from '.';

require('./createThread.css');

export interface CreateThreadFormValues {
    title: string;
    text: string;
    userId: string;
    gameId: string;
}

export const CreateThreadForm = (props: CreateThreadFormProps) => {
    const {
        user,
        game,
        getThreads,
        closeForm,
    } = props;

    const [title, setTitle ] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(!user || !game) return;

        const threadData = {
            userId: user._id,
            gameId: game._id,
            title,
            text,
        };
        try {
            const result = await axios.post('/api/threads/create', threadData);
            if(result.data.error) {
                console.error(result.data.error);
            } else {
                getThreads();
                closeForm();
            }
        } catch(error) {
            console.error(error);
        }
        
    }

    return (
        <Form size="large" className="create-thread-form">
            <Button
                color="violet"
                icon="left arrow"
                size="mini"
                onClick={() => closeForm()}
            />
            <Divider hidden />
            <h2>Create New Thread</h2>
            <Form.Input 
                fluid  
                value={title}
                onChange={ e => setTitle(e.target.value)}
                placeholder="Title" 
            />
            <TextArea
                type="textarea" 
                fluid
                rows={6}
                value={text}
                onChange={(e: any) => setText(e.target.value)}
                placeholder="Body"
            />
            <Divider hidden />
            <Button 
                color="blue" 
                fluid 
                size="large"
                onClick={handleSubmit}
            >
                Create Thread
            </Button>
        </Form>
    )
}