import React, { useState } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import { Form, Button } from 'semantic-ui-react';
import {logon} from './../../Reducers/Auth/authActions';
import { store } from './../../Reducers/store';
import { withRouter } from 'react-router-dom';

 const LoginForm = (props: any) => {
    const [username, setUsername ] = useState('');
    const [password, setPassword] = useState('');

    const handleLogon = (e: any) => {
        e.preventDefault();

        const user ={
            username,
            password
        }
    
        console.log('Loggin on as ' + username);
        axios.post('/api/auth/login', {
            username: user.username,
            password: user.password
        })
        .then(response => {
            props.logon(response.data.results);
            //window.location.assign('/games/browse');
            props.history.push('/games/browse');
        })
        .catch(error => {
            console.error(error);
        });
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

const mapDispatchToProps =  {logon};

export default withRouter(connect( null , mapDispatchToProps)(LoginForm));