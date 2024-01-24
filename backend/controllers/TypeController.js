import asyncHandler from 'express-async-handler';
import TypeRepository from '../repositories/TypeRepository.js';
import TypeFactory from '../factories/TypeFactory.js';


const typeFactory = new TypeFactory;
const typeRepository = new TypeRepository;

export const getType = asyncHandler(async (req, res) => {
  const types = await typeRepository.findAll();

  res.status(200).json({
    message: 'Success',
    data: types,
  })
});