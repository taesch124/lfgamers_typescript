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



async function searchPopularGames() {
    let currentDate = new Date();
    let endDate = moment(currentDate).format('YYYY-MM-DD');
    let startDate = moment(currentDate).subtract(2, 'months').format('YYYY-MM-DD');
    let fields = fieldList.join(',');
    console.log(startDate, endDate);

    let url = `${baseUrl}/games/?limit=10&fields=${fields}&release_dates.date-gt=${startDate}&release_dates.date-lt=${endDate}&rating-gt=75`;
    
    try {
        let response = await axios.get(url);
        return response.data;
    } catch(error) {
        return {
            error: true,
            message: error,
        }
    }
    
    // .then(response => {
    //     console.log(response.data);
    //     return response.data;
    // })
    // .catch(error => {
    //     console.log('Uh oh');
    //     console.error(error);
    //     return {
    //         error: true,
    //         message: error
    //     }
    // });
}

module.exports = {
    searchPopularGames,
};