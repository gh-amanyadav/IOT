import express from 'express';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from '../Controllers/Transaction.controllers.js';

const router = express.Router();

// Route to create a new Transaction
router.get('/', getTransactions);

// Route to get all Transaction
router.get('/Creport', createTransaction);

// Route to update a Transaction by ID
router.put('/:id', updateTransaction);

// Route to delete a Transaction by ID
router.delete('/:id', deleteTransaction);

export default router;