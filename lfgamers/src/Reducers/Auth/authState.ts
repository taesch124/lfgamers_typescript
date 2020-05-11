import { User } from "../../UI.d/User";

export interface AuthState {
    user: User | undefined,
    loggedIn: boolean,
}

