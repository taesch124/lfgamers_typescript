import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

const Navbar = () => {
    return (
        <Container fluid>
            <Menu>
                <Container>
                    <Menu.Item
                        name="register"
                        active={false}
                    >
                        Register
                    </Menu.Item>
                    <Menu.Item
                        name="login"
                        active={true}
                    >
                        Login
                    </Menu.Item>
                </Container>
            </Menu>
        </Container>
    )
}

export default Navbar;