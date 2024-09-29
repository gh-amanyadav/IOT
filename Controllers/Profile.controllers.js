import Profile from '../Models/Profile.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new Profile
export const createProfile = async (req, res, next) => {
    const { data } = req.query;

    // Check if 'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [adminId, username, phone, email, access] = data.split(',');

    // Check if all required fields are provided
    if (!adminId || !username || !phone || !email|| !access) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const newProfile = new Profile({
        adminId,
        username: String(username),
        phone: Number(phone),
        email: String(email),
        access: String(access),
    });

    try {
        await newProfile.save();
        res.status(201).json({ message: "Profile created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all Profiles
export const getProfiles = async (req, res, next) => {
    try {
        const Profiles = await Profile.find();
        res.status(200).json(Profiles);
    } catch (error) {
        next(error);
    }
};

// Update a Profile by ID
export const updateProfile = async (req, res, next) => {
    const { id } = req.params;
    const { adminId, username, phone, email, access } = req.body;

    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            id,
            {adminId, username, phone, email, access },
            { new: true } // Return the updated document
        );

        if (!updatedProfile) return next(errorHandler(404, 'Profile not found'));
        res.status(200).json(updatedProfile);
    } catch (error) {
        next(error);
    }
};

// Delete a Profile by ID
export const deleteProfile = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedProfile = await Profile.findByIdAndDelete(id);
        if (!deletedProfile) return next(errorHandler(404, 'Profile not found'));
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        next(error);
    }
};
