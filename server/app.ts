const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

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