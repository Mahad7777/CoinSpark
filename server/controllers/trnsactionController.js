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
    try{
    const { date } = req.body;
    const today = new Date(date);
    today.setHours(0, 0, 0, 0);

    const countbydate = await Transaction.findOne({ date: today });
    res.status(200).json({countbydate})
    }catch(err){
        res.status(400).json({msg:"Error fetching transaction"})
    }
}


    const updateTransactionCount = async (req, res) => {
            try {
            const { date } = req.body; // Assuming date is sent in the request body
        
            const today = new Date(date);
            today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 (start of the day)
        
            const existingTransaction = await Transaction.findOne({ date: today });
        
            if (existingTransaction) {
                // Transaction exists, update count and return success
                existingTransaction.count += 1;
                await existingTransaction.save();
                res.status(200).json({ msg: "Transaction count incremented" });
                return; // Exit the function after successful update
            }
        
            // No existing transaction, create a new one
            const newTransaction = new Transaction({ date: today, count: 1 });
            const createdTransaction = await newTransaction.save();
        
            res.status(201).json({ transaction: createdTransaction });
            } catch (error) {
            res.status(500).json({ msg: error.message });
            }
        };
        const writeTransaction = async (req, res) => {
            try {
              // Call updateTransactionCount directly (avoiding unnecessary nesting)
              await updateTransactionCount(req, res);
            } catch (error) {
              console.error('Error in writeTransaction:', error);
              res.status(500).json({ msg: 'An error occurred while processing your donation' });
            }
          };



module.exports = {
    getAllTransactions,
    getTransactionsbyDate,
    writeTransaction,
    updateTransactionCount
}