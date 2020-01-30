const jwt = require("jsonwebtoken");

const checkAuth = headers => {
  // Check the user token
  return new Promise((resolve, reject) => {
    try {
      let token = headers["x-access-token"] || headers["authorization"];

      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }

      if (token) {
        jwt.verify(token, process.env.secret, (err, decoded) => {
          if (err) {
            resolve({
              auth: false,
              message: "Internal server error. Token could not be verified.",
              error: err
            });
          } else {
            resolve({
              auth: true,
              editor: decoded.editor,
              administrator: decoded.administrator
            });
          }
        });
      } else {
        resolve({
          auth: false,
          message: "Internal server error. No token was provided.",
          error: true
        });
      }
    } catch (err) {
      reject({
        auth: false,
        message: "Internal server error. Failed to authenticate request",
        error: err
      });
    }
  });
};

module.exports = {
  checkAuth: checkAuth
};
