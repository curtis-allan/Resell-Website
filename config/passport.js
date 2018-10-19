const User = require("../lib/models/User");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    "local-login",
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      });
    })
  );

  passport.use(
    "local-signup",
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (user) {
          return done(null, false, {
            message: "Account with that username already exists."
          });
        }

        const newUser = new User();

        newUser.username = username;
        newUser.password = newUser.hashPassword(password);

        newUser.save((err, user) => {
          if (err) return done(err);
          return done(null, newUser);
        });
      });
    })
  );
};
