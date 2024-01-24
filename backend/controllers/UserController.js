import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository.js';
import UserFactory from '../factories/UserFactory.js';

const userRepository = new UserRepository;
const userFactory = new UserFactory;

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

export const registerUser = asyncHandler(async (req, res) =>{
  const {username, fullName, email, password } = req.body;

  if (!username || !fullName || !email || !password){
    res.status(400);
    throw new Error('All fields are required!');
  }
  const userExist = await userRepository.findUser({username: username}) || await userRepository.findUser({email: email});

  if(userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = userFactory.create(
    username,
    fullName,
    email,
    hashedPassword,
  );

  await userRepository.save(user);

  res.status(201).json({
    message: 'User Successfully added!',
    token: generateToken(user._id),
    data: {
      _id: user.id,
      name: user.fullName,
      email: user.email,
    }
  })


})

export const loginUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body;

  const user = await userRepository.findUser({username: username});

  if(user){
    const comparePass = await bcrypt.compare(password, user.password);
    if(comparePass){
      res.status(201).json({
        message: 'Successfully Login!',
        token: generateToken(user._id),
        data: {
          _id: user.id,
          name: user.fullName,
          email: user.email,
          
        }
      })
    }

    res.status(400);
    throw new Error('Wrong Password')
  }
})

export const getMe = asyncHandler(async (req, res) =>{
  res.status(200).json(req.user);
})