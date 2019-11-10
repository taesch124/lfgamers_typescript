import React from 'react';

import { Form, Button } from 'semantic-ui-react';

const LoginForm = () => {

    return (
        <Form size="large">
            <Form.Input 
                fluid 
                icon="user" 
                iconPosition="left" 
                placeholder="Username" 
            />
            <Form.Input 
                fluid 
                icon="lock" 
                iconPosition="left" 
                placeholder="Password"
                type="password"
            />
            <Button color="blue" fluid size="large">
                Login
            </Button>
        </Form>
    )
}

export default LoginForm;