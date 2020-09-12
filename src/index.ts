import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
