import mongoose from "mongoose";

const DevicesSchema = new mongoose.Schema({
  deviceId: { type: Number, required: true },
  phone: { type: Number, default: true },
  access: { type: String, default: true },
  curr_plan: { type: Number, required: true },
  status: { type: String, required: true },
},
{
    timestamps: true
}
);

const Devices = mongoose.model('Devices', DevicesSchema);

export default Devices;