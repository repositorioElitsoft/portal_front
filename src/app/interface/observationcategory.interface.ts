import { Observation } from "./observation.interface";

export interface ObservationCategory {
  id: number;
  cat_description: string;
  observation: Observation[];
}



