const LocalStrategy = require('passport-local').Strategy;

// Load User model
const AuthController = require('../controllers/authController.ts');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      // Match user
      let user = {username: username, password: password};
      let loggedIn = await AuthController.login(user);
      console.log(loggedIn);
      if(loggedIn.error) {
          return done(null, false, loggedIn.results);
      } else {
          return done(null, loggedIn.results);
      }
    //   let loggedIn = AuthController.login(user, (results) => {
    //     if(results.success) {
    //       return done(null, results);
    //     } else {
    //       return done(null, false, results);
    //     }
    //   })
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
