import {connect, ConnectedProps} from 'react-redux';
import { LoginForm } from './loginForm'
import {logon} from '../../../Reducers/Auth/authActions';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const mapDispatchToProps =  {logon};

const enhance = connect(null, mapDispatchToProps);

export interface LoginFormProps extends 
ConnectedProps<typeof enhance>, 
RouteComponentProps<any> 
{}

export default withRouter(enhance(LoginForm));