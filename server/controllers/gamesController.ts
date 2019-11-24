const Game = require('./../models/Game.ts');
const igdb = require('./../api/igdb.ts');
const moment = require('moment');

async function getAndSavePopularGames() {
    try {
        let games = await igdb.searchPopularGames();

        let igdbIds = games.map(e => e.id);
        let bulk = [];
        let response = [];

        let matchingIds = await Game.find({'id': {$in: igdbIds}});
        console.log('Found ' + matchingIds.length + ' matches and ' + games.length  + ' games.');

        if(matchingIds.length === games.length) {
            return matchingIds;
        } else {
            response = matchingIds;
            let dbIds = matchingIds.map(e => e.id);
            let newGames = games.filter(e => !dbIds.includes(e.id));
            console.log(newGames.length + ' games to add.');

            for(let i = 0; i < newGames.length; i++) {
                createAndSaveGame(newGames[i], response, bulk);
            }
            console.log('Bulk has ' + bulk.length);
            if(bulk.length === 0 ) {
                return response;
            }

            let success = await Game.bulkWrite(bulk);
            if(success) return response;
            else return {
                error: true,
                message: success
            }
        }
    }
    catch(error) {
        return {
            error: true,
            message: error
        }
    }
    
}

function createAndSaveGame(gameObj, response, bulk) {
    if(gameObj.first_release_date) gameObj.releaseDate = moment.unix(gameObj.first_release_date).format('YYYY-MM-DD');
    if(gameObj.genres) gameObj.genres = gameObj.genres.map(genre => genre.name);
    if(gameObj.platforms) gameObj.platforms = gameObj.platforms.map(platform => platform.name);
    let game = Game.createGame(gameObj);

    const {_id, ...update} = game._doc;
    response.push(game._doc);

    let command = {
        updateOne: {
            "filter": {id: game.id},
            "replacement": game._doc,
            "upsert": true,
            "multi": true
        }
    }
    bulk.push(command);
}

module.exports = {
    getAndSavePopularGames,
}