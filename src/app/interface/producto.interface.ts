import { ProductCategory } from "./categoria-prod.interface";
export interface Producto {
    id: number;
    name: string;
    productCategory: ProductCategory;
}
