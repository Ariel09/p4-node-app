import User from "../models/UserModel.js";

class UserRepository{
  async save(user){
    await user.save();

    return user;
  }

  async update(id){

  }

  async findAll(){
    const users = await User.find();

    return users;
  }

  async findUser(data){
    const findData = await User.findOne(data);

    return findData;
  }

  async getById(id){
    const response = await User.findById(id).select('-password');
    
    return response;
  }
}

export default UserRepository;