import Transaction from '../Models/Transaction.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new Transaction
export const createTransaction = async (req, res, next) => {
    const { data } = req.query;

    // Check if 'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [customerId, txnId, deviceId, cost, phone] = data.split(',');

    // Check if all required fields are provided
    if (!customerId || !txnId || !deviceId || !cost || !phone) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const istDatetime = moment().tz('Asia/Kolkata').format();

    const newTransaction = new Transaction({
        customerId,
        txnId,
        deviceId,
        datetime: istDatetime,
        cost: Number(cost),
        phone: Number(phone),
    });

    try {
        await newTransaction.save();
        res.status(201).json({ message: "Transaction created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all Transaction
export const getTransactions = async (req, res, next) => {
    try {
        const Transactions = await Transaction.find();
        res.status(200).json(Transactions);
    } catch (error) {
        next(error);
    }
};

// Update a Transaction by ID
export const updateTransaction = async (req, res, next) => {
    const { id } = req.params;
    const { customerId, txnId, deviceId, cost, phone } = req.body;

    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            {customerId, txnId, deviceId, cost, phone},
            { new: true } // Return the updated document
        );

        if (!updatedTransaction) return next(errorHandler(404, 'Transaction not found'));
        res.status(200).json(updatedTransaction);
    } catch (error) {
        next(error);
    }
};

// Delete a Transaction by ID
export const deleteTransaction = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        if (!deletedTransaction) return next(errorHandler(404, 'Transaction not found'));
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        next(error);
    }
};
