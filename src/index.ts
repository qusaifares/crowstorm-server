// Imports
import express, { Application } from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportConfig from './middleware/passportConfig';

require('dotenv').config();

const app: Application = express();

const COOKIE_SECRET: string = process.env.COOKIE_SECRET!;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// Controllers
import usersController from './controllers/users';
import productsController from './controllers/products';
import ordersController from './controllers/orders';

app.use('/users', usersController);
app.use('/products', productsController);
app.use('/orders', ordersController);

// Server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
