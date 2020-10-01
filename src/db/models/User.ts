import mongoose from '../connection';
import { IProduct } from './Product';
import { emailRegex, zipRegex } from '../../helpers/validationRegex';
import { statesList } from '../../helpers/statesList';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const { Types } = Schema;

const { DFPW } = process.env;

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface CartItemBase {
  product: string;
  quantity: number;
}
export interface CartItem {
  product: IProduct;
  quantity: number;
}

export interface IUserBase {
  name: {
    first: string;
    last: string;
    full?: string;
  };
  email: string;
  password?: string;
}

export interface IUser extends mongoose.Document {
  name: {
    first: string;
    last: string;
    full?: string;
  };
  email?: string;
  password?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  cart?: CartItem[];
  orders?: string[];
  googleId?: string;
  createdAt?: Date;
}

const UserSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'First name is too long']
      },
      last: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'Last name is too long']
      }
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (e: string): boolean => emailRegex.test(e),
        message: ({ value }) => `${value} is not a valid email`
      }
    },
    password: { type: String, required: true, default: DFPW, select: false },
    address: {
      street: String,
      city: String,
      state: { type: String, enum: statesList },
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
    cart: [
      new Schema(
        {
          product: { type: mongoose.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number }
        },
        { _id: false }
      )
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    googleId: String,
    createdAt: { type: Date, default: Date.now }
  },
  {}
);

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

UserSchema.virtual('name.full').get(
  (value: any, virtual: any, doc: IUser) => `${doc.name.first} ${doc.name.last}`
);

UserSchema.pre<IUser>('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
