import Product, { IProduct } from '../models/Product';

import productsData from './products';

const seedProducts = async (data: any[]) => {
  try {
    await Product.deleteMany({});
    const products = await Product.create(data);
    console.log(`Successfully created ${products.length} documents.`);
  } catch (error) {
    console.log(error);
  }
};

// seedProducts(productsData);
