const UserSession = require("../../models/UserSession");
const User = require("../../models/User");

module.exports = app => {
  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    let { email } = body;
    const { password } = body;

    email = email.toLowerCase();
    email = email.trim();

    User.find(
      {
        email
      },
      (err, users) => {
        if (err) {
          console.log("err 2: ", err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        if (users.length !== 1) {
          return res.send({
            success: false,
            message: "Error: Invalid Email/Password"
          });
        }

        const user = users[0];

        if (!user.validPassword(password)) {
          res.send({
            success: false,
            message: "Error: Invalid Email/Password"
          });
        }

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: "Error: Server Error"
            });
          }

          return res.send({
            success: true,
            Message: "Valid sign in",
            token: doc._id
          });
        });
      }
    );
  });

  app.get("/api/account/logout", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: {
          isDeleted: true
        }
      },
      null,
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        return res.send({
          success: true,
          message: "Good"
        });
      }
    );
  });

  app.get("/api/account/verify", (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }),
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          // DO ACTION HERE
          return res.send({
            success: true,
            message: "Good"
          });
        }
      };
  });
};
