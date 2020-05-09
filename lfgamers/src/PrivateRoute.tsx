import React from 'react';
import Redux from 'react-redux';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from './Reducers/store';

interface IProps extends RouteComponentProps {
    exact?: boolean,
    path: string,
    component: React.ComponentType<any> | Redux.ConnectedComponent<any, any>,
    user: {},
    loggedIn: boolean,
    history: any
}
  
  const PrivateRoute = ({
      component: Component,
    ...otherProps
  }: IProps )  => { 
    return(
    <Route {...otherProps} render={(p) => (
        otherProps.loggedIn
        ? <Component {...p}/>
        : otherProps.history.push('/auth/login')
    )} />
  )}

  const mapStateToProps = (state: AppState) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
    }
  }
  
  export default withRouter(connect(mapStateToProps)(PrivateRoute));
