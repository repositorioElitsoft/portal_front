export interface Observacion {
  obs_id: number;
  obs_desc: string;
  obs_fec_cre: Date;
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
    usr_id_obs:number;
    usr_id_obs_mod: number;
    id: number;
    name:String;
    firstLastname:String;
    email:String;
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
    usr_id_obs:number; 
    usr_id_obs_mod: number ;
    id: number;
    name:String;
    firstLastname:String;
    email:String;
  }
