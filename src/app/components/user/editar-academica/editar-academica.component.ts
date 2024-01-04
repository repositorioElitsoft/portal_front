import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { AcademicaService } from 'src/app/service/academica.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Academical } from 'src/app/interface/academical.interface';
import { AcademicalReference } from 'src/app/interface/referencia-academica.interface';
@Component({
  selector: 'app-informacion-academica',
  templateUrl: './editar-academica.component.html',
  styleUrls: ['./editar-academica.component.css']
})
export class EditarAcademicaComponent implements OnInit {
  [x: string]: any;
  @Output() EditarAcademicaComponent: EventEmitter<void> = new EventEmitter<void>();
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
    this.form.patchValue(this.data);
    this.acadId= this.data && this.data.acadId ? this.data.acadId : null;
    this.crearReferenciasForm(this.data.academicalReference);
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
  
    if (this.form.valid && this.acadId !== null) {
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
      this.academicaService
      .guardarAcademica(academicaNueva, this.acadId)
      .subscribe(
        (academicaGuardada: Academical) => {
          this.creationMode = false;
          this.academicaService
            .obtenerListaAcademicasPorUsuario()
            .subscribe({
              next: (data) => {
                this.academicas = data;
                this.EditarAcademicaComponent.emit();
                this.dialog.closeAll();
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        (error) => {
          console.error('Error al actualizar información académica:', error);
        }
      );
    } else {
      if (this.acadId === null) {
        console.error('El ID es nulo o no está definido.');
      }
    }
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