import { CargosElitsoft } from "./cargos-elitsoft.interface";

export interface CargoUsuario{
    crg_usr_pret:string,
    crg_prf: string,
    cargoElitsoft?: CargosElitsoft;
}