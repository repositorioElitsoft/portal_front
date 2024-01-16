import { ObservationUpdate } from "./observation-uptdate.interface";
import { UserJob } from "./user-job.interface";

export interface Observation {
  obs_id: number;
  description: string;
  userJob: UserJob; 
  updates: ObservationUpdate[]; 
}
  export interface ObservacionDTO{
     usr2_email: String ;
     usr2_ap_pat: String
     usr2_nom: String ;
     usr2_id: number;
     obs_id: number;
    apr_ger:String;
    operationalApproval: String;
    technicalApproval:String;
    description:String;
    creationDate:Date;
    modificationDate:Date;
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
     id:number;
     cat_description:string;
     obs_id: number;
    apr_ger:String;
    operationalApproval: String;
    technicalApproval:String;
    description:String;
    creationDate:Date;
    modificationDate:Date;
    usr1_id: number;
    usr_id_obs:number; 
    usr_id_obs_mod: number ;
    name:String;
    firstLastname:String;
    email:String;
  }

