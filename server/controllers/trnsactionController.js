const Transaction = require('../models/transactions')
const getAllTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find(); // Find all transactions
      res.status(200).json({ transactions });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

const getTransactionsbyDate = async (req,res)=>{
    
}

    const updateTransactionCount = async (req, res) => {
        try {
        const { date } = req.body; // Assuming date is sent in the request body
    
        const today = new Date(date);
        today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 (start of the day)
    
        const existingTransaction = await Transaction.findOne({ date: today });
    
        if (existingTransaction) {
            existingTransaction.count += 1;
            await existingTransaction.save();
            res.status(200).json({ msg: "Transaction count incremented" });
        } else {
            // Handle the case where no transaction exists for the date (optional)
            res.status(404).json({ msg: "Transaction not found for the date" });
        }
        } catch (error) {
        res.status(500).json({ msg: error.message });
        }
    };
    const writeTransaction = async (req, res) => {
        try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 (start of the day)
    
        // const { date } = req.body; // Assuming date is sent in the request body
    
        // Check if a document already exists for the date
        const existingTransaction = await Transaction.findOne({ date: today });
    
        if (existingTransaction) {
            // Transaction already exists, don't create a new one
            res.status(409).json({ msg: "Transaction already exists for this date" });
            return; // Exit the function if data already exists
        }
    
        // Create a new transaction for today with count 1
        const newTransaction = new Transaction({ date: today, count: 1 });
        const createdTransaction = await newTransaction.save();
    
        res.status(201).json({ transaction: createdTransaction });
        } catch (error) {
        res.status(500).json({ msg: error.message });
        }
    };



module.exports = {
    getAllTransactions,
    getTransactionsbyDate,
    writeTransaction,
    updateTransactionCount
}