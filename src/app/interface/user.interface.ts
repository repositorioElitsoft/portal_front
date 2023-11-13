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
    city?: {
      id?: number;
      name?: string;
      state?: {
        id?: number;
        name?: string;
        country?: {
          id?: number;
          name?: string;
        };
      };
    };
    usr_direcc:string;
    herramientas?: HerramientaData[];
    usr_herr: string;
    herr_ver: string;
    herr_exp: string;
    cvPath?: string;
    laborales?: Laboral[];
    observaciones?: Observacion[];
}


export type UserEditarDTO = Omit<Usuario, 'usr_tel' |'usr_url_link'| 'city' | 'herramientas'| 'usr_herr'| 'herr_ver'| 'herr_exp'> & { usr_rol: string };

