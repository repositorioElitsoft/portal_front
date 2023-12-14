import { City } from "./city.interface";
import { Country } from "./country.interface";

export interface State {
  id?: number;
  name?: string;
  country?:Country;
}
