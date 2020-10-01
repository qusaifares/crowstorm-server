// Imports
import express, { Application } from 'express';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
require('dotenv').config();
import passport from 'passport';
import passportLocal from './middleware/passportLocal';
import passportCustom from './middleware/passportCustom';
import hours from './helpers/hours';
import connectMongo from 'connect-mongo';
import mongoose from './db/connection';

const MongoStore = connectMongo(session);

const app: Application = express();

const {
  SESSION_NAME = 'sid',
  SESSION_HOURS = 24,
  SESSION_SECRET = 'cookie-secret-code',
  NODE_ENV
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
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: hours(SESSION_HOURS),
      secure: NODE_ENV === 'production'
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(cookieParser(SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
passportLocal(passport);
passportCustom(passport);

// Controllers
import usersController from './controllers/users';
import productsController from './controllers/products';
import ordersController from './controllers/orders';

app.use('/users', usersController);
app.use('/products', productsController);
app.use('/orders', ordersController);

// Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
