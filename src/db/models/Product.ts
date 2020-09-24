import mongoose from '../connection';

const { Schema } = mongoose;

// Enum of colors (Keep consistent with client side)
export enum Color {
  White = 'White',
  Black = 'Black',
  Red = 'Red',
  Orange = 'Orange',
  Yellow = 'Yellow',
  Green = 'Green',
  Blue = 'Blue',
  Purple = 'Purple',
  Brown = 'Brown',
  Gray = 'Gray',
  Pink = 'Pink'
}

// Enum of product types (Keep consistent with client side)
export enum ProductType {
  Jacket = 'Jacket',
  Shirt = 'Shirt',
  Pants = 'Pants',
  Watch = 'Watch',
  Footwear = 'Footwear',
  Other = 'Other'
}

export interface Rating {
  user: string;
  rating: number;
}

export interface IProduct {
  title: string;
  description: string;
  price: number;
  quantity: number;
  productType: ProductType;
  color: Color;
  images: string[];
  ratingData: {
    stars: number;
    ratings: Rating[];
  };
  createdAt: Date;
}

const ProductSchema = new Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  productType: {
    type: String,
    enum: Object.values(ProductType)
  },
  quantity: { type: Number },
  color: { type: String, enum: Object.values(Color) },
  images: [{ type: String }],
  ratingData: {
    stars: { type: Number, min: 0, max: 5 },
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 0, max: 5 }
      }
    ]
  },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
