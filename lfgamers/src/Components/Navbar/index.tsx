import { connect, ConnectedProps } from 'react-redux';
import { Navbar } from './Navbar';
import { logout } from './../../Reducers/Auth/authActions';
import { clearGameSelection } from './../../Reducers/UI/uiActions';
import { AppState } from './../../Reducers/store';

const mapStateToProps = (state: AppState) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
    }
}

const mapDispatchToProps = {logout, clearGameSelection};

const enhance = connect(mapStateToProps, mapDispatchToProps)

export interface NavbarProps extends ConnectedProps<typeof enhance> {}

export default enhance(Navbar);