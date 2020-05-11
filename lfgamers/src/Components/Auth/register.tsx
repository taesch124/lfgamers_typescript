import React from 'react';
import { Container, Grid, Segment, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import RegisterForm from '../Forms/registerForm';
import logo from './../../Assets/Images/controller-icon.png';

const Register = () => {
    
    return (
        <Container className="auth-page-container">
            <Grid style={{ width: '100%' }} centered>
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
        </Container>
    )
}

export default Register;