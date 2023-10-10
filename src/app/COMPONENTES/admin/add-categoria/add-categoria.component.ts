import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/SERVICE/categoria.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {
  

  categoria = {
    cat_exam_titl : '',  //titulo
    cat_exam_desc : ''   //descripción
  }

  
  constructor(private categoriaService:CategoriaService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.categoria.cat_exam_titl.trim() == '' || this.categoria.cat_exam_titl == null){
      alert('El título es requerido');
      return;
    }

    this.categoriaService.agregarCategoria(this.categoria).subscribe(
      (dato:any) => {
        this.categoria.cat_exam_titl = '';
        this.categoria.cat_exam_desc = '';
        Swal.fire('Categoría agregada','La categoría ha sido agregada con éxito','success');
        this.router.navigate(['/admin/categorias']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar la categoría','error')
      }
    )
  }

  cancelar() {
    // Redirige al usuario a la lista de exámenes
    this.router.navigate(['/admin/view-categorias']);
  }
}
