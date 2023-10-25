import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/interface/categoria.interface';
import { Examen } from 'src/app/interface/examen.interface';
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
    @Inject(MAT_DIALOG_DATA) public examen: any,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private examenService: ExamenService,
    private snackBar: MatSnackBar
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
    
    if (examen) {
      this.examenForm.patchValue(examen)
      examen.preguntas.forEach((pregunta: any) => {
        const preguntasForm = this.formBuilder.group({
          preguntaId: [pregunta.preguntaId, Validators.required],
          contenido: [pregunta.contenido, Validators.required],
          opcion1: [pregunta.opcion1, Validators.required],
          opcion2: [pregunta.opcion2, Validators.required],
          opcion3: [pregunta.opcion3, Validators.required],
          opcion4: [pregunta.opcion4, Validators.required],
          respuesta: [pregunta.respuesta, Validators.required],
        });
        this.preguntas.push(preguntasForm);
      });
    }

    this.preguntas.valueChanges.subscribe((preguntas) => {
      this.examenForm.get('numeroDePreguntas')?.setValue(preguntas.length, { emitEvent: false });
    });

    this.getCategories();
  }

  ngOnInit(): void {}

  saveExamen(){
    if (this.examenForm.valid) {
      if (this.examen) {



        console.log('Esto estamos mandando  para actualizar', this.examenForm.value)

        let examen = this.examenForm.value;
        examen["examenId"] = this.examen.examenId

        this.examenService.actualizarExamen(examen, this.examen.examenId).subscribe(
          (data) => {
            console.log('response', data);
            this.snackBar.open('Examen actualizado', 'OK', { duration: 3000 });
          },
          (error) => {
            console.log('response error:', error);
            this.snackBar.open('Error al actualizar el examen', 'OK', { duration: 3000 });
          }
        )
      }
      else {
        console.log('Esto estamos mandando para guardar', this.examenForm.value);
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
    }
    else{
      console.log('Formulario invalido');
    }
  }

  deletePregunta(index: number) {
    this.preguntas.removeAt(index);
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
