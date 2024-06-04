const express = require('express')
const { getAllTransactions, getTransactionsbyDate, writeTransaction, updateTransactionCount } = require('../controllers/trnsactionController')
const transactions = express.Router()

transactions.post('/',writeTransaction)
transactions.patch('/',updateTransactionCount)
transactions.get('/',getAllTransactions)
transactions.post('/bydate',getTransactionsbyDate)

module.exports = transactions