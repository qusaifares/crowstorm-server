import express, { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../db/models/User';
import dotNotate from '../helpers/dotNotate';
const { SESSION_NAME = 'sid' } = process.env;

const router: Router = express.Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
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
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: dotNotate(req.body) },
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

// Register a user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const userToCheck = await User.find({ email: req.body.email });
    if (userToCheck) throw new Error('User already exists with that email');
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Persist
router.post('/persist', (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session?.user) {
      req.login(req.session.user, (err) => {
        if (err) throw new Error('err');
        res.json(req.user);
      });
    } else {
      throw new Error('Not allowed');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    try {
      if (err) {
        throw new Error(err);
      }
      if (!user) throw new Error('No user exists');
      req.login(user, (err) => {
        if (err) throw err;
        if (req.session) req.session.user = user;
        let userData = { ...user._doc };
        delete userData.password;
        res.json(userData);
      });
    } catch (error) {
      res.send(error);
    }
  })(req, res, next);
});

router.post('/logout', (req: Request, res: Response) => {
  try {
    req.session?.destroy((err) => {
      if (err) {
        throw new Error('Unsuccessful');
      } else {
        res.clearCookie(SESSION_NAME);
        res.send('Logged out successfully');
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/user', (req: Request, res: Response) => {
  try {
    if (!req.user) throw new Error('No user');
    res.json(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;