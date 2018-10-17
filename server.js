const next = require("next");
const express = require("express");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const api = require("./lib/api");
const MONGO_URI =
  "mongodb://Curtis:Twinwaters9@ds121673.mlab.com:21673/resell-website";

const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });
const handle = server.getRequestHandler();

server.prepare().then(() => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.on("open", function() {
    console.log("Connected to MongoDB");
  });

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use("/api", api);

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, () => {
    console.log(`> Ready on port: ${PORT}`);
  });
});
