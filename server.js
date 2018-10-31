require("dotenv").config();

const next = require("next");
const express = require("express");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const api = require("./lib/api");
const session = require("express-session");
const nextAuth = require("next-auth");
const nextAuthConfig = require("./config/next-auth.config");
// const passport = require("passport");
// const flash = require("connect-flash");
// const cookieParser = require("cookie-parser");
//const csurf = require("csurf");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://Curtis:Twinwaters9@ds121673.mlab.com:21673/resell-website";

const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });
const handle = server.getRequestHandler();

server
  .prepare()
  .then(() => {
    return nextAuthConfig();
  })
  .then(nextAuthOptions => {
    return nextAuth(server, nextAuthOptions);
  })
  .then(res => {
    console.log(`Ready on http://localhost:${PORT}`);
  })
  .catch(err => {
    console.log(`An error occured, unable to start the server`);
    console.log(err);
  });

// Serving authentication endpoints
// app.post(
//   "/login",
//   passport.authenticate("local-login", {
//     failureRedirect: "/login",
//     successRedirect: `/users/${req.user.username}`,
//     failureFlash: true
//   }),
//   (req, res) => {
//     console.log(req.flash("error"));
//     server.render(req, res, "/users/" + req.user.username);
//   }
// );

// app.post(
//   "/register",
//   passport.authenticate("local-signup", {
//     failureRedirect: "/signup",
//     failureFlash: true
//   }),
//   (req, res) => {
//     req.login(req.user, function(err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect("/users/" + req.user.username);
//     });
//   }
// );

// app.get("/users/:id ", (req, res) => {
//   server.render(req, res, `users?name=${req.params.id}`);
// });

// // Auth methods
// function requireLogin(req, res, next) {
//   if (!req.user) return res.redirect("/");
//   next();
// }

// Initializing server on chosen port
