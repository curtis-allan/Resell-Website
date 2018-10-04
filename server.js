const next = require("next");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require('http')
const { parse } = require('url')
const PORT = process.env.PORT || 5000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = server.getRequestHandler();
//const Schema = mongoose.Schema;

///const db = mongoose.connection;

app.prepare().then(() => {

  app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: "Post created...",
          authData
        });
      }
    });
  });

  app.get('/api/user', verifyToken, (req, res, next) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.sendStatus(200)
        res.redirect('/index.js')
      }
  })

  app.post("/api/login", (req, res) => {
    // 1- map submitted user data to an object
    // 2- connect to the mongoDB database of users
    // 3- check if the user is already in the data
    // 4- if no user found, no user found msg
    // 5- if user found,
    const user = req.body;

    jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
      const finalToken = res.json({
        token
      });
      res.sendStatus(200);
      res.redirect('/users');
    });
  });

  // FORMAT OF TOKEN
  //Authorization: Bearer <access_token>

  // Verify Token
  function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

  app.listen(PORT, err => {
    if (err) console.error(err);
    console.log(`> Ready on port: ${PORT}`);
  });
});
