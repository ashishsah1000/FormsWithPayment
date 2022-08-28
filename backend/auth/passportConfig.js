const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { database } = require("../database/pgdatabase");
module.exports = function () {
  console.log("inside the authentication function");
  passport.use(
    new localStrategy(
      {
        usernameField: "username",
      },
      (username, password, done) => {
        console.log("inside the local statergy", username, password);
        database.query(
          `SELECT * FROM users WHERE username='${username}'`,
          (err, user) => {
            //   users.find({ email: username }, (err, user) => {
            if (err) throw err;
            if (!user) return done(null, false);
            console.log(user);
            user = user[0];

            bcryptjs.compare(password, user.password, (err, result) => {
              console.log("result=", result);
              if (err) throw err;
              if (result === true) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            });
          }
        );
      }
    )
  );
  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  passport.deserializeUser((id, cb) => {
    users.find({ _id: id }, (err, user) => {
      if (err) {
        cb(null, false, { error: err });
      } else {
        cb(null, user);
      }
    });
  });
};
