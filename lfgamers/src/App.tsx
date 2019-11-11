import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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

const App: React.FC = () => {

  return (
    <div className="App">
        <Navbar />
        <Grid centered style={{ width: '100%' }} className="main-content">
          <Switch>
            <Route exact path="/auth/login" render={props => <Login />} />
            <Route exact path="/auth/register" render={props => <Register />} />

            <PrivateRoute exact path="/games/browse" Component={GamesList} />

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

export default connect(mapStateToProps)(App);
