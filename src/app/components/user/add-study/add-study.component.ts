import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicaService } from 'src/app/service/academica.service';
import { UserService } from 'src/app/service/user.service';
import { Academical } from 'src/app/interface/academical.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcademicalReference } from 'src/app/interface/referencia-academica.interface';
@Component({
  selector: 'app-add-study',
  templateUrl: './add-study.component.html',
  styleUrls: ['./add-study.component.css'],
})
export class AddStudyComponent implements OnInit {
  [x: string]: any;
  @Output() AddStudyComponent: EventEmitter<void> = new EventEmitter<void>();
  form!: FormGroup;
  minFecha: string = new Date().toISOString().split('T')[0];
  authService: any;
  creationMode= false;
  acadId: number | null | undefined = null;
  academicas: Academical[] = [];
  navigateToRoute: any;
  redirectTo() {
    this.navigateToRoute('/user/informacion-laboral');
  }
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private academicaService: AcademicaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
  }
 ngOnInit(): void {
  this.form.patchValue(this.data || {});
  this.acadId = this.data && this.data.acadId ? this.data.acadId : null;
  this.creationMode = this.acadId === null;
  this.crearReferenciasForm(this.data ? this.data.academicalReference : []);
}

  private buildForm() {
    this.form = this.formBuilder.group({
      status: ['', Validators.required],
      degree: ['', Validators.required],
      university: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      academicalReference: this.formBuilder.array([])
    });
  }
  goBack() {
    this.dialog.closeAll();
  }
  crearReferenciasForm(data: AcademicalReference[]) {
    const rowArray = data.map((academica, index) => {
      return this.formBuilder.group({
        id: [academica.id], 
        name: [academica.name], 
        institution: [academica.institution],
        email: [academica.email], 
        phone: [academica.phone] 
      });
    });
    this.form.setControl('academicalReference', this.formBuilder.array(rowArray))
  }
  submitForm(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const fechaInicioFormateada = new Date(this.form.value.startDate).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(this.form.value.endDate).toISOString().split('T')[0];
      const referenciasFormArray = this.form.get('academicalReference') as FormArray;
      const referencias = referenciasFormArray.getRawValue();
      const academicaNueva: Academical = {
        ...this.form.value,
        startDate: fechaInicioFormateada,
        endDate: fechaFinFormateada,
        academicalReference: referencias
      };
  
      if (this.acadId === null) {
        // Crear una nueva academia
        this.academicaService.guardarAcademica(academicaNueva, this.acadId).subscribe(
          (respuesta) => {
            // Manejo de la respuesta al crear
            this.postSubmit();
          },
          (error) => {
            console.error('Error al crear información académica:', error);
          }
        );
      } else {
        // Actualizar una academia existente
        this.academicaService.guardarAcademica(academicaNueva, this.acadId).subscribe(
          (respuesta) => {
            // Manejo de la respuesta al actualizar
            this.postSubmit();
          },
          (error) => {
            console.error('Error al actualizar información académica:', error);
          }
        );
      }
    } else {
      console.error('El formulario no es válido o el ID es nulo.');
    }
  }

  postSubmit() {
    this.academicaService.obtenerListaAcademicasPorUsuario().subscribe({
      next: (data) => {
        this.academicas = data;
        this.AddStudyComponent.emit();
        this.dialog.closeAll();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



  get referenciaFormArray(){
    return this.form.get('academicalReference') as FormArray;
  }
  addReferencia() {
    const referenciaFormGroup = this.formBuilder.group({
      name: [''],
      institution: [''],
      email: [''],
      phone: ['']
    });
    this.referenciaFormArray.push(referenciaFormGroup);
  }
  eliminarReferencia(index: number) {
    this.referenciaFormArray.removeAt(index);
  }
}