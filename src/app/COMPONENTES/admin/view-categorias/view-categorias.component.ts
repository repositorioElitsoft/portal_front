import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit {

  categorias:any = [


  ]

  constructor(private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
              }
    )
  }

  eliminarCategoria(cat_exam_id: number) {
    Swal.fire({
        title: 'Eliminar categoría',
        text: '¿Estás seguro de eliminar la categoría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          /* TODO
            this.categoriaService.eliminarCategoria(cat_exam_id).subscribe(
                () => {
                    this.categorias = this.categorias.filter((categoria: any) => categoria.cat_exam_id !== cat_exam_id);
                    Swal.fire('Categoría eliminada', 'La categoría ha sido eliminada exitosamente', 'success');
                },
                (error) => {
                    Swal.fire('Error', 'Error al eliminar la categoría', 'error');
                }
            );
            */
        }
    });
}
}


