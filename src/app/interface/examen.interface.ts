import { CategoriaExamen } from "./categoria-examen.interface";
import { Pregunta } from "./pregunta.interface";

export interface Examen {
    examenId: number,
    titulo: string,
    descripcion: string,
    puntosMaximos: number,
    categoria: CategoriaExamen,
    preguntas: Pregunta[]
}