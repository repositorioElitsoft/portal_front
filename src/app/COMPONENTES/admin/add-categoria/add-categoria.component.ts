import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaExamen, CategoriaExamenCreateDTO } from 'src/app/interface/categoria-examen.interface';
import { CategoriaService } from 'src/app/service/categoria.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {


  form!: FormGroup

  categoria: CategoriaExamenCreateDTO = {
    titulo : '',  //titulo
    descripcion : ''   //descripción
  }


  constructor(
    private formBuilder: FormBuilder,
    private categoriaService:CategoriaService,
    private router:Router) { 

      this.buildForm()
    }

  ngOnInit(): void {
    
  }

  buildForm(){
    this.form = this.formBuilder.group({
      titulo: ["",[Validators.required]],
      descripcion: ["",[Validators.required]]
    })
  }

  formSubmit(){
    this.categoria = this.form.value

    if(this.categoria.titulo.trim() == '' || this.categoria.titulo == null){
      alert('El título es requerido');
      return;
    }

    this.categoriaService.agregarCategoria(this.categoria).subscribe({
      next:(dato:any) => {
        this.categoria.titulo = '';
        this.categoria.descripcion = '';
        Swal.fire('Categoría agregada','La categoría ha sido agregada con éxito','success');
        this.form.reset();
      },
      error:(error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar la categoría','error')
      }
    })
  }

  cancelar() {
    // Redirige al usuario a la lista de exámenes
    this.router.navigate(['/admin/view-categorias']);
  }
}
