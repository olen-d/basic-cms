require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT || 5010;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database access
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// CORS

const cors = require("cors");
if (process.env.ENVIRONMENT === "dev") {
  app.use(cors());
} else {
  const whitelist = [
    "https://recurrentbokeh.com",
    "https://www.recurrentbokeh.com"
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      whitelist.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error("Not allowed by CORS"))
    }
  }
  app.use(cors(corsOptions));
}

// Routes
// app.get("/", (req, res) => res.send("Word up, homechickens!"));
app.use("/basic-cms/api", require("./app/routes/usersRoutes"));
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
