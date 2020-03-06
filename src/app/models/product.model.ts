import { Color } from './color.model';
import { ProviderModel } from './provider.model';
import { Category } from './category.model';

export interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
    weight: number;
    quantity: number;
    manufactureDate?: Date;
    image?: string;
    status: number;
    colors?: Color[];
    provider?: ProviderModel;
    category?: Category;
    providerId?: number;
    categoryId?: number;
}
