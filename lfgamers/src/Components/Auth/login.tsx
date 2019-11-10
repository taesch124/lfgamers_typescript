import React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LoginForm from './../Forms/loginForm';
import logo from './../../Assets/Images/controller-icon.png';

const Login = () => {
    
    return (
        <Grid style={{ width: '100%' }} centered verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 460}}>
                <Header as="h2" color="blue" textAlign="center">
                    <Image src={logo} /> LFGamers
                </Header>

                <Segment stacked>
                    <LoginForm />
                </Segment>

                <Segment>
                    Don't have an account? Sign up 
                    <Link to="/auth/register"> here</Link>
                </Segment>
            </Grid.Column>
        </Grid>
        
    )
}

export default Login;