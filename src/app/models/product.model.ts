import { Color } from './color.model';
import { ProviderModel } from './provider.model';
import { Category } from './category.model';
import { ProductVolume } from './product-volume.model';

export interface Product {
    id?: number;
    name: string;
    description?: string;  
    image?: string;
    colors?: Color[];
    provider?: ProviderModel;
    category?: Category;
    providerId?: number;
    categoryId?: number;
    productVolumes: ProductVolume[];
}
