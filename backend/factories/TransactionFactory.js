import Transaction from "../models/Transaction.js";

class TransactionFactory{
  create(user, type, category, amount){
    return new Transaction({user, type, category, amount});
  }
};

export default TransactionFactory;