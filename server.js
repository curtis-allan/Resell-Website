const next = require("next");
const express = require("express");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const api = require("./lib/api");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
//const csurf = require("csurf");

const MONGO_URI =
  "mongodb://Curtis:Twinwaters9@ds121673.mlab.com:21673/resell-website";

const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });
const handle = server.getRequestHandler();

server.prepare().then(() => {
  const app = express();

  // Initializing middleware -->
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(cookieParser());
  app.use(session({ secret: "doggos", resave: true, saveUninitialized: true }));
  app.use(flash());
  //app.use(csurf());
  app.use(passport.initialize());
  app.use(passport.session());

  // Import config files -->
  require("./config/passport")(passport);

  // Connecting to the database -->
  mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.on("open", function() {
    console.log("Connected to MongoDB");
  });

  // Serving nextjs routes/ external api
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use("/api", api);

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  // Serving authentication endpoints
  app.post(
    "/login",
    passport.authenticate("local-login", {
      failureRedirect: "/login",
      successRedirect: `/users/${req.user.username}`,
      failureFlash: true
    }),
    (req, res) => {
      console.log(req.flash("error"));
      server.render(req, res, "/users/" + req.user.username);
    }
  );

  app.post(
    "/register",
    passport.authenticate("local-signup", {
      failureRedirect: "/signup",
      failureFlash: true
    }),
    (req, res) => {
      req.login(req.user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/users/" + req.user.username);
      });
    }
  );

  app.get("/users/:id ", (req, res) => {
    server.render(req, res, `users?name=${req.params.id}`);
  });

  // Auth methods
  function requireLogin(req, res, next) {
    if (!req.user) return res.redirect("/");
    next();
  }

  // Initializing server on chosen port
  app.listen(PORT, () => {
    console.log(`> Ready on port: ${PORT}`);
  });
});
