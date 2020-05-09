import { connect } from 'react-redux';
import { Navbar } from './Navbar';
import { logout } from './../../Reducers/Auth/authActions';
import { clearGameSelection } from './../../Reducers/UI/uiActions';
import { AppState } from './../../Reducers/store';


export interface NavbarProps {
    loggedIn: boolean;
    logout: () => void;
    clearGameSelection: () => void;
}

const mapStateToProps = (state: AppState) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
    }
}

const mapDispatchToProps = {logout, clearGameSelection};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);