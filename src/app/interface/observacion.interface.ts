import { CategoriaObservacion } from "./categoriaobservacion.interface";
import { Usuario } from "./user.interface";

export interface Observacion {
  obs_id: number;
  obs_desc: string;
  obs_fec_cre: Date;
  obs_fec_mod: Date;
  apr_oper: string;
  apr_tec: string;
  apr_ger: string;
  usuario: Usuario;
  usr_id_obs: number;
  usr_id_obs_mod: number;
  categoriaObservacion: CategoriaObservacion;
}
