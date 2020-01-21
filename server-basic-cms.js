const express = require("express");

const app = express();
const port = 5010;

app.get("/", (req, res) => res.send("Word up, homechickens!"));

app.listen(port, () => console.log(`Basic CMS API listening on port ${port}`));
