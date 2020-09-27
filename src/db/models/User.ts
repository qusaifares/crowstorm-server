// import { Document, Model } from 'mongoose';
import mongoose from '../connection';
import { emailRegex, zipRegex } from '../../helpers/validationRegex';
import { statesList } from '../../helpers/statesList';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const { Types } = Schema;

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
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
    password: { type: String, required: true, select: false },
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
