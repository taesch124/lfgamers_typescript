import axios from 'axios';
import { applicationKeys } from '../config/keys';

interface TwitchApiTokens {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export class TwitchAPI {
    private static _instance: TwitchAPI | undefined = undefined;
    private static loggedIn: boolean;
    private static tokens: TwitchApiTokens | undefined;

    constructor() {
        TwitchAPI.loggedIn = false;
        TwitchAPI.tokens = undefined;
    }

    private static setTokens = (tokens) => {
        TwitchAPI.tokens = tokens;
    } 

    public static getInstance = (): TwitchAPI => {
        if (!TwitchAPI._instance) {
            TwitchAPI._instance = new TwitchAPI();
        }

        return TwitchAPI._instance;
    }

    public static getAccessToken = (): string => {
        if (!TwitchAPI.tokens) {
            return '';
        }

        return TwitchAPI.tokens.access_token;
    }

    public static checkTokens = (): boolean => TwitchAPI.loggedIn
        && Boolean(TwitchAPI.tokens);

    public static async login(): Promise<boolean> {
        const {
            clientId,
            clientSecret,
        } = applicationKeys.twitch;

        const twitchApiUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

        try {
            let response = await axios.post<TwitchApiTokens>(twitchApiUrl);
            TwitchAPI.setTokens(response.data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
