import { ProductVersion} from "./version-producto";
export interface HerramientaData {
    herr_usr_id: number;
    herr_usr_anos_exp: string;
    herr_prd_otro:string;
    versionProducto: ProductVersion;
    herr_is_cert: boolean;
    herr_nvl: string;
}
