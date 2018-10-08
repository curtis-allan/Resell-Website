const UserSession = require("../../models/UserSession");

module.exports = app => {
  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    let { email } = body;
    const { password } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find(
      {
        email
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Error: Account already exists."
          });
        }

        const newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server Error."
            });
          }
          return res.send({
            success: true,
            message: "Signed up successfully"
          });
        });
      }
    );
  });
};
