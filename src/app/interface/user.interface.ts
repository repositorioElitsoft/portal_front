import { CargoUsuario } from "./cargos-usuario.interface"
import { HerramientaData } from "./herramienta-data.interface"
import { Laboral } from "./laboral.interface"
import { Pais } from "./pais.interface"

export interface Usuario {
    usr_id?:number
    usr_rut?:string
    usr_nom:string
    usr_ap_pat?:string
    usr_ap_mat?:string
    usr_email:string
    usr_pass?:string
    usr_tel?:string
    usr_url_link?:string
    pais_nom?: string;
    pais?: Pais; // Agregar esta línea para definir la propiedad pais
    herramientas?: HerramientaData[];
    usr_herr: string;
    herr_ver: string;
    herr_exp: string;
    cvPath?: string;
    laborales?: Laboral[];
    cargoUsuario?: CargoUsuario[];
}


export type UserEditarDTO = Omit<Usuario, 'usr_tel' |'usr_url_link'|'pais_nom'| 'pais'| 'herramientas'| 'usr_herr'| 'herr_ver'| 'herr_exp'> & { usr_rol: string };

  