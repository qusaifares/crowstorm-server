import { uploadToS3 } from './../middleware/uploadToS3';
import express, { Router, Request, Response, NextFunction } from 'express';
import Product from '../db/models/Product';
import dotNotate from '../helpers/dotNotate';

const router: Router = express.Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(404).json({ name: err.name, message: err.message });
  }
});

// Get one product by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ name: err.name, message: err.message });
  }
});

// Create a product
router.post('/', async (req: Request, res: Response) => {
  try {
    const { images, ...body } = req.body;
    const product = await Product.create(body);
    await Promise.all(
      images.map(async (img: string) => {
        // @ts-expect-error
        const imgName: string = await uploadToS3(img, product._id, 'products');
        if (imgName) {
          //@ts-expect-error
          return product.images.push(imgName);
        }
      })
    );
    product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
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
    res.status(500).json({ name: err.name, message: err.message });
  }
});

// Delete a product by id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ name: err.name, message: err.message });
  }
});

// router.post(
//   '/uploadImage',
//   (req: Request, res: Response, next: NextFunction) => {

//   }
// );

export default router;
