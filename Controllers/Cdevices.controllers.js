import Cdevices from '../Models/Cdevices.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new Cdevice
export const createCdevices = async (req, res, next) => {
    const { data } = req.query;

    // Check if  'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [customerId, name, phone, deviceId, access] = data.split(',');

    // Check if all required fields are provided
    if (!customerId || !name || !phone || !deviceId || !access) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const newCdevices = new Cdevices({
        customerId,
        name: String(name),
        phone: Number(phone),
        deviceId,
        access: String(access),
    });

    try {
        await newCdevices.save();
        res.status(201).json({ message: "Cdevices created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all Cdevicess
export const getCdevicess = async (req, res, next) => {
    try {
        const Cdevicess = await Cdevices.find();
        res.status(200).json(Cdevicess);
    } catch (error) {
        next(error);
    }
};

// Update a Cdevices by ID
export const updateCdevices = async (req, res, next) => {
    const { id } = req.params;
    const { customerId, name, phone, deviceId, access } = req.body;

    try {
        const updatedCdevices = await Cdevices.findByIdAndUpdate(
            id,
            {customerId, name, phone, deviceId, access },
            { new: true } // Return the updated document
        );

        if (!updatedCdevices) return next(errorHandler(404, 'Cdevices not found'));
        res.status(200).json(updatedCdevices);
    } catch (error) {
        next(error);
    }
};

// Delete a Cdevices by ID
export const deleteCdevices = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedCdevices = await Cdevices.findByIdAndDelete(id);
        if (!deletedCdevices) return next(errorHandler(404, 'Cdevices not found'));
        res.status(200).json({ message: "Cdevices deleted successfully" });
    } catch (error) {
        next(error);
    }
};
