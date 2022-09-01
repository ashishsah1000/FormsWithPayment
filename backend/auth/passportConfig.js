const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { database } = require("../database/pgdatabase");
module.exports = function () {
  console.log("inside the authentication function");
  passport.use(
    new localStrategy((username, password, done) => {
      console.log("inside the local statergy", username, password);
      database.query(
        `SELECT * FROM users WHERE email='${username}'`,
        (err, user) => {
          //   users.find({ email: username }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          console.log(user);
          if (user.rowCount > 0) {
            user = user.rows[0];

            if (password == user.password) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
  passport.serializeUser((user, cb) => {
    console.log(user);
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });
};
