import { Product } from './product.model';

export interface Color {
    id: String;
    name: String;
    image: String;
    product: Product;
}
