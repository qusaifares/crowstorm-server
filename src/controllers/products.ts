import express, { Router, Request, Response } from 'express';
import Product from '../db/models/Product';
import dotNotate from '../helpers/dotNotate';

const router: Router = express.Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Get one product by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Create a product
router.post('/', async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Find a product by id and update
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: dotNotate(req.body) },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a product by id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
