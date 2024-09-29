import mongoose from "mongoose";

const LdevicesSchema = new mongoose.Schema({
  deviceId: { type: Number, required: true },
  tds: { type: Number, default: true },
  liters_remaining: { type: Number, required: true },
  cost: { type: Number, required: true },
  current_plans: { type: Number, required: true },
  total_liters: { type: Number, required: true },
  status: { type: String, required: true },
},
{
    timestamps: true
}
);

const Ldevices = mongoose.model('Ldevices', LdevicesSchema);

export default Ldevices;