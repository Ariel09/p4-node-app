import User from "../models/UserModel.js";

class UserFactory{
  create(username, fullName, email, password) {
    return new User({username, fullName, email, password});
  }
};

export default UserFactory;