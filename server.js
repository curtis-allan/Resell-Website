const next = require("next");
const express = require("express");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 5000;
// const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });

server.prepare().then(() => {
  const app = express();

  app.get("/api", (req, res) => {
    res.json({
      message: "Hello API"
    });
  });

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

  app.post("/api/login", (req, res) => {
    const user = {
      id: 1,
      username: "brad",
      email: "brad@gmail.com"
    };

    jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
      res.json({
        token
      });
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

  app.listen(PORT, () => {
    console.log(`> Ready on port: ${PORT}`);
  });
});
