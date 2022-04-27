import * as express from 'express';
// const express = require('express');
const igdb = require('./../api/igdb.ts');
const gamesController = require('./../controllers/gamesController.ts');

const router = express.Router();

router.get('/browse', async (req, res) => {
    try {
        let games = await gamesController.getAndSavePopularGames();
        return res.json(games);
    }
    catch(error) {
        console.error(error);
        return res.json({
            error: true,
            message: error
        });
    }
    
});

router.get('/search/:search', async (req, res) => {
    const search = req.params.search;
    console.log(search);
    if(search) {
        try {
            const games = await gamesController.searchAndSaveGames(search);
            return res.json(games);
        } catch (error) {
            console.error(error);
            return  res.json({
                error: true,
                message: error
            });
        }
    } else {
        return res.json({
            error: true,
            message: 'Error: No search phrase entered'
        });
    }

});

router.get('/games/game/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    if(gameId) {
        const game = await gamesController.getGameById(gameId);
        return game;
    } else {
        return res.json({
            error: true,
            message: 'Error: No game ID provided',
        })
    }
})

module.exports = router;