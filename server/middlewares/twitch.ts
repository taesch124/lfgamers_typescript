import { TwitchAPI } from '../api/twitch';

export async function checkTwitchApiConnection(_, res, next) {
    if (!TwitchAPI.checkTokens()) {
        const loginResponse = await TwitchAPI.login();
        if (!loginResponse) {
            res.send(500);
        }
    }
    next();
}