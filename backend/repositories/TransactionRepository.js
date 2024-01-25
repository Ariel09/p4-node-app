import Transaction from "../models/Transaction.js";

class TransactionRepository{
  async save(transaction){
    await transaction.save();

    return transaction;
  }

  async findAll(user){
    const transactions = await Transaction.find({user})
      .populate('type')
      .populate('category')
      .exec();

    return transactions;
  }

  async findByType(user, typeId){
    const transactions = await Transaction.find({user, type: typeId})
      .populate('type')
      .populate('category')
      .exec();

    return transactions;
  }

  delete(id){
    Transaction.findByIdAndDelete(id);
  }
  
}

export default TransactionRepository;