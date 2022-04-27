import * as express from 'express';
// const express = require('express');
const passport = require('passport');

const AuthController = require('./../controllers/authController.ts');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Current user: ' + req.user);
    res.json(req.user);
})

router.post('/login', async (req, res, next) => {
    console.log(req.body.user);
    //let loginResults = await AuthController.login(req.body.user);
    passport.authenticate('local', (err, response, info) => {
        if(err) return next(err);

        if(info) return res.json(info);

        req.logIn(response, (loginError) => {
            if(loginError) return next(loginError);
            console.log('Passport logged in');
            console.log(response);
            return res.json(response);
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    console.log('Logging out ' + req.user);
    req.logout();
    res.json({error: false, message: 'Logged out.'});
});

router.post('/register', async (req, res) => {
    console.log('Got register request for ' + req.body.user.username);
    let registerResults = await AuthController.register(req.body.user);
    
    return res.json({
        ...registerResults
    });
});

module.exports = router;