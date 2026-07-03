import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  fullName: { type: String, default: '' },
  phone: { type: String, default: '' },
  accountType: { type: String, enum: ['free', 'basic', 'professional'], default: 'free' },
  preferences: {
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'NGN' },
    notifications: { type: Boolean, default: true }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
