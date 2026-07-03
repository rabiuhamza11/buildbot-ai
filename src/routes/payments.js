import { Router } from 'express';
import axios from 'axios';
import Payment from '../models/Payment.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
const PAYSTACK_BASE = 'https://api.paystack.co';
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// Create payment
router.post('/create', authMiddleware, async (req, res, next) => {
  try {
    const { planId, planType, email, fullName, phone } = req.body;
    const pricing = { basic: 15000, professional: 45000 };
    const amount = pricing[planType] || 15000;
    
    // Initialize Paystack transaction
    const response = await axios.post(`${PAYSTACK_BASE}/transaction/initialize`, {
      email, amount: amount * 100, // Paystack uses kobo
      reference: `BBA-${Date.now()}`,
      callback_url: process.env.PAYMENT_CALLBACK_URL,
      metadata: { planId, planType, userId: req.user.userId }
    }, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}`, 'Content-Type': 'application/json' }
    });
    
    const payment = await Payment.create({
      userId: req.user.userId, planId, amount, planType,
      reference: response.data.data.reference,
      status: 'pending', email, fullName
    });
    
    res.status(201).json({
      success: true,
      payment,
      authorization_url: response.data.data.authorization_url,
      access_code: response.data.data.access_code
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Verify payment
router.get('/verify/:reference', authMiddleware, async (req, res, next) => {
  try {
    const response = await axios.get(`${PAYSTACK_BASE}/transaction/verify/${req.params.reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
    });
    
    const status = response.data.data.status === 'success' ? 'completed' : 'failed';
    const payment = await Payment.findOneAndUpdate(
      { reference: req.params.reference },
      { status, transactionDate: new Date() },
      { new: true }
    );
    
    res.json({ success: true, payment });
  } catch (err) { next(err); }
});

// Paystack webhook
router.post('/webhook', async (req, res) => {
  try {
    const event = req.body;
    if (event.event === 'charge.success') {
      const ref = event.data.reference;
      await Payment.findOneAndUpdate({ reference: ref }, { status: 'completed', transactionDate: new Date() });
    }
    res.status(200).json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payment history
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const payments = await Payment.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (err) { next(err); }
});

export default router;
