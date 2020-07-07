const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({  
    name: String,
    email: String,
    password: String
});

UserSchema.statics.getUserList = function () {
  return this.find({});
}

UserSchema.statics.getUser = function (userId) {
  return this.findOne({ _id: userId });
}

UserSchema.statics.createUser = function (param) {
  const { name, email, password } = param;
  return this.create({ name, email, password });
}

UserSchema.statics.updateUser = function (param) {
  const { userId, name, email, password } = param;
  return this.updateOne(
      { _id: userId },
      { $set: { name, email, password } }, 
      { new: true }
  );
}

UserSchema.statics.deleteUser = function (userId) {
  return this.deleteOne({ _id: userId });
}

module.exports = mongoose.model('users', UserSchema);
