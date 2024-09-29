import Ldevices from '../Models/Ldevices.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new Ldevice
export const createLdevices = async (req, res, next) => {
    const { data } = req.query;

    // Check if 'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [deviceId, tds, liters_remaining, cost, current_plans, total_liters, status] = data.split(',');

    // Check if all required fields are provided
    if (!deviceId || !tds || !liters_remaining || !cost || !current_plans || !total_liters || !status) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const newLdevices = new Ldevices({
        deviceId,
        tds: Number(tds),
        liters_remaining: Number(liters_remaining),
        cost: Number(cost),
        current_plans: Number(current_plans),
        total_liters: Number(total_liters),
        status: String(status),
    });

    try {
        await newLdevices.save();
        res.status(201).json({ message: "Ldevices created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all Ldevicess
export const getLdevicess = async (req, res, next) => {
    try {
        const Ldevicess = await Ldevices.find();
        res.status(200).json(Ldevicess);
    } catch (error) {
        next(error);
    }
};

// Update a Ldevices by ID
export const updateLdevices = async (req, res, next) => {
    const { id } = req.params;
    const { deviceId, tds, liters_remaining, cost, current_plans, total_liters, status } = req.body;

    try {
        const updatedLdevices = await Ldevices.findByIdAndUpdate(
            id,
            {deviceId, tds, liters_remaining, cost, current_plans, total_liters, status },
            { new: true } // Return the updated document
        );

        if (!updatedLdevices) return next(errorHandler(404, 'Ldevices not found'));
        res.status(200).json(updatedLdevices);
    } catch (error) {
        next(error);
    }
};

// Delete a Ldevices by ID
export const deleteLdevices = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedLdevices = await Ldevices.findByIdAndDelete(id);
        if (!deletedLdevices) return next(errorHandler(404, 'Ldevices not found'));
        res.status(200).json({ message: "Ldevices deleted successfully" });
    } catch (error) {
        next(error);
    }
};
