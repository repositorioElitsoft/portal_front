
import { Certification } from "./certificacion.interface";
import { Employment } from "./employment.interface";
import { Level } from "./niveles.interface";
import { CreateProductDTO } from "./producto.interface";
import { User } from "./user.interface";
import { CreateProductVersionDTO, ProductVersion } from "./version-producto";

export interface Herramientas {
    id?: number;
    yearsOfExperience: number;
    productVersion: ProductVersion;
    user: User;
    certifications?: Certification[];
    level?: Level;
    employments: Employment;
}
    




export type CreateToolDTO = Omit<Herramientas, 'employments'| 'certification' | 'user'| 'productVersion'  > 
    & { product: CreateProductDTO, version: CreateProductVersionDTO, categoryId: number };

export type ToolDTO = Omit<Herramientas, 'user' | 'id' >  & { id: number};
export type OnlyIdToolDTO = Omit<Herramientas, 'user' | 'id' | 'yearsOfExperience' | 'employments'| 'productVersion'>  & { id: number};