import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  customerId: { type: Number, required: true },
  txnId: { type: Number, default: true },
  deviceId: { type: Number, default: true },
  datetime: { type: Date, default: Date.now },
  cost: { type: Number, required: true },
  phone: { type: Number, required: true },
},
{
    timestamps: true
}
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;