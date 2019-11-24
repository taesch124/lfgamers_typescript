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
    let currentDate = new Date().valueOf();
    let startDate = moment(currentDate).subtract(2, 'months').valueOf();
    let fields = fieldList.join(',');
    const limit = 10;

    let url = `${baseUrl}/games`;
    let body = `fields ${fields};
    limit ${limit};
    where first_release_date > ${startDate} & first_release_date < ${currentDate} & aggregated_rating > 75;`;
    
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
    parseEnumeratedField
};