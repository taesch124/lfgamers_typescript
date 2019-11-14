import React from 'react';
import {connect} from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {logout} from './../../Reducers/Auth/authActions';
import { AppState } from './../../Reducers/store';
import { AuthState } from './../../Reducers/Auth/authState';

const Navbar = (props: any) => {

    const handleLogout = () => {
        axios.get('/api/auth/logout')
        .then(response => {
            if(response.data.error) {
                console.error(response.data.error);
                return;
            } else {
                props.logout();
                console.log('Logged out');
                props.history.push('/auth/login');
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
                                active={false}
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
                                active={true}
                            >
                                Login
                            </Menu.Item>
                        </Link>
                        <Link to="/auth/register">
                            <Menu.Item
                                name="register"
                                active={false}
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