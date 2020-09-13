import express, { Router, Request, Response } from 'express';
import Order from '../db/models/Order';

const router: Router = express.Router();

// Get all orders
router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Get one order by id
router.get('/:id/', async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Create an order
router.post('/', async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Find an order by id and update
router.put('/:id/', async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id/', async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
