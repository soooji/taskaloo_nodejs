require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connectEnsureLogin = require("connect-ensure-login");
// const planController = require('./src/controllers/plan.controller');

//modules needed for auth
var utils = require("./utils/main.utils");
// const User = require("./src/models/user.model");

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// configure passport.js to use the local strategy
passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      // User.findByUsername(username, function (err, user) {
      //   if (!err && user[0]) {
      //     const hashedPass = utils.saltHash(password, user[0].salt);
      //     if (
      //       username === user[0].username &&
      //       hashedPass.passwordHash === user[0].password
      //     ) {
      //       let userToSend = user[0];
      //       delete userToSend.password;
      //       delete userToSend.salt;
      //       return done(null, user[0]);
      //     } else {
      //       return done(Error("Username or password is incorrect!"), null);
      //     }
      //   } else {
      return done(err, null);
      //   }
      // });
    }
  )
);

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  if (!user) {
    return done(Error("Username or password is incorrect!"), null);
  }
  console.log("\nNew Successfull login:");
  console.log(user);
  console.log("\n");
  done(null, user);
});
passport.deserializeUser((user, done) => {
  if (!user) {
    return done(Error("Username or password is incorrect!"), null);
  }
  console.log("\nBellow User requested something:");
  console.log(user);
  console.log("\n");
  done(null, user);
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(
  session({
    genid: (req) => {
      console.log(req.sessionID);
      return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// define a root route
app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(req.sessionID);
});

// Require users routes
// const userRoutes = require("./src/routes/user.routes");

// using as middleware
// app.use("/api/v1/user", userRoutes);
// app.get('/api/v1/hasplan',connectEnsureLogin.ensureLoggedIn(),planController.hasPlan);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
