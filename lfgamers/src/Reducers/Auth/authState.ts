export interface AuthState {
    user: {},
    loggedIn: boolean,
}

export interface UserState {
    username: string,
    password?: string,
    email: string
}