import { Product } from './product.interface';

export interface CartItem {
  _id: string;
  user: string;
  product: Product;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}