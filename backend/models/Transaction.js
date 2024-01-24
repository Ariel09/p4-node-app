import { Schema, Types, model } from "mongoose";

const transactionSchema = new Schema({   
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: Types.ObjectId,
    ref: 'Type',
    required: [true, 'Field is required!']
  },
  category: {
    type: Types.ObjectId,
    ref: 'Category',
    required: [true, 'Field is required!']
  },
  amount: {
    type: Number,
    required: [true, 'Field is required!']
  }
},{
  timestamps: true
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;