import express from 'express';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../Controllers/Customer.controllers.js';

const router = express.Router();

// Route to create a new Customer
router.get('/', getCustomers);

// Route to get all Customer
router.get('/Creport', createCustomer);

// Route to update a Customer by ID
router.put('/:id', updateCustomer);

// Route to delete a Customer by ID
router.delete('/:id', deleteCustomer);

export default router;