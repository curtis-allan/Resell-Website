const next = require("next");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const server = next({ dev });
const handle = server.getRequestHandler();

server.prepare().then(() => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  require("./routes")(app);

  mongoose.connect(
    "mongodb://Curtis:Twinwaters9@ds121673.mlab.com:21673/resell-website",
    { useNewUrlParser: true }
  );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Connected to db");
  });

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, err => {
    if (err) console.error(err);
    console.log(`> Ready on port: ${PORT}`);
  });
});
