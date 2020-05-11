import { User } from "../../UI.d/User";

export const LOGON = 'LOGON';
export const LOGOUT = 'LOUGOUT';

interface LogonAction {
    type: typeof LOGON,
    payload: User,
}

export function logon(user: User) : AuthActionTypes {
    return {
        type: LOGON,
        payload: user
    }
}

interface LogoutAction {
    type: typeof LOGOUT,
}

export function logout() : AuthActionTypes {
    return {
        type: LOGOUT
    }
}


export type AuthActionTypes = LogonAction | LogoutAction;