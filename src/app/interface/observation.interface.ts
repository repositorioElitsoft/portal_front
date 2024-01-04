import { ObservationCategory } from "./observationcategory.interface";
import { User } from "./user.interface";
export interface Observation {
  obs_id: number;
  description: string;
  creationDate: Date;
  modificationDate: Date;
  operationalApproval: string;
  technicalApproval: string;
  managementApproval: string;
  user: User;
  usr_id_obs: number;
  usr_id_obs_mod: number;
  observationCategory: ObservationCategory;
}
