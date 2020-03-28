import { Product } from './product.model';

export interface Color {
    id?: number;
    name: string;
    colorCode: string;
    productID?: number;
}
