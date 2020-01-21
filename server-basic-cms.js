require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT || 5010;

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Routes
// app.get("/", (req, res) => res.send("Word up, homechickens!"));
app.use("/basic-cms/api", require("./app/routes/welcomeRoutes"));

// Database
const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB_NAME;
MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
.then(client => {
  const db = client.db(dbName);
  app.locals.db = db;
  app.listen(port, () => console.log(`Basic CMS API listening on port ${port}`));
});

