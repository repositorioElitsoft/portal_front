import { Level } from "./niveles.interface";
import { CreateProductDTO, Product } from "./producto.interface";
import { User } from "./user.interface";
export interface Result {
  name?: string;
  id?: number;
  createdAt?: Date;
  score:number;
  time:number;
  user?:User;
  product:CreateProductDTO;
  level:Level;
  
}
