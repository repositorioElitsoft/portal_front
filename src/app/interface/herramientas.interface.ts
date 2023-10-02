import { Producto } from "../interface/producto.interface";

export interface Herramientas {
    herr_usr_id?: number;
    herr_usr_anos_exp: string;
    herr_usr_vrs: string;
    cat_prod_id?: number;
    prd_id?: number;
    cert_id?: number;
    nvl_id?: number;
    usr_id?: number;
    prd_nom?: string;
    producto?: Producto; // Agrega esta línea para definir la propiedad producto
}  