// Models
const readWelcome = require("../models/readWelcome");
// const updateHeadline = require("../models/updateHeadline");

exports.read_welcome = (req, res) => {
  const db = req.app.locals.db;
  readWelcome
    .data(db)
    .then(resolve => {
      const welcomeObj = {
        welcome: resolve
      };
      res.send(welcomeObj);
    })
    .catch(err => {
      res.json(err);
    });
};
