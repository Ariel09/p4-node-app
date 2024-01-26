import TransactionFactory from "../factories/TransactionFactory.js";
import TransactionRepository from "../repositories/TransactionRepository.js";
import asyncHandler from "express-async-handler";

const transactionFactory = new TransactionFactory;
const transactionRepository = new TransactionRepository;

export const addTransaction = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const {type, category, amount} = req.body;


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
});

export const getAllTransaction = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const typeId = req.params.typeId;

  if(typeId){
    const transactions = await transactionRepository.findByType(user, typeId);

    res.status(200).send({
      message: 'Success!',
      data: transactions,
    })
    return
  }

  const transactions = await transactionRepository.findAll(user);

  res.status(200).json({
    message: 'Success!',
    data: transactions,
  })
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  const id = req.params.typeId;
  
  transactionRepository.delete(id);

  const statusCode = res.statusCode;

  if(statusCode === 200){
    res.json({
      message: 'Successfully Deleted!'
    })
  }
});

export const viewTransaction = asyncHandler(async (req, res) => {
  const id = req.params.transactionId;

  const transaction = await transactionRepository.findById(id);

  res.status(200).json({
    message: 'Success!',
    data: transaction
  })
});

export const updateTransaction = asyncHandler(async (req, res) => {
  const id = req.params.transactionId;

  const transaction = await transactionRepository.update(id, req.body);

  res.status(200).json({
    message: 'Success!',
    data: transaction
  })
})