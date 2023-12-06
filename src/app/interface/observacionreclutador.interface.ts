import { Usuario } from "./user.interface";

// observacionreclutador.interface.ts
export interface Observacion {
  obs_id: number;           // Long en Java se mapea a number en TypeScript
  obs_desc: string;
  obs_fec_cre: Date;        // Date en Java se mapea a Date en TypeScript
  obs_fec_mod: Date;
  apr_oper: string;
  apr_tec: string;
  apr_ger: string;
  usr_id_obs: number;
  usr_id_obs_mod: number;
  }


  export interface ObservacionDTO{
     usr2_email: String ;
     usr2_ap_pat: String
     usr2_nom: String ;
     usr2_id: number;

     obs_id: number;

    apr_ger:String;
    apr_oper: String;
    apr_tec:String;
    obs_desc:String;
    obs_fec_cre:Date;
    obs_fec_mod:Date;
    usr1_id: number;
    usr_id_obs:number;    // ID del Usuario que hizo la observación
    usr_id_obs_mod: number ;   // ID del Usuario que modificó la observación

    // Campos de la entidad Usuario
    usr_id: number;
    usr_nom:String;
    usr_ap_pat:String;
    usr_email:String;

  }

  export interface CatObservacionDTO{

     usr2_email: String ;
     usr2_ap_pat: String
     usr2_nom: String ;
     usr2_id: number;

     cat_obs_id:number;
     cat_obs_desc:string;

     obs_id: number;

    apr_ger:String;
    apr_oper: String;
    apr_tec:String;
    obs_desc:String;
    obs_fec_cre:Date;
    obs_fec_mod:Date;
    usr1_id: number;
    usr_id_obs:number;    // ID del Usuario que hizo la observación
    usr_id_obs_mod: number ;   // ID del Usuario que modificó la observación

    // Campos de la entidad Usuario
    usr_id: number;
    usr_nom:String;
    usr_ap_pat:String;
    usr_email:String;


  }
