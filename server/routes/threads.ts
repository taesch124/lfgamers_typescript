const express = require('express');

const router = express.Router();
const commentController = require('./../controllers/commentController.ts');

router.get('/game/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    if(!gameId) {
        res.json({
            error: true,
            message: 'ERROR: No game ID provided.',
        });
    }

    try {
        const threads = await commentController.getThreadsByGame(gameId);
        res.json(threads);
    } catch(error) {
        res.json({
            error: true,
            message: error,
        });
    }
});

router.get('/comments/:threadId', async (req, res) => {
    const threadId = req.params.threadId;
    if(!threadId) {
        res.json({
            error: true,
            message: 'ERROR: No thread ID provided.',
        });
    }

    try {
        const comments = await commentController.getCommentsByThread(threadId);
        res.json(comments);
    } catch(error) {
        res.json({
            error: true,
            message: error,
        });
    }
});

router.post('/create', async (req, res) => {
    try {
        const result = await commentController.createThread(req.body);
        res.json(result);
    } catch(error) {
        res.json({
            error: true,
            message: error,
        });
    }
});

router.post('/:parentId/comments/create', async (req, res) => {
    const parentId = req.params.parentId;
    const data = req.body;
    data.parentId = parentId;
    try {
        const results = await commentController.createComment(data);
        res.json(results);
    } catch(error) {
        res.json({
            error: true,
            message: error,
        })
    }
});

module.exports = router;