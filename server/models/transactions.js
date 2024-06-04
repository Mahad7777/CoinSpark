const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: {
        type: Date, 
        required: true,
        unique: true 
    },
    count: {
        type: Number,
        default: 0 
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;