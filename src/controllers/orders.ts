import express, { Router, Request, Response } from 'express';
import Order from '../db/models/Order';
import dotNotate from '../helpers/dotNotate';
import Stripe from 'stripe';

const strip = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2020-08-27'
});

const router: Router = express.Router();

// Get all orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(404).json({ name: err.name, message: err.message });
  }
});

// Get one order by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(404).json({ name: err.name, message: err.message });
  }
});

// Create an order
router.post('/', async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
  }
});

// Find an order by id and update
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: dotNotate(req.body) },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
  }
});

router.post('/checkout', async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

export default router;
