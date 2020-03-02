// Models
const createUser = require("../models/createUser");
const readOneUser = require("../models/readOneUser");

// Packages
const jwt = require("jsonwebtoken");

// Helpers
// const auth = require("../helpers/auth-module");
const bcrypt = require("../helpers/bcrypt-module");

exports.create_user = (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  bcrypt.newPass(password).then(pwdRes => {
    if (pwdRes.status === 200) {
      const userInfo = {
        email,
        password: pwdRes.passwordHash
      };

      createUser.data(db, userInfo)
        .then(result => {
          if (result.success) {
            console.log(result.response);
            jwt.sign(
              result.response,
              process.env.SECRET,
              { expiresIn: "1h" },
              (error, token) => {
                if (error) {
                  return res.send({
                    isLoggedIn: false,
                    error
                  })
                } else {
                  return res.send({
                    isLoggedIn: true,
                    token
                  });
                }
              }
            );
          }
        })
        .catch(error => {
          res.json(error);
        });
    }
  });
};

exports.read_login = (req, response) => {
  const db = req.app.locals.db;
  const { username, password } = req.body;

  readOneUser.data(db, username).then(user => {
    if (user != null) {
      user = user[0];
      bcrypt
        .checkPass(password, user.password)
        .then(res => {
          if (res.status === 200 && res.login) {
            delete user.password;
            user.iss = "Recurrent Bokeh";
            jwt.sign(
              user,
              process.env.SECRET,
              { expiresIn: "1h" },
              (err, token) => {
                return response.status(200).json({
                  isLoggedIn: true,
                  token
                });
              }
            );
          } else {
            return response.status(500).json({
              isLoggedIn: false
            });
          }
        })
        .catch(error => {
          response.json(error);
        });
    } else {
      return response.status(404).json({
        isLoggedIn: false
      });
    }
  })
  .catch(error => {
    response.json(error);
  });
};
