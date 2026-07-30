export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;

  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
}
