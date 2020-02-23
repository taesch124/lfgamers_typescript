import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import { Form, Button, Message } from 'semantic-ui-react';
import { store } from './../../Reducers/store';
import FormError from './../../UI.d/FormError';

 const RegisterForm = (props: any) => {
    const [username, setUsername ] = useState<string>('');
    const [email, setEmail ] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Array<FormError>>([]);
    console.log(store.getState());

    const handleRegister = (e: any) => {
        e.preventDefault();
        setErrors([]);

        //validate function here

        const user = {
            username,
            email,
            password,
        }
        console.log('Registering as ' + username);
        axios.post('/api/auth/register', {
            user
        })
        .then(response => {
            console.log(response.data);
            if(response.data.error) {

                setErrors([{
                    field: response.data.field,
                    message: response.data.message,
                }]);
            } else {
                console.log('rerouting to login!');
                props.history.push('/auth/login');
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <>
            <Form size="large" error={errors.length > 0}>
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
                    icon="mail" 
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                    iconPosition="left" 
                    placeholder="Email" 
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
                    onClick={handleRegister}
                >
                    Register
                </Button>
            </Form>
            {errors.length > 0 ?
                errors.map((error: FormError, index: number)  => {
                    return (
                        <Message
                            error
                            attached="bottom"
                            key={index}
                            content={`${error.field}: ${error.message}`}
                        />
                    )
                })
                
            :
                null
            }
        </>
    )
    
}

export default withRouter(connect( null , null)(RegisterForm));