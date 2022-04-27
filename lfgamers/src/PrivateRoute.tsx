import React from 'react';
import Redux, { ConnectedProps } from 'react-redux';
import { Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppState } from './Reducers/store';

const mapStateToProps = (state: AppState) => {
  return {
      loggedIn: state.auth.loggedIn,
  }
}

const enhance = connect(mapStateToProps);

interface IProps extends 
RouteComponentProps<any>,
ConnectedProps<typeof enhance> 
{
    exact?: boolean,
    path: string,
    component: React.ComponentType<any> | Redux.ConnectedComponent<any, any>,
}
  
const PrivateRoute = ({
    component: Component,
    loggedIn,
  ...otherProps
}: IProps )  => {
  return(
    <Route {...otherProps} render={(p) => (
        loggedIn ?
          <Component {...p}/>
        :
          <Redirect to="/auth/login" />
    )} />
  )
}


export default withRouter(enhance(PrivateRoute));
