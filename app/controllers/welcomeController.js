// Models
const readWelcome = require("../models/readWelcome");
// const updateHeadline = require("../models/updateHeadline");

exports.read_welcome = (req, res) => {
  // console.log("REQ",req);
  const db = req.app.locals.db;
// console.log("DB\n",db);
  readWelcome
    .data(db)
    .then(resolve => {
      const welcomeObj = {
        welcome: resolve
      };
      res.send(welcomeObj);
    })
    .catch(err => {
      // console.log("welcomeController.js - Error:\n", err);
      res.json(err);
    });
};
