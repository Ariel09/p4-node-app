class TransactionRepository{
  async save(transaction){
    await transaction.save();

    return transaction;
  }

  
}

export default TransactionRepository;