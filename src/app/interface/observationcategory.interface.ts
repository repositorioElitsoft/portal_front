import { Observation } from "./observacion.interface";

export interface CategoriaObservacion {
  id: number;
  cat_obs_desc: string;
  observation: Observation[];
}



