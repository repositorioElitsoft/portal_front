import { ProductVersion } from "./version-producto";
export interface Herramientas {
    id?: number;
    yearsOfExperience: number;
    productVersion: ProductVersion;
    user?: number;
    certification?: number;
    level?: number;
}
