const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  }
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

module.exports = mongoose.model("User", UserSchema);
