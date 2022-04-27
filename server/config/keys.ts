require('dotenv').config();

interface ApplicationKeys {
    igdb: string,
    twitch: {
        clientId: string;
        clientSecret: string;
    }
}

export const applicationKeys: ApplicationKeys = {
    igdb: process.env.IGDB_KEY,
    twitch: {
        clientId: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
    }
}
