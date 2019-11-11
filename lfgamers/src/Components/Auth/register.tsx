import React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import RegisterForm from './../Forms/registerForm';
import logo from './../../Assets/Images/controller-icon.png';

const Login = () => {
    
    return (
        <Grid style={{ width: '100%' }} centered verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 620}}>
                <Header as="h2" color="blue" textAlign="center">
                        <Image src={logo} /> LFGamers
                </Header>

                <Segment stacked>
                    <Header as="h4" color="black" textAlign="center">
                        Register
                    </Header>
                    <RegisterForm />
                </Segment>

                <Segment>
                    Already have an account? Login 
                    <Link to="/auth/login"> here</Link>
                </Segment>
            </Grid.Column>
        </Grid>
        
    )
}

export default Login;