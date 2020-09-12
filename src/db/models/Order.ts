import mongoose from '../connection';
import { zipRegex } from '../../middleware/validationRegex';

const { Schema } = mongoose;

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      price: Number,
      quantity: Number,
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: {
      type: String,
      validate: {
        validator: (z: string): boolean => zipRegex.test(z),
        message: ({ value }: { value: string }) =>
          `${value} is not a valid zip code`,
      },
    },
  },
  paymentInfo: {
    paymentId: String,
    paymentType: { type: String, enum: ['paypal', 'stripe'] },
  },
  subtotal: Number,
  tax: Number,
  total: Number,
  isPaid: Boolean,
  orderDate: { type: Date, default: Date.now },
  shipDate: { type: Date },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
