import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Login = () => {
    
    return (
        <Grid style={{ width: '100%' }} centered verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 620}}>
                <Segment stacked>
                    Register
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