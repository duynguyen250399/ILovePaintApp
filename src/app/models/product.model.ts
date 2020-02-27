import { Color } from './color.model';
import { ProviderModel } from './provider.model';
import { Category } from './category.model';

export class Product {
    id?: Number;
    name: String;
    description?: String;
    price: Number;
    weight: Number;
    quantity: Number;
    manufactureDate?: Date;
    image?: String;
    status: Number;
    colors?: Color[];
    provider?: ProviderModel;
    category?: Category;
    providerId: Number;
    categoryId: Number;
}
