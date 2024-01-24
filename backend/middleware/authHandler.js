import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository;
export const protect = asyncHandler(async (req, res, next) =>{
  let token;

  const header = req.headers.authorization;
  if(header){
    const bearer = header.startsWith('Bearer');
    if(bearer){
      try {
        token = header.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userRepository.getById(decoded.id);
        
        next()
      } catch (error) {
        res.status(401)
        throw new Error('Not Authorized!')
      }
    }
  }
  
  if(!token){
    res.status(401);
    throw new Error('Not authorized, No token!');
  }
})