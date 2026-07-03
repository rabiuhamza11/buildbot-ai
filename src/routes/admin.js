import { Router } from 'express';
import User from '../models/User.js';
import Plan from '../models/Plan.js';
import Payment from '../models/Payment.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Admin middleware
const adminCheck = (req, res, next) => {
  if (req.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ success: false, error: 'Admin access required' });
  }
  next();
};

// Dashboard stats
router.get('/dashboard', authMiddleware, adminCheck, async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const completedPlans = await Plan.countDocuments({ status: 'completed' });
    const totalPayments = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const activeSubscriptions = await User.countDocuments({ accountType: { $in: ['basic', 'professional'] } });
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });
    
    res.json({
      success: true,
      stats: {
        totalUsers, totalPlans, completedPlans,
        totalRevenue: totalPayments[0]?.total || 0,
        activeSubscriptions, newUsersThisMonth
      }
    });
  } catch (err) { next(err); }
});

// All users
router.get('/users', authMiddleware, adminCheck, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const filter = {};
    if (search) filter.$or = [{ email: new RegExp(search, 'i') }, { fullName: new RegExp(search, 'i') }];
    const users = await User.find(filter).select('-password').sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const total = await User.countDocuments(filter);
    res.json({ success: true, users, pagination: { current: page, total, pages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
});

// All payments
router.get('/payments', authMiddleware, adminCheck, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const payments = await Payment.find(filter).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const total = await Payment.countDocuments(filter);
    res.json({ success: true, payments, pagination: { current: page, total, pages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
});

export default router;
