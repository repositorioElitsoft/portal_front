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
  