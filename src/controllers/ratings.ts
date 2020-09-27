import express, { Router, Request, Response } from 'express';
import Rating from '../db/models/Rating';
import Product from '../db/models/Product';
import dotNotate from '../helpers/dotNotate';

const router: Router = express.Router();

// Get all ratings
router.get('/', async (req: Request, res: Response) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (err) {
    res.status(404).json({ name: err.name, message: err.message });
  }
});

// Get one rating by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const rating = await Rating.findById(req.params.id);
    res.json(rating);
  } catch (err) {
    res.status(404).json({ name: err.name, message: err.message });
  }
});

// Create an rating
router.post('/', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.body.product);
    if (!product) throw new Error('Product not found');
    const rating = await Rating.create(req.body);
    res.json(rating);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
  }
});

// Find an rating by id and update
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const rating = await Rating.findByIdAndUpdate(
      req.params.id,
      { $set: dotNotate(req.body) },
      { new: true }
    );
    res.json(rating);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const { user, product } = req.query;
    await Rating.deleteOne({ user, product });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
  }
});

export default router;
