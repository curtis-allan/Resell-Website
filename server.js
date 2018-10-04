const next = require("next");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
// const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });
const Schema = mongoose.Schema;

const db = mongoose.connection;

server.prepare().then(() => {
  const app = express();

  app.use(cors());

  mongoose.connect(
    "mongodb://Curtis:Twinwaters9@ds121673.mlab.com:21673/resell-website",
    { useNewUrlParser: true }
  );

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    const userSchema = new Schema({
      name: String
    });

    const User = mongoose.model("User", userSchema);

    manlyMan = new User({ name: "kingKong" });

    manlyMan.save((err, User) => {
      if (err) return console.err(err);
    });
  });

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

    jwt.sign({ user }, "secretkey", (err, token) => {
      const finalToken = res.json({
        token
      });
      res.send(finalToken);
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
