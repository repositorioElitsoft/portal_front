import { Observation } from "./observation.interface";

export interface ObservationUpdate {
    obs_upd_id: number;
    obs_usr_upd_id: number;
    obs_upd_new_desc: string;
    obs_updated_at: Date;
    observation: Observation; 
  }
  