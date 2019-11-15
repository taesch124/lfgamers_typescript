const express = require('express');
const igdb = require('./../api/igdb.ts');

const router = express.Router();

router.get('/browse', async (req, res) => {
    try {
        console.log('getting games');
        let games = await igdb.searchPopularGames();
        console.log('Games at route.')
        console.log(games);
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