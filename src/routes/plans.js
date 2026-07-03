import { Router } from 'express';
import Plan from '../models/Plan.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Generate plan
router.post('/generate', authMiddleware, async (req, res, next) => {
  try {
    const { title, projectType, description, rooms, bathrooms, length, width, height, features, location, budget } = req.body;
    
    // Calculate estimates
    const area = (length || 50) * (width || 40);
    const estCost = budget || area * 45000;
    const cementBags = Math.ceil(area / 5);
    const blocks = Math.ceil(area * 8);
    
    const materials = [
      { name: 'Cement (42.5N)', quantity: cementBags, unit: 'bags', unitCost: 4200, totalCost: cementBags * 4200 },
      { name: 'Sandcrete blocks (450x225x225)', quantity: blocks, unit: 'units', unitCost: 350, totalCost: blocks * 350 },
      { name: 'Sharp sand', quantity: Math.ceil(cementBags / 3), unit: 'tonnes', unitCost: 45000, totalCost: Math.ceil(cementBags / 3) * 45000 },
      { name: 'Granite (3/4)', quantity: Math.ceil(cementBags / 4), unit: 'tonnes', unitCost: 85000, totalCost: Math.ceil(cementBags / 4) * 85000 },
      { name: 'Reinforcement bars (12mm)', quantity: Math.ceil(cementBags / 5), unit: 'lengths', unitCost: 8500, totalCost: Math.ceil(cementBags / 5) * 8500 },
      { name: 'Roofing sheets', quantity: Math.ceil(area / 3), unit: 'sheets', unitCost: 12000, totalCost: Math.ceil(area / 3) * 12000 }
    ];
    
    const plan = await Plan.create({
      userId: req.user.userId, title, projectType, description,
      specifications: { rooms, bathrooms, length, width, height, features },
      materials, estimatedCost: estCost, location, budget,
      status: 'completed', planTier: req.user.accountType || 'free'
    });
    
    res.status(201).json({ success: true, plan });
  } catch (err) { next(err); }
});

// List user's plans
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = { userId: req.user.userId };
    if (status) filter.status = status;
    const plans = await Plan.find(filter).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const total = await Plan.countDocuments(filter);
    res.json({ success: true, data: plans, pagination: { current: page, total, pages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
});

// Get single plan
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const plan = await Plan.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!plan) return res.status(404).json({ success: false, error: 'Plan not found' });
    res.json({ success: true, plan });
  } catch (err) { next(err); }
});

// Update plan
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const plan = await Plan.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId }, req.body, { new: true });
    if (!plan) return res.status(404).json({ success: false, error: 'Plan not found' });
    res.json({ success: true, plan });
  } catch (err) { next(err); }
});

// Delete plan
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const result = await Plan.deleteOne({ _id: req.params.id, userId: req.user.userId });
    if (result.deletedCount === 0) return res.status(404).json({ success: false, error: 'Plan not found' });
    res.json({ success: true, message: 'Plan deleted' });
  } catch (err) { next(err); }
});

export default router;
