
import { HerramientaData } from "./herramienta-data.interface";
import { ReferenciaLaboral } from "./referenciaLaboral.interface";
export interface Laboral{
    inf_lab_id?:number,
    inf_lab_crg_emp:string,
    inf_lab_emp:string,
    inf_lab_act:string,
    inf_lab_fec_ini:Date,
    inf_lab_fec_fin:Date,
    usr_id?:number,
    herr_usr_id?:number
    herramientas?: HerramientaData[];
    referenciasLaborales?: ReferenciaLaboral[];
}