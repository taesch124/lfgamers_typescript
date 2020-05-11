const Game = require('./../models/Game.ts');
const igdb = require('./../api/igdb.ts');
const moment = require('moment');

async function getAndSavePopularGames() {
    try {
        const games = await igdb.searchPopularGames();
        const savedGames = await updateAndSaveGames(games);
        if(savedGames) return savedGames;
    }
    catch(error) {
        return {
            error: true,
            message: error
        }
    }
    
}

async function searchAndSaveGames(searchPhrase) {
    try {
        const games = await igdb.searchGames(searchPhrase);
        const savedGames = await updateAndSaveGames(games);
        if(savedGames) return savedGames;
    } catch(error) {
        return {
            error: true,
            message: error
        }
    }
}

async function updateAndSaveGames(games) {
    const igdbIds = games.map(e => e.id);
    const bulk = [];
    let response = [];

    let matchingIds = await Game.find({'id': {$in: igdbIds}});

    if(matchingIds.length === games.length) {
        games.forEach( async (game) => {
            await createAndSaveGame(game, response, bulk);
        });
        return matchingIds;
    } else {
        response = matchingIds;
        let dbIds = matchingIds.map(e => e.id);
        let newGames = games.filter(e => !dbIds.includes(e.id));

        
        for(let i = 0; i < newGames.length; i++) {
            await createAndSaveGame(newGames[i], response, bulk);
        }

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

async function createAndSaveGame(gameObj, response, bulk) {
    if(gameObj.first_release_date) gameObj.releaseDate = moment.unix(gameObj.first_release_date).format('YYYY-MM-DD');
    if(gameObj.genres) gameObj.genres = gameObj.genres.map(genre => genre.name);
    if(gameObj.platforms) gameObj.platforms = gameObj.platforms.map(platform => platform.name);
    if(gameObj.aggregated_rating) gameObj.rating = gameObj.aggregated_rating;

    if(gameObj.cover) {
        const poster = await igdb.getPoster(gameObj.id);
        if(poster[0]) {
            
            gameObj.poster = poster[0].url;
        }
    }

    const game = Game.createGame(gameObj);
    const {_id, ...update} = game._doc;
    response.push(game._doc);

    const command = {
        updateOne: {
            "filter": {id: game.id},
            "replacement": game._doc,
            "upsert": true,
            "multi": true
        }
    }
    bulk.push(command);
}

async function getGameById(gameId) {
    const game = await Game.find({"_id": gameId })
    console.log('found game');
    console.log(game);
    return game;
}

module.exports = {
    getAndSavePopularGames,
    searchAndSaveGames,
    getGameById,
}