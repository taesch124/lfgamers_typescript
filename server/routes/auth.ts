const express = require('express');
const mongoose = require('mongoose');

const AuthController = require('./../controllers/authController.ts');

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log('Got login request for ' + req.body.user.username);
    console.log(req.body.user);
    let loginResults = await AuthController.login(req.body.user);

    return res.json({
        ...loginResults
    });
});

router.post('/register', async (req, res) => {
    console.log('Got register request for ' + req.body.user.username);
    let registerResults = await AuthController.register(req.body.user);
    
    return res.json({
        ...registerResults
    });
});

module.exports = router;