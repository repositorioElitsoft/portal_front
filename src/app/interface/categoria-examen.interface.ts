export interface CategoriaExamen{
    categoriaId:number,
    titulo:string,
    descripcion:string
}

export type CategoriaExamenCreateDTO = Omit<CategoriaExamen, 'categoriaId'>;