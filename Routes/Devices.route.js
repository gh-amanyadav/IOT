import express from 'express';
import { getDevicess, createDevices, updateDevices, deleteDevices } from '../Controllers/Devices.controllers.js';

const router = express.Router();

// Route to create a new Devices
router.get('/', getDevicess);

// Route to get all Devices
router.get('/Creport', createDevices);

// Route to update a Devices by ID
router.put('/:id', updateDevices);

// Route to delete a Devices by ID
router.delete('/:id', deleteDevices);

export default router;