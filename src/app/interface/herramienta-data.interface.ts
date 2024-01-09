import { Certification } from "./certificacion.interface";
import { Employment } from "./employment.interface";
import { Level } from "./niveles.interface";
import { ProductVersion} from "./version-producto";
export interface HerramientaData {
    id: number;
    yearsOfExperience: number;
    herr_prd_otro:string;
    productVersion: ProductVersion;
    certification?: Certification;
    level: Level;
    employments: Employment;
}