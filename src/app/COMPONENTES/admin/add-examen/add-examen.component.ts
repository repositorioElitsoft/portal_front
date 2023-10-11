import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ExamenService } from 'src/app/service/examen.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {


  categorias:any = [];

  examenData = {
    exam_titl:'',
    exam_desc:'',
    exam_ptos_max:'',
    exam_n_preg:'',
    activo:true,
    categoria:{
      cat_exam_id:''
    }
  }

  constructor(
    private categoriaService:CategoriaService,

    private examenService:ExamenService,
    private router:Router) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },(error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los datos','error');
      }
    )
  }

  guardarCuestionario(){
    console.log(this.examenData);
    if(this.examenData.exam_titl.trim() == '' || this.examenData.exam_titl == null){
      alert('El título es requerido');
      return;
    }



    this.examenService.agregarExamen(this.examenData).subscribe(
      (data) => {
        console.log(data);

        Swal.fire('Examen guardado','El examen ha sido guardado con éxito','success');
        this.examenData = {
         exam_titl:'',
         exam_desc:'',
         exam_ptos_max:'',
         exam_n_preg:'',
         activo:true,
         categoria:{
         cat_exam_id:''
          }
        }
        this.router.navigate(['/admin/view-examenes']);
      },
      (error) => {
        console.log(error)
        Swal.fire('Error','Error al guardar el examen','error');
      }
    )
  }

  cancelar() {
    // Redirige al usuario a la lista de exámenes
    this.router.navigate(['/admin/view-examenes']);
  }

}
