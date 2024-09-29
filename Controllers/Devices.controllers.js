import Devices from '../Models/Devices.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new Devices
export const createDevices = async (req, res, next) => {
    const { data } = req.query;

    // Check if 'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [deviceId, phone, access, curr_plan, status] = data.split(',');

    // Check if all required fields are provided
    if (!deviceId || !phone || access || !curr_plan || !status) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const newDevices = new Devices({
        deviceId,
        phone: Number(phone),
        access: String(access),
        curr_plan: Number(curr_plan),
        status: String(status),
    });

    try {
        await newDevices.save();
        res.status(201).json({ message: "Devices created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all Devicess
export const getDevicess = async (req, res, next) => {
    try {
        const Devicess = await Devices.find();
        res.status(200).json(Devicess);
    } catch (error) {
        next(error);
    }
};

// Update a Devices by ID
export const updateDevices = async (req, res, next) => {
    const { id } = req.params;
    const { deviceId, phone, access, curr_plan, status } = req.body;

    try {
        const updatedDevices = await Customer.findByIdAndUpdate(
            id,
            {deviceId, phone, access, curr_plan, status },
            { new: true } // Return the updated document
        );

        if (!updatedDevices) return next(errorHandler(404, 'Devices not found'));
        res.status(200).json(updatedDevices);
    } catch (error) {
        next(error);
    }
};

// Delete a Devices by ID
export const deleteDevices = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedDevices = await Devices.findByIdAndDelete(id);
        if (!deletedDevices) return next(errorHandler(404, 'Devices not found'));
        res.status(200).json({ message: "Devices deleted successfully" });
    } catch (error) {
        next(error);
    }
};
