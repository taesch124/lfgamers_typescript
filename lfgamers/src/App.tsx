import React, { useEffect } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import axios from 'axios';

import Navbar from './Components/Navbar';
import Login from './Components/Auth/login';
import Register from './Components/Auth/register';
import GamesContainer from './Containers/Games';
import PrivateRoute from './PrivateRoute';

import { AppState } from './Reducers/store';
import { logon } from './Reducers/Auth/authActions';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

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

            <PrivateRoute exact path="/games/browse" component={GamesContainer} />
            {/* <PrivateRoute exact path="/games/:gameId" component={GameScreen} />  */}

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
