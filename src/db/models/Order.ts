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
  user: mongoose.Types.ObjectId;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  items: Item[];
  shippingAddress: Address;
  paymentInfo: PaymentInfo;
  amount: number;
  isPaid: boolean;
  isShipped: boolean;
  orderDate: Date;
  shipDate: Date;
}

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  customerInfo: {
    name: String,
    email: String,
    phone: String
  },
  items: [
    new Schema(
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        price: Number,
        quantity: Number
      },
      { _id: false }
    )
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
  amount: Number,
  isPaid: { type: Boolean, default: false },
  isShipped: { type: Boolean, default: false },
  orderDate: { type: Date, default: Date.now },
  shipDate: { type: Date }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
