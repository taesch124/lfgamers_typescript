const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const authRouter = require('./routes/auth.ts');
const gamesRouter = require('./routes/games.ts');

const app = express();
const PORT = process.env.PORT || 8080;
require('./config/passport.ts')(passport);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/LFGamers_Typescript';

mongoose.connect(MONGODB_URI, {newUrlParser: true});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/games', gamesRouter);

//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '..', 'build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    });
  } else {
      app.use(express.static(path.resolve(__dirname, '..', 'public')));
      
      app.get('*', function (request, response){
          response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
      });
  }
  
  app.listen(PORT, () => {
      console.log('Server listening on: http://localhost:' + PORT);
  });