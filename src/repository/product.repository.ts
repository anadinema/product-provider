import { Product } from './entity/product';
import { postgresDatabase } from '../config';

const repository = postgresDatabase.getRepository(Product);

export const getAllProducts = () => repository.find();
export const getProductById = (id: string) => repository.findOneBy({
  id: id
});
export const createProduct = (product: Product) => repository.save(product);
export const updateProduct = (id: string, product: Product) => repository.update({
  id: id
}, product);

export const getProductFromBody = (body: any): null | Product => {
  const products = repository.create(body);
  if (!products) {
    return null;
  }
  if (products.length == undefined) {
    return products as unknown as Product;
  }
  return products[0];
};