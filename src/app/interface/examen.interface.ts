import { Pregunta } from "./pregunta.interface";

export interface Examen{
    examen_id: number;
    activo: boolean;
    descripcion: string;
    numero_de_preguntas: number;
    puntos_maximos: number;
    titulo: string;
    categoria_categoria_id: number;
    preguntas: Pregunta[];
}