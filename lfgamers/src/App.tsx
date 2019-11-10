import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import { Grid, Container } from 'semantic-ui-react';

import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Auth/login';
import Register from './Components/Auth/register';
import 'semantic-ui-css/semantic.min.css'

const App: React.FC = () => {
  return (
    <div className="App">
        <Navbar />
        <Grid centered style={{ width: '100%' }} className="main-content">
          <Switch>
            <Route exact path="/auth/login" render={props => <Login />} />
            <Route exact path="/auth/register" render={props => <Register />} />

            <Redirect to="/auth/login" />
          </Switch>
        </Grid>
        
    </div>
  );
}

export default App;
