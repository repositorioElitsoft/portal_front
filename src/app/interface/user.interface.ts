import { Academical } from "./academical.interface"
import { CargoUsuario } from "./cargos-usuario.interface"
import { City } from "./city.interface"
import { Gender } from "./gender.interface"
import { HerramientaData } from "./herramienta-data.interface"
import { Employment } from "./employment.interface"
import { UserCV } from "./user-cv.interface"
import { UserPreferredJob } from "./user-preferred-job-interface"

export interface User {
    id?:number
    rut?:string
    name:string
    firstLastname?:string
    secondLastname?:string
    gender?:Gender
    email:string
    phone?:string
    linkedin?:string
    city?: City
    address:string
    tools?: HerramientaData[]
    jobs?: Employment[]
    academicalList?: Academical[]
    userJob?: CargoUsuario[]
    userPrefferedJob?: UserPreferredJob
    cv?: UserCV

}


export type UserEditarDTO = Omit<User, 'usr_tel' |'usr_url_link'| 'city' | 'herramientas'| 'usr_herr'| 'herr_ver'| 'herr_exp'> & { usr_rol: string };
export type UserEditarDTO2 = Omit<User, 'usr_url_link'| 'city' | 'herramientas'| 'usr_herr'| 'herr_ver'| 'herr_exp'> & { usr_rol: string };

export type UserSesionDTO = Omit<User, 'usr_pass' |'usr_url_link'|'pais_nom'| 'pais'|'usr_direcc' |'herramientas'| 'usr_herr'| 'herr_ver'| 'herr_exp'>;
