import { Observation } from "./observacion.interface";

export interface ObservationCategory {
  id: number;
  cat_obs_desc: string;
  observation: Observation[];
}



