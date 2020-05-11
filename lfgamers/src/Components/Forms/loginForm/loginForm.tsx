import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button } from 'semantic-ui-react';
import { LoginFormProps } from '.';

export const LoginForm = (props: LoginFormProps) => {
    const {
        logon
    } = props;

    const [username, setUsername ] = useState('');
    const [password, setPassword] = useState('');

    const handleLogon = async (e: any) => {
        e.preventDefault();

        const user ={
            username,
            password
        }
    
        try {
            console.log('Loggin on as ' + username);
            const userResult = (await axios.post('/api/auth/login', {
                username: user.username,
                password: user.password
                })).data;

            console.log(userResult);
            logon(userResult);
            props.history.push('/games/browse');
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <Form size="large">
            <Form.Input 
                fluid 
                icon="user" 
                value={username}
                onChange={ e => setUsername(e.target.value)}
                iconPosition="left" 
                placeholder="Username" 
            />
            <Form.Input 
                fluid 
                icon="lock" 
                iconPosition="left"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
            />
            <Button 
                color="blue" 
                fluid 
                size="large"
                onClick={handleLogon}
            >
                Login
            </Button>
        </Form>
    )
    
}