// Models
const createUser = require("../models/createUser");

// Packages
const jwt = require("jsonwebtoken");

// Helpers
// const auth = require("../helpers/auth-module");
const bcrypt = require("../helpers/bcrypt-module");

exports.create_user = (req, res) => {
  const db = req.app.locals.db;
  const { firstName, lastName, email, username, password } = req.body;

  bcrypt.newPass(password).then(pwdRes => {
    if (pwdRes.status === 200) {
      const userInfo = {
        firstName,
        lastName,
        email,
        username,
        password: pwdRes.passwordHash
      };

      createUser
        .data(db, userInfo)
        .then(resolve => {
          delete resolve.password;
          jwt.sign(
            resolve,
            process.env.secret,
            { expiresIn: "1h" },
            (err, token) => {
              return res.send({
                isLoggedIn: true,
                token
              });
            }
          );
        })
        .catch(err => {
          res.json(err);
        });
    }
  });
};
