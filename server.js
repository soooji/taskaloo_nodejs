require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

var JWTstrategy = require("passport-jwt").Strategy,
ExtractJWT = require("passport-jwt").ExtractJwt;

var utils = require("./utils/main.utils");
var cors = require("cors");

const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");
const projectRoutes = require("./src/routes/project.routes");
const taskRoutes = require("./src/routes/task.routes");
const tagRoutes = require("./src/routes/tag.routes");

//modules needed for auth
const User = require("./src/models/user.model");

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// configure passport.js to use the local strategy

var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.issuer = "5.253.24.115";
opts.audience = "5.253.24.115";

// passport.use(
//   "login",
//   new JwtStrategy(
//     opts,
//     (username, password, done) => {
//       User.findByUsername(username, function (err, user) {
//         if (!err && user[0]) {
//           const hashedPass = utils.saltHash(password, user[0].salt);
//           if (
//             username === user[0].username &&
//             hashedPass.passwordHash === user[0].password
//           ) {
//             let userToSend = user[0];
//             delete userToSend.password;
//             delete userToSend.salt;
//             return done(null, user[0]);
//           } else {
//             return done(Error("Username or password is incorrect!"), null);
//           }
//         } else {
//           return done(err, null);
//         }
//       });
//     }
//     //  function(jwt_payload, done) {
//     // User.findOne({id: jwt_payload.sub}, function(err, user) {
//     //     if (err) {
//     //         return done(err, false);
//     //     }
//     //     if (user) {
//     //         return done(null, user);
//     //     } else {
//     //         return done(null, false);
//     //         // or you could create a new account
//     //     }
//     // });}
//   )
// );

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    (username, password, done) => {
      User.findByUsername(username, function (err, user) {
        if (!err && user[0]) {
          const hashedPass = utils.saltHash(password, user[0].salt);
          if (
            username === user[0].username &&
            hashedPass.passwordHash === user[0].password
          ) {
            let userToSend = user[0];
            delete userToSend.password;
            delete userToSend.salt;
            return done(null, user[0]);
          } else {
            return done(Error("Username or password is incorrect!"), null);
          }
        } else {
          return done(err, null);
        }
      });
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

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// define a root route
app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(req.sessionID);
});

app.get("/login", (req, res) => {
  res.send("Login First!");
  console.log(req.sessionID);
});

// Require users routes

// using as middleware

const BASE_API = "/api/v1/";

app.use(BASE_API + "user", userRoutes);
app.use(BASE_API + "auth", authRoutes);
app.use(BASE_API + "project", projectRoutes);
app.use(BASE_API + "task", taskRoutes);
app.use(BASE_API + "tag", tagRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
