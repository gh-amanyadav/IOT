import mongoose from "mongoose";

const CdevicesSchema = new mongoose.Schema({
  customerId: { type: Number, required: true },
  name: { type: String, default: true },
  phone: { type: Number, required: true },
  deviceId: { type: Number, required: true },
  access: { type: String, required: true },
},
{
    timestamps: true
}
);

const Cdevices = mongoose.model('Cdevices', CdevicesSchema);

export default Cdevices;