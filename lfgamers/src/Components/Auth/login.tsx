import React from 'react';
import { Container, Grid, Segment, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LoginForm from '../Forms/loginForm';
import logo from './../../Assets/Images/controller-icon.png';

require('./auth.css');

const Login = () => {
    
    return (
        <Container className="auth-page-container">
            <Grid style={{ width: '100%' }} centered>
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
        </Container>
    )
}

export default Login;