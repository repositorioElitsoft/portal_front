import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {CategoriaExamenCreateDTO } from 'src/app/interface/categoria-examen.interface';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ViewCategoriasComponent } from '../view-categorias/view-categorias.component';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
// Este componente agrega nuevas categorías al componente view-categoria en el perfil administrador
export class AddCategoriaComponent implements OnInit {
  form!: FormGroup
  categoriaId:number | null = null
  categoria: CategoriaExamenCreateDTO = {
    titulo : '',
    descripcion : ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewCategoriasComponent>
  ) {
    this.buildForm();
    // Asignar el categoriaId a partir de los datos del diálogo
    if (this.data && this.data.categoriaId) {
      this.categoriaId = this.data.categoriaId;
    }
  }
  ngOnInit(): void {
    // Utilizar el categoriaId para cargar la categoría si existe
    if (this.categoriaId) {
      this.categoriaService.getCategoria(this.categoriaId).subscribe({
        next: (data) => {
          this.form.patchValue(data);
        },
        error: (err) => {
          this._snackBar.open("Error al cargar categoría existente", "Cerrar", {
            duration: 3000
          });
        }
      });
    }
  }
  buildForm(){
    this.form = this.formBuilder.group({
      titulo: ["",[Validators.required]],
      descripcion: ["",[Validators.required]]
    })
  }

  formSubmit() {
    this.categoria = this.form.value;
  
    if (this.categoria.titulo.trim() === '' || this.categoria.titulo == null) {
      return;
    }
  
    if (this.categoriaId) {
      this.categoriaService.actualizarCategoria(this.categoria, this.categoriaId).subscribe({
        next: (dato: any) => {
          this._snackBar.open("Categoría actualizada con éxito", "Cerrar", {
            duration: 3000
          });
          this.cancelar(); // Cierra el diálogo después de actualizar
        },
        error: (error) => {
          this._snackBar.open("Error al actualizar categoría", "Cerrar", {
            duration: 3000
          });
        }
      });
      return;
    }
  
    this.categoriaService.agregarCategoria(this.categoria).subscribe({
      next: (dato: any) => {
        Swal.fire('Categoría agregada', 'La categoría ha sido agregada con éxito', 'success');
        this.form.reset();
        this.cancelar();
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al guardar la categoría', 'error');
      }
    });
  }
  cancelar() {
    this.dialogRef.close();
  }
}
  