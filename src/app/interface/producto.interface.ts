import { CategoriaProducto } from "./categoria-prod.interface";

export interface Producto {
    prd_id: number;
    prd_nom: string;
    cat_prod_id: CategoriaProducto;
}
