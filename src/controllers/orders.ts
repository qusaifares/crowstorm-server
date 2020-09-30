import { IOrder } from './../db/models/Order';
import express, { Router, Request, Response } from 'express';
import Order from '../db/models/Order';
import User from '../db/models/User';
import dotNotate from '../helpers/dotNotate';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2020-08-27'
});

const router: Router = express.Router();

// Get all orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const query: any = {};
    if (userId) query.user = userId;
    const orders = await Order.find(query).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(404).json({ name: err.name, message: err.message });
  }
});

router.post('/createIntent', async (req: Request, res: Response) => {
  try {
    const total: number = req.body.total;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // amount in cents
      currency: 'usd'
    });
    res.status(201).json(paymentIntent);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
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
    const orderBody: IOrder = req.body;
    const order = await Order.create(orderBody);
    const user = await User.findById(orderBody.user);
    if (user) {
      user.orders?.push(order._id);
      user.save();
    }
    console.log(order);
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
