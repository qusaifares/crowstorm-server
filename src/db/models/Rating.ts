import mongoose from '../connection';
import { IUser } from './User';
import Product, { IProduct } from './Product';
import removeRatingFromProduct from '../../middleware/removeRatingFromProduct';

const { Schema } = mongoose;

export interface IRating extends mongoose.Document {
  user: IUser['_id'];
  product: IProduct['_id'];
  value: number;
}

const RatingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  value: { type: Number, min: 0, max: 5 }
});

RatingSchema.pre<IRating>('init', function (next) {
  Product.create(this.toObject());
  next();
});

RatingSchema.post<IRating>('remove', (doc, next) => {
  removeRatingFromProduct(doc.product, doc._id);
  next();
});

const Rating = mongoose.model<IRating>('Rating', RatingSchema);

export default Rating;
