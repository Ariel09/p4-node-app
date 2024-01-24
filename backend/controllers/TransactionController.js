import TransactionFactory from "../factories/TransactionFactory.js";
import TransactionRepository from "../repositories/TransactionRepository.js";
import asyncHandler from "express-async-handler";

const transactionFactory = new TransactionFactory;
const transactionRepository = new TransactionRepository;

export const addTransaction = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const {type, category, amount} = req.body;

  if(!type || !category || !amount){
    res.status(400);
    throw new Error('All fields are required!')
  }

  const transaction = transactionFactory.create(user, type, category, amount);

  await transactionRepository.save(transaction);

  res.status(201).json({
    message: 'Transaction Added Successfully!',
    data: {
      id: transaction._id,
      user: transaction.user,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount
    }
  })
})