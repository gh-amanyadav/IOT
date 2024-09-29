import express from 'express';
import { getCdevicess, createCdevices, updateCdevices, deleteCdevices } from '../Controllers/Cdevices.controllers.js';

const router = express.Router();

// Route to create a new Cdevices
router.get('/', getCdevicess);

// Route to get all Cdevices
router.get('/Creport', createCdevices);

// Route to update a Cdevices by ID
router.put('/:id', updateCdevices);

// Route to delete a Cdevices by ID
router.delete('/:id', deleteCdevices);

export default router;