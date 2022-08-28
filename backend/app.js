var createError = require("http-errors");
var cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var passport = require("passport");
const passportLocal = require("passport-local").Strategy;
var session = require("express-session");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var formsRouter = require("./routes/forms");

var pgSession = require("connect-pg-simple")(session);
var { database, pgPool } = require("./database/pgdatabase");
// var pgPool =

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  })
);

app.use(
  session({
    store: new pgSession({
      pool: pgPool, // Connection pool
      createTableIfMissing: true,
      tableName: "session",
    }),
    secret: "connect2167", ////////PROVIDE A SECRET/////USE ENVIRONMENT VARIABLES, UNLESS THIS IS FOR HOMEWORK OR SOMETHING SIMILAR OF NO IMPORTANCE
    resave: true,
    cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));
require("./auth/passportConfig")(passport);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/forms", formsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
