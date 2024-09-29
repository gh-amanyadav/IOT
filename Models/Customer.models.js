import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  customerId: { type: Number, required: true },
  name: { type: String, default: true },
  location: { type: String, default: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  access: { type: String, required: true },
},
{
    timestamps: true
}
);

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;