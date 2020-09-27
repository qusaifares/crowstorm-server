import mongoose from '../connection';
import { zipRegex } from '../../helpers/validationRegex';
import { String } from 'aws-sdk/clients/acm';

const { Schema } = mongoose;

interface Item {
  product: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
}

interface Address {
  street: String;
  city: String;
  state: String;
  country: String;
  zip: string;
}

interface PaymentInfo {
  paymentId: string;
  paymentType: 'paypal' | 'stripe';
}

export interface IOrder extends mongoose.Document {
  customer: mongoose.Types.ObjectId;
  items: Item[];
  shippingAddress: Address;
  paymentInfo: PaymentInfo;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  orderDate: Date;
  shipDate: Date;
}

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      price: Number,
      quantity: Number
    }
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
          `${value} is not a valid zip code`
      }
    }
  },
  paymentInfo: {
    paymentId: String,
    paymentType: { type: String, enum: ['paypal', 'stripe'] }
  },
  subtotal: Number,
  tax: Number,
  total: Number,
  isPaid: Boolean,
  orderDate: { type: Date, default: Date.now },
  shipDate: { type: Date }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
