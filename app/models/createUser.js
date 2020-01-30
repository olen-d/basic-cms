const assert = require("assert");

const data = (db, userInfo) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const { firstName, lastName, email, userName, password } = userInfo;
    try {
      collection.insertOne(
        {
          firstName,
          lastName,
          email,
          userName,
          password,
          editor: false,
          administrator: false
        },
        (error, response) => {
          if (error) {
            resolve(error);
          } else {
            resolve(response);
          }
        }
      );
    } catch (err) {
      reject({
        status: 500,
        error: "Internal server error. Failed to create new user."
      });
    }
  });
};

module.exports = { data };
