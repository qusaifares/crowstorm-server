import mongoose from '../connection';
import { emailRegex, zipRegex } from '../../middleware/validationRegex';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: [3, 'Username is too short'],
    maxlength: [20, 'Username is too long'],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (e: string): boolean => emailRegex.test(e),
      message: ({ value }) => `${value} is not a valid email`,
    },
  },
  password: { type: String, required: true },
  address: {
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
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  createdAt: { type: Date, default: Date.now },
});

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

const User = mongoose.model('User', UserSchema);

export default User;
