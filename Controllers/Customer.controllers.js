import Customer from '../Models/Customer.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new Customer
export const createCustomer = async (req, res, next) => {
    const { data } = req.query;

    // Check if 'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [customerId, name, location, phone, email, access] = data.split(',');

    // Check if all required fields are provided
    if (!customerId || !name || !location || !phone || !email || !access) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const newCustomer = new Customer({
        customerId,
        name: String(name),
        location: String(location),
        phone: Number(phone),
        email: String(email),
        access: String(access),
    });

    try {
        await newCustomer.save();
        res.status(201).json({ message: "Customer created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all Customers
export const getCustomers = async (req, res, next) => {
    try {
        const Customers = await Customer.find();
        res.status(200).json(Customers);
    } catch (error) {
        next(error);
    }
};

// Update a Customer by ID
export const updateCustomer = async (req, res, next) => {
    const { id } = req.params;
    const { customerId, name, location, phone, email, access } = req.body;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            {customerId, name, location, phone, email, access },
            { new: true } // Return the updated document
        );

        if (!updatedCustomer) return next(errorHandler(404, 'Customer not found'));
        res.status(200).json(updatedCustomer);
    } catch (error) {
        next(error);
    }
};

// Delete a Customer by ID
export const deleteCustomer = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) return next(errorHandler(404, 'Customer not found'));
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        next(error);
    }
};
