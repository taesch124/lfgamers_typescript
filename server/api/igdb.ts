const Dotenv = require('dotenv').config();
const moment = require('moment');
const Keys = require('./../config/keys.ts');
const axios = require('axios');

const fieldList = require('./../config/igdb.ts').igdbGameFieldList;
const genres = require('./../config/igdb.ts').igdbGenres;
const platforms = require('./../config/igdb.ts').igdbPlatforms;
const baseUrl = 'https://api-v3.igdb.com';
axios.defaults.headers.common['user-key'] = Keys.igdb;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/apicalypse';



async function searchPopularGames() {
    let currentDate = new Date();
    let startDate = Math.floor(moment(currentDate).subtract(3, 'months').valueOf()/1000);
    let endDate = Math.floor(moment(currentDate).valueOf()/1000);
    let fields = fieldList.join(',');
    const limit = 10;
    console.log(currentDate, startDate, endDate);

    let url = `${baseUrl}/games`;
    let body = `fields ${fields};
    limit ${limit};
    where first_release_date > ${startDate} & first_release_date < ${endDate} & aggregated_rating > 80 & version_parent = null;`;
    
    try {
        let response = await axios({
            url,
            method: 'POST',
            data: body
        });
        return response.data;
    } catch(error) {
        return {
            error: true,
            message: error,
        }
    }
}

async function searchGames(searchPhrase) {
    let fields = fieldList.join(',');
    const limit = 10;

    const url = `${baseUrl}/games`;
    let body = `fields ${fields};
    limit ${limit};
    search "${searchPhrase}";
    where version_parent = null;`;

    try {
        const response = await axios({
            url,
            method: 'POST',
            data: body
        });
        return response.data;
    } catch(error) {
        console.error(error);
        return {
            error: true,
            message: error
        }
    }
}

async function getPoster(gameId) {
    const url = `${baseUrl}/covers`;
    const body = `fields game,url;
    where game = ${gameId};`

    try {
        let response = await axios({
            url,
            method: 'POST',
            data: body
        });
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error,
        }
    }
}

function parseEnumeratedField(json, data) {
    let fieldValues = [];
    if(!json) return fieldValues;
    for (let i = 0; i < json.length; i++) {
        let value = data[json[i]];
        if(!value) continue;
        fieldValues.push(value);
    }
    return fieldValues;
}

module.exports = {
    searchPopularGames,
    searchGames,
    getPoster,
    parseEnumeratedField
};