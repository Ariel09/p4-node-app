import Transaction from "../models/Transaction.js";

class TransactionRepository{
  async save(transaction){
    await transaction.save();

    return transaction;
  }

  async delete(id){
    await Transaction.findByIdAndDelete(id);
  }

  async update(id, data){
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, data);

    return updatedTransaction;
  }

  async findById(id){
    const transaction = await Transaction.findById(id);

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


  
}

export default TransactionRepository;