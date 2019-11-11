export const LOGON = 'LOGON';
export const LOGOUT = 'LOUGOUT';

interface LogonAction {
    type: typeof LOGON,
    payload: string,
}

export function logon(user: string) : AuthActionTypes {
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