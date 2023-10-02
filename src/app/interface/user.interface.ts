import { Pais } from "./pais.interface"

export interface Usuario {
    usr_id?:number
    usr_rut:string
    usr_nom:string
    usr_ap_pat:string
    usr_ap_mat:string
    usr_email:string
    usr_pass:string
    usr_tel:string
    usr_url_link:string
    pais_nom: string;
    pais?: Pais; // Agregar esta línea para definir la propiedad pais
}