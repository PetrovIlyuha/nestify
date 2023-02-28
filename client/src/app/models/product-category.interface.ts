import { Product } from "./product.interface";

export interface ProductCategory {
  type: string;
  products: Product[];
}
