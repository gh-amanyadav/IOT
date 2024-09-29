import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  liters: { type: Number, default: true },
  cost: { type: Number, default: true },
},
{
    timestamps: true
}
);

const Plan = mongoose.model('Plan', PlanSchema);

export default Plan;