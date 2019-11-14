import React, { useEffect } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import { Grid, Container } from 'semantic-ui-react';

import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Auth/login';
import Register from './Components/Auth/register';
import GamesList from './Components/Games/gamesList';
import 'semantic-ui-css/semantic.min.css'
import { AppState } from './Reducers/store';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { logon } from './Reducers/Auth/authActions';

const App: React.FC = (props: any) => {

  useEffect(() => {
    axios.get('/api/auth')
    .then(response => {
      const user = response.data;
      console.log('User from auth: ' + user);
      if(user) {
        console.log('User found');
        props.logon(user);
        props.history.push('/games/browse');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div className="App">
        <Navbar />
        <Grid centered style={{ width: '100%' }} className="main-content">
          <Switch>
            <Route exact path="/auth/login" render={props => <Login />} />
            <Route exact path="/auth/register" render={props => <Register />} />

            <PrivateRoute exact path="/games/browse" component={GamesList} />

            <Redirect to="/auth/login" />
          </Switch>
        </Grid>
        
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
      user: state.auth.user,
      loggedIn: state.auth.loggedIn,
  }
}

const mapDispatchToProps = { logon };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
