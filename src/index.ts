// Imports
import express, { Application } from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportConfig from './middleware/passportConfig';
import hours from './helpers/hours';

require('dotenv').config();

const app: Application = express();

const {
  SESSION_NAME = 'sid',
  SESSION_HOURS = 24,
  SESSION_SECRET = 'cookie-secret-code'
} = process.env;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(
  session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: hours(SESSION_HOURS)
    }
  })
);
app.use(cookieParser(SESSION_SECRET));
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
