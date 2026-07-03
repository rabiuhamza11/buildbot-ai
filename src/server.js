import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import planRoutes from './routes/plans.js';
import paymentRoutes from './routes/payments.js';
import adminRoutes from './routes/admin.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Security & middleware
app.use(helmet());
app.use(cors({ origin: process.env.APP_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'BuildBot AI', version: '1.0.0' });
});

// Error handler
app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/buildbot-ai';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 BuildBot AI running on port ${PORT}`);
      console.log(`📍 ${process.env.APP_URL || `http://localhost:${PORT}`}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Starting without database...');
    app.listen(PORT, () => {
      console.log(`🚀 BuildBot AI running on port ${PORT} (no DB)`);
    });
  });

export default app;
