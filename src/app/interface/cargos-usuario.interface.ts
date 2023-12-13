import { CargosElitsoft } from "./cargos-elitsoft.interface";

export interface CargoUsuario{
    fecha: string | number | Date;
    usuarioId: any;
    crg_usr_id: Number,
    crg_usr_pret: number,
    crg_prf: String,
    cargoElitsoft?: CargosElitsoft,
    disponibilidad: String,
    tiempo_incorporacion:String,
    otro_tiempo_incorporacion: String;
    fechaPostulacion: Date;
    crg_fecha_postulacion?: Date;
}