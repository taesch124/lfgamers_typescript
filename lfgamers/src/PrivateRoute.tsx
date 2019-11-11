import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from './Reducers/store';
  
  const PrivateRoute = (props: any) => { 
    console.log(props.Component);
    return(
    <Route {...props.rest} render={(p) => (
        props.loggedIn
        ? <props.Component {...p}/>
        : <Redirect to='/auth/login' />
    )} />
  )}

  const mapStateToProps = (state: AppState) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
    }
  }
  
  export default connect(mapStateToProps)(PrivateRoute);
