import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import axios from 'axios';
import { withRouter, Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { Loader, Container } from 'semantic-ui-react';

import Navbar from './Components/Navbar';
import Login from './Components/Auth/login';
import Register from './Components/Auth/register';
import GamesContainer from './Containers/Games';
import PrivateRoute from './PrivateRoute';
import { AppState } from './Reducers/store';
import { logon } from './Reducers/Auth/authActions';
import { selectGame } from './Reducers/UI/uiActions';

import 'semantic-ui-css/semantic.min.css';
import './App.css';


const mapStateToProps = (state: AppState) => {
  return {
      user: state.auth.user,
      loggedIn: state.auth.loggedIn,
  }
}

const mapDispatchToProps = { logon, selectGame };

const enhance = connect(mapStateToProps, mapDispatchToProps);

interface AppProps extends 
ConnectedProps<typeof enhance>,
RouteComponentProps<any> {};

const App = (props: AppProps) => {
  const {
    match,
    history,
    loggedIn,
    logon,
  } = props;

  const [checked, setChecked] = React.useState<boolean>(false);

  const checkForUser = React.useCallback(async () => {
    if(loggedIn) return;

    try {
      const response = await axios.get('/api/auth');
      const user = response.data;
      if(user) {
        console.log('user found');
        console.log(user);
        logon(user);
      }
    } catch (error) {
      console.error(error);
    }
  }, [loggedIn, logon]);

  const checkForGame = React.useCallback(async () => {
    console.log(match);
    const gameId = match.params.gameId;
        if(gameId) {
          console.log('game id found');
          const selectedGame = (await axios.get(`/api/games/game/${gameId}`)).data;
          console.log(selectedGame);
          selectGame(selectedGame);
          setChecked(true);
          history.push(`/games/game/${selectedGame._id}`);
        } else {
          setChecked(true);
          history.push('/games/browse');
        }
  }, [history, match, setChecked]);

  React.useEffect(() => {
    if(!loggedIn && !checked) {
      checkForUser();
    }
  }, [loggedIn, checked, checkForUser]);

  React.useEffect(() => {
    console.log('log in state changed to ' + loggedIn);
    if(loggedIn && !checked) {
      console.log('checking game');
      checkForGame();
    } else {
      setChecked(true);
    }
  }, [loggedIn, checked, checkForGame]);

  if(!checked) {
    return (
      <div className="App">
          <Loader active/>
      </div>
    )
  }

  return (
    <div className="App">
        <Navbar />
        <Container fluid style={{ width: '100%' }} className="main-content">
          <Switch>
            <Route exact path="/auth/login" render={props => <Login />} />
            <Route exact path="/auth/register" render={props => <Register />} />

            <PrivateRoute exact path="/games/browse" component={GamesContainer} />
            <PrivateRoute exact path="/games/game/:gameId" component={GamesContainer} />

            <Redirect to="/auth/login" />
          </Switch>
        </Container>
        
    </div>
  );
}



export default enhance(withRouter(App));
