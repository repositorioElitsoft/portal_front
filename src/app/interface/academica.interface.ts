import { ReferenciaAcademica } from "./referencia-academica.interface";

export interface Academica {
  id: number;
  inf_acad_id?: number,
  titl: string,
  inf_acad_nom_esc: string,
  inf_acad_fec_ini: Date,
  inf_acad_fec_fin: Date,
  inf_acad_est: string,
  usr_id?: number,
  referenciaAcademicas?: ReferenciaAcademica[]
}
