import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  amount: { type: Number, required: true },
  planType: { type: String, enum: ['basic', 'professional'], required: true },
  reference: { type: String, unique: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  email: { type: String, default: '' },
  fullName: { type: String, default: '' },
  transactionDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
