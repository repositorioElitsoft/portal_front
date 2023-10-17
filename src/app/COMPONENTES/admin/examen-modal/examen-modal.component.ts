import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/interface/categoria.interface';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ExamenService } from 'src/app/service/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examen-modal',
  templateUrl: './examen-modal.component.html',
  styleUrls: ['./examen-modal.component.css']
})
export class ExamenModalComponent implements OnInit {
  examenForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    public dialogRef: MatDialogRef<ExamenModalComponent>,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private examenService: ExamenService
  ) {
    this.examenForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      puntosMaximos: ['', Validators.required],
      numeroDePreguntas: ['', Validators.required],
      categoria: this.formBuilder.group({
        categoriaId: ['', Validators.required]
      }),
      preguntas: this.formBuilder.array([])
    });

    this.preguntas.valueChanges.subscribe((preguntas) => {
      this.examenForm.get('numeroDePreguntas')?.setValue(preguntas.length, { emitEvent: false });
    });

    this.getCategories();
  }

  ngOnInit(): void {}

  saveExamen(){
    if (this.examenForm.valid) {
      console.log('Esto estamos mandando', this.examenForm.value);
      this.examenService.agregarExamen(this.examenForm.value).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Examen guardado','El examen ha sido guardado con éxito','success');
          this.dialogRef.close(this.examenForm.value);
        },
        (error) => {
          console.log('Error al aguardar examen', error);
        }
      );
    }
    else{
      console.log('Formulario invalido');
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  getCategories() {
    this.categoriaService.listarCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
      },
      (error) => {
        console.log('Error al obtener categorías:', error);
      }
    );
  }

  addPregunta() {
    const pregunta = this.formBuilder.group({
      contenido: ['', Validators.required],
      opcion1: ['', Validators.required],
      opcion2: ['', Validators.required],
      opcion3: ['', Validators.required],
      opcion4: ['', Validators.required],
      respuesta: ['', Validators.required],
    });

    this.preguntas.push(pregunta);
  }

  get preguntas() {
    return this.examenForm.get('preguntas') as FormArray;
  }
}
