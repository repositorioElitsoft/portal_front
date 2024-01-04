import { AcademicalReference } from "./referencia-academica.interface";
export interface Academical {

    id?:number,
    degree:string,
    university: string,
    startDate:Date,
    endDate:Date,
    status:string,
    user?:number,
    academicalReference? :AcademicalReference []
}