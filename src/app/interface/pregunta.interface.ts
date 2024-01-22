import { Level } from "./niveles.interface";
import { Product } from "./producto.interface";

export interface Pregunta {
    id?: number;
    content: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
    product: Product;
    level: Level;

}

export interface QuestionModalDataDTO {
    question: Pregunta,
    product: Product
}