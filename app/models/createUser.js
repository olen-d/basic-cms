const assert = require("assert");

const data = (db, userInfo) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const { email, password } = userInfo;
    try {
      collection.insertOne(
        {
          email,
          password,
          editor: false,
          administrator: false
        },
        (error, result) => {
          if (error) {
            resolve({
              success: false,
              errors: [
                {
                  status: 601,
                  message: "Database error. Failed to create new user"
                }
              ],
              error});
          } else {
            const { ops: [{ email, editor, administrator, _id: userId}] } = result;
            const response = {
              userId,
              email,
              editor,
              administrator
            }
            resolve({
              success: true,
              response
            });
          }
        }
      );
    } catch (error) {
      reject({
        success: false,
        errors: [
          {
            status: 600,
            message: "Undetermined error. Failed to create new user."
          }
        ],
        error
      });
    }
  });
};

module.exports = { data };
