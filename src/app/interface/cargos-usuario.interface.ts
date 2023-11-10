import { CargosElitsoft } from "./cargos-elitsoft.interface";

export interface CargoUsuario{
    crg_usr_id: number,
    crg_usr_pret:number,
    crg_prf: string,
    cargoElitsoft: CargosElitsoft;
}