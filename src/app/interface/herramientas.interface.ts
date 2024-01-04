import { Certification } from "./certificacion.interface";
import { Employment } from "./employment.interface";
import { Level } from "./niveles.interface";
import { User } from "./user.interface";
import { ProductVersion } from "./version-producto";

export interface Herramientas {
    id?: number;
    yearsOfExperience: number;
    productVersion: ProductVersion;
    user: User;
    certification?: Certification;
    level?: Level;
    employments: Employment;
}
    