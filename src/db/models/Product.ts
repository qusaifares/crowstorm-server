import mongoose from '../connection';

const { Schema } = mongoose;

// Enum of colors (Keep consistent with client side)
export enum Color {
  White = 'white',
  Black = 'black',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple',
  Brown = 'brown',
  Gray = 'gray',
  Pink = 'pink',
}

// Enum of product types (Keep consistent with client side)
export enum ProductType {
  Jacket = 'jacket',
  Shirt = 'shirt',
  Pants = 'pants',
  Watch = 'watch',
  Footwear = 'footwear',
}

export interface Rating {
  user: string;
  rating: number;
}

export interface IProduct {
  title: string;
  description: string;
  price: number;
  productType: ProductType;
  colors: Color[];
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
    enum: Object.values(ProductType),
  },
  colors: [{ type: String, enum: Object.values(Color) }],
  ratingData: {
    stars: { type: Number, min: 0, max: 5 },
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 0, max: 5 },
      },
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
