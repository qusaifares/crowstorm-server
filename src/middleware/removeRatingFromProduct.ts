import Product, { IProduct } from '../db/models/Product';
import { IRating } from '../db/models/Rating';

const removeRatingFromProduct = async (
  productId: IProduct['_id'],
  ratingId: IRating['_id']
) => {
  try {
    const product = await Product.findById(productId);
    if (!product) return;
    const index = product?.ratingData.ratings.indexOf(ratingId);
    if (index === -1) return;
    product?.ratingData.ratings.splice(index, 1);
    product.save();
  } catch (error) {
    console.log(error);
  }
};

export default removeRatingFromProduct;
