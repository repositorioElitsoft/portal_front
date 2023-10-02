export interface VersionProducto{
    vrs_id:number,
    vrs_name:string,
    prd_id: {
        prd_id: number;
        prd_nom: string;
        cat_prod_id: {
            cat_prod_id: number;
            cat_prod_nom: string;
        }
    }
}