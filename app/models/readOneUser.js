const assert = require("assert");

const data = (db, username) => {
  return new Promise((resolve, reject) => {
    try {
      const collection = db.collection("users");

      collection.find({ username: username }).limit(1).toArray((err, data) => {
        err ? resolve(err) : resolve(data);
      });
    } catch (err) {
      reject({
        status: 500,
        login: false,
        error: "Internal server error. Failed to get user data."
      });
    }
  });
};

module.exports = { data };
