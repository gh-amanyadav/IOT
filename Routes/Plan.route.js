import express from 'express';
import { getPlans, createPlan, updatePlan, deletePlan } from '../Controllers/Plan.controllers.js';

const router = express.Router();

// Route to create a new Plan
router.get('/', getPlans);

// Route to get all Plan
router.get('/Creport', createPlan);

// Route to update a Plan by ID
router.put('/:id', updatePlan);

// Route to delete a Plan by ID
router.delete('/:id', deletePlan);

export default router;