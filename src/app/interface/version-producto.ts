import {Product} from "./producto.interface";
export interface ProductVersion {
    id: number;
    name: string;
    product: Product;
}