
import { HerramientaData } from "./herramienta-data.interface";
import { EmploymentReferences } from "./employmentReferences.interface";
export interface Employment{
    id?:number,
    position:string,
    company:string,
    activities:string,
    startDate:Date,
    endDate:Date,
    user?:number,
    herramientas?: HerramientaData[];
    employmentReferences?: EmploymentReferences[];
}