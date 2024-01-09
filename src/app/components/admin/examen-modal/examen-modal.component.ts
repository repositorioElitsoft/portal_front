import { Component, Inject, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCategory } from 'src/app/interface/categoria-prod.interface';
import { Categoria } from 'src/app/interface/categoria.interface';
import { Product } from 'src/app/interface/producto.interface';
import { CategoriaService } from 'src/app/service/categoria.service';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { ProductoService } from 'src/app/service/producto.service';
import Swal from 'sweetalert2';
// Este componente agrega los examenes en el  el módulo : view-examenes
@Component({
  selector: 'app-examen-modal',
  templateUrl: './examen-modal.component.html',
  styleUrls: ['./examen-modal.component.css']
})
export class ExamenModalComponent implements OnInit {
  examenForm: FormGroup;
  categorias: Categoria[] = [];
  productosDisponibles: Product[] = [];
  @Output() examenActualizado: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ExamenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public examen: any,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private productService:ProductoService,
    private snackBar: MatSnackBar,
    private preguntaService: PreguntaService,
    private productoService: ProductoService
  ) {
    this.examenForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      puntosMaximos: ['', Validators.required],
      numeroDePreguntas: ['', Validators.required],
      categoria: this.formBuilder.group({
        categoriaId: ['', Validators.required]
      }),
      preguntas: this.formBuilder.array([]),
      productos: this.formBuilder.array([]),
      nivelDificultad: ['', Validators.required],
    });
    this.productos.push(this.formBuilder.group({
      prd_id: ['',Validators.required]}));
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
    this.examenForm.valueChanges.subscribe(a=>{
      console.log("form value:", this.examenForm.value)
    })
    this.getCategories();
    this.getProductos();
  }
  ngOnInit(): void {}
  saveExamen(){
    if (this.examenForm.valid) {
      if (this.examen) {
        console.log('Esto estamos mandando', this.examenForm.value)
        let examen = this.examenForm.value;
        examen["examenId"] = this.examen.examenId
        this.productService.actualizarExamen(examen, this.examen.examenId).subscribe(
          (data) => {
            console.log('response', data);
            this.snackBar.open('Examen actualizado', 'OK', { duration: 3000 }); 
          },
          (error) => {
            console.log('Error al actualizar el examen', error);
            this.snackBar.open('Error al actualizar el examen', 'OK', { duration: 3000 });
          }
        );
      }
      else {
        console.log('Esto estamos mandando para guardar', this.examenForm.value);
        this.productService.agregarExamen(this.examenForm.value).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Examen guardado','El examen ha sido guardado con éxito','success');
            this.dialogRef.close(this.examenForm.value);
            this.examenActualizado.emit();
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
    const preguntaId = this.preguntas.value[index].preguntaId;
    if (preguntaId) {
      this.preguntaService.eliminarPregunta(preguntaId).subscribe(
        (data) => {
          this.preguntas.removeAt(index);
          console.log('Pregunta eliminada', preguntaId);
        },
        (error) => {
          console.log('Error al eliminar la pregunta', error);
        }
      )
    } else {
      this.preguntas.removeAt(index);
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
  // Solucionar esta linea //
  getProductos() {
    this.productoService.obtenerTodosLosProductos().subscribe({
      next: (data?) => {
        if (data) {
          this.productosDisponibles = data.slice().sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        } else {
        }
      },
      error: (err) => {
        console.log("Error al obtener productos", err)
      }
    })
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
  get productos() {
    return this.examenForm.get('productos') as FormArray;
  }
  get preguntas() {
    return this.examenForm.get('preguntas') as FormArray;
  }
}
