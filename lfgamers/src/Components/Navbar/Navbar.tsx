import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {logout} from './../../Reducers/Auth/authActions';
import { AppState } from './../../Reducers/store';

const Navbar = (props: any) => {
    const [activePage, setActivePage] = useState<string>('Login');

    const handleLogout = () => {
        axios.get('/api/auth/logout')
        .then(response => {
            if(response.data.error) {
                console.error(response.data.error);
                return;
            } else {
                props.logout();
                console.log('Logged out');
            }
        });
    }

    return (
        <Container fluid>
            <Menu>
                <Container>
                    {props.loggedIn ?
                    <>
                        <Link to="/games/browse">
                            <Menu.Item
                                name="browse"
                                active={activePage === 'Browse'}
                                onClick={e => setActivePage('Browse')}
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

const mapStateToProps = (state: AppState) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
    }
}

const mapDispatchToProps = {logout};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);