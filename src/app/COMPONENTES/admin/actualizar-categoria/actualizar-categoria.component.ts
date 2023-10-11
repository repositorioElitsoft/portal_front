import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-categoria',
  templateUrl: './actualizar-categoria.component.html',
  styleUrls: ['./actualizar-categoria.component.css']
})
export class ActualizarCategoriaComponent implements OnInit {
  categoria: any = {
    cat_exam_id: '',
    cat_exam_titl: '',
    cat_exam_desc: ''
  };

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cat_exam_id = this.route.snapshot.paramMap.get('cat_exam_id');
    /*
    this.categoriaService.obtenerCategoriaPorId(cat_exam_id).subscribe(
      (data: any) => {
        this.categoria = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar la categoría', 'error');
      }
    );
    */
  }/*

  actualizarCategoria() {
    this.categoriaService.actualizarCategoria(this.categoria).subscribe(
      (data) => {
        Swal.fire('Categoría actualizada', 'La categoría ha sido actualizada con éxito', 'success');
        this.router.navigate(['/admin/view-categorias']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al actualizar la categoría', 'error');
      }
    );
  }

  cancelar() {
    // Redirige al usuario a la lista de exámenes
    this.router.navigate(['/admin/view-categorias']);
  }
  */
}

