import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  projectType: { type: String, enum: ['residential', 'commercial', 'school', 'hospital', 'industrial', 'religious'], default: 'residential' },
  description: { type: String, default: '' },
  specifications: {
    rooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 3.5 },
    features: [String]
  },
  location: { type: String, default: 'Nigeria' },
  budget: { type: Number, default: 0 },
  generatedContent: { type: String, default: '' },
  materials: [{
    name: String,
    quantity: Number,
    unit: String,
    unitCost: Number,
    totalCost: Number
  }],
  estimatedCost: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'completed', 'archived'], default: 'completed' },
  planTier: { type: String, enum: ['free', 'basic', 'professional'], default: 'free' }
}, { timestamps: true });

export default mongoose.model('Plan', planSchema);
