import express from 'express';
import { getProfiles, createProfile, updateProfile, deleteProfile } from '../Controllers/Profile.controllers.js';

const router = express.Router();

// Route to create a new Profile
router.get('/', getProfiles);

// Route to get all Profile
router.get('/Creport', createProfile);

// Route to update a Profile by ID
router.put('/:id', updateProfile);

// Route to delete a Profile by ID
router.delete('/:id', deleteProfile);

export default router;