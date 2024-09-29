import Plan from '../Models/Plan.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new Plan
export const createPlan = async (req, res, next) => {
    const { data } = req.query;

    // Check if 'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [plan, liters, cost] = data.split(',');

    // Check if all required fields are provided
    if (!plan || !liters || !cost) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const newPlan = new Plan({
        plan: String(plan),
        liters: Number(liters),
        cost: Number(cost),
    });

    try {
        await newPlan.save();
        res.status(201).json({ message: "Plan created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all Plans
export const getPlans = async (req, res, next) => {
    try {
        const Plans = await Plan.find();
        res.status(200).json(Plans);
    } catch (error) {
        next(error);
    }
};

// Update a Plan by ID
export const updatePlan = async (req, res, next) => {
    const { id } = req.params;
    const { plan, liters, cost } = req.body;

    try {
        const updatedPlan = await Plan.findByIdAndUpdate(
            id,
            {plan, liters, cost},
            { new: true } // Return the updated document
        );

        if (!updatedPlan) return next(errorHandler(404, 'Plan not found'));
        res.status(200).json(updatedPlan);
    } catch (error) {
        next(error);
    }
};

// Delete a Plan by ID
export const deletePlan = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedPlan = await Plan.findByIdAndDelete(id);
        if (!deletedPlan) return next(errorHandler(404, 'Plan not found'));
        res.status(200).json({ message: "Plan deleted successfully" });
    } catch (error) {
        next(error);
    }
};
