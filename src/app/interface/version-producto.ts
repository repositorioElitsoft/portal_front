import {Product} from "./producto.interface";
export interface ProductVersion {
    id?: number;
    name?: string;
    product?: Product;
}


export type CreateProductVersionDTO = Omit<ProductVersion, 'product'  >;