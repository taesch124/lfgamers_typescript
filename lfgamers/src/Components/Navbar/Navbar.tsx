import React, { useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NavbarProps } from '.';

export const Navbar = (props: NavbarProps) => {
    const {
        loggedIn,
        logout,
        clearGameSelection
    } = props;

    const [activePage, setActivePage] = useState<string>('Login');

    const handleLogout = () => {
        axios.get('/api/auth/logout')
        .then(response => {
            if(response.data.error) {
                console.error(response.data.error);
                return;
            } else {
                logout();
                console.log('Logged out');
            }
        });
    }

    return (
        <Container fluid>
            <Menu>
                <Container>
                    {loggedIn ?
                    <>
                        <Link to="/games/browse">
                            <Menu.Item
                                name="browse"
                                active={activePage === 'Browse'}
                                onClick={e => {
                                    console.log('Clicked browse link');
                                    clearGameSelection();
                                    setActivePage('Browse');
                                }}
                            >
                                Browse Games
                            </Menu.Item>
                        </Link>
                        <Menu.Menu position="right">
                            <Menu.Item
                                name="logout"
                                active={false}
                                onClick={handleLogout}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Menu>
                    </>
                    :
                    <>
                        <Link to="/auth/login">
                            <Menu.Item
                                name="login"
                                active={activePage === 'Login'}
                                onClick={e => setActivePage('Login')}
                            >
                                Login
                            </Menu.Item>
                        </Link>
                        <Link to="/auth/register">
                            <Menu.Item
                                name="register"
                                active={activePage === 'Register'}
                                onClick={e => setActivePage('Register')}
                            >
                                Register
                            </Menu.Item>
                        </Link>
                    </>
                    }
                    
                </Container>
            </Menu>
        </Container>
    )
}