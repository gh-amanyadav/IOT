import express from 'express';
import { getLdevicess, createLdevices, updateLdevices, deleteLdevices } from '../Controllers/Ldevices.controllers.js';

const router = express.Router();

// Route to create a new Ldevices
router.get('/', getLdevicess);

// Route to get all Ldevices
router.get('/Lreport', createLdevices);

// Route to update a Ldevices by ID
router.put('/:id', updateLdevices);

// Route to delete a Ldevices by ID
router.delete('/:id', deleteLdevices);

export default router;