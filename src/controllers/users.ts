import express, { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../db/models/User';

const router: Router = express.Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('test');
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

// Get one user by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

// Find a user by id and update
router.put('/:id', async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a user
router.post('/', async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    try {
      console.log('ERROR ====>', err);
      console.log('USER ====>', user);
      console.log('INFO ====>', info);
      if (!user) throw new Error('No user exists');
      res.json(user);
    } catch (err) {
      res.status(404).send(err);
    }
  })(req, res, next);
});

export default router;
