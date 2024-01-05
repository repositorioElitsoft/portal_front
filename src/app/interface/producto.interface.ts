import { ProductCategory } from "./categoria-prod.interface";
export interface Product {
    id: number;
    name: string;
    productCategory: ProductCategory;
}


export type CreateProductDTO = Omit<Product, 'productCategory' >;