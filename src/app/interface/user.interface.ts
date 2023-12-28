import { CargoUsuario } from "./cargos-usuario.interface"
import { City } from "./city.interface"
import { HerramientaData } from "./herramienta-data.interface"
import { Laboral } from "./laboral.interface"
import { Observacion } from "./observacion.interface"

export interface Usuario {
    usr_id?:number
    usr_rut?:string
    usr_nom:string
    usr_ap_pat?:string
    usr_ap_mat?:string
    usr_email:string
    usr_pass?:string
    usr_tel?:string
    usr_gen?:string
    usr_gen_otro?: string;
    usr_url_link?:string
    city?: City ;
    usr_direcc:string;
    herramientas?: HerramientaData[];
    usr_herr: string;
    herr_ver: string;
    herr_exp: string;
    cvPath?: string;
    laborales?: Laboral[];
    observaciones?: Observacion[];
    cargoUsuario?: CargoUsuario[];
    seleccionado?: boolean;

}


export type UserEditarDTO = Omit<Usuario, 'usr_tel' |'usr_url_link'| 'city' | 'herramientas'| 'usr_herr'| 'herr_ver'| 'herr_exp'> & { usr_rol: string };
export type UserEditarDTO2 = Omit<Usuario, 'usr_url_link'| 'city' | 'herramientas'| 'usr_herr'| 'herr_ver'| 'herr_exp'> & { usr_rol: string };
export type UserSesionDTO = Omit<Usuario, 'usr_pass' |'usr_url_link'|'pais_nom'| 'pais'|'usr_direcc' |'herramientas'| 'usr_herr'| 'herr_ver'| 'herr_exp'>;
