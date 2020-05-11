import {connect} from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RegisterForm } from './registerForm';


export interface RegisterFormProps extends
RouteComponentProps<any>
{}

export default withRouter(connect( null , null)(RegisterForm));