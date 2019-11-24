const express = require('express');
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
        return {
            error: true,
            message: error
        }
    }
    
});

module.exports = router;