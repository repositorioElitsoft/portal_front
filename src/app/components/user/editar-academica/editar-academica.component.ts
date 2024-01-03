import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { AcademicaService } from 'src/app/service/academica.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Academica } from 'src/app/interface/academica.interface';
import { ReferenciaAcademica } from 'src/app/interface/referencia-academica.interface';
@Component({
  selector: 'app-informacion-academica',
  templateUrl: './editar-academica.component.html',
  styleUrls: ['./editar-academica.component.css']
})
export class EditarAcademicaComponent implements OnInit {
  [x: string]: any;
  @Output() EditarAcademicaComponent: EventEmitter<void> = new EventEmitter<void>();
  form!: FormGroup;
  id: number | null = null;
  minFecha: string = new Date().toISOString().split('T')[0];
  authService: any;
  creationMode= false;
  inf_acad_id: number | null | undefined = null;
  academicas: Academica[] = [];
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
    this.inf_acad_id = this.data && this.data.inf_acad_id ? this.data.inf_acad_id : null;
    this.crearReferenciasForm(this.data.referenciaAcademicas);
}
  private buildForm() {
    this.form = this.formBuilder.group({
      inf_acad_est: ['', Validators.required],
      titl: ['', Validators.required],
      inf_acad_nom_esc: ['', Validators.required],
      inf_acad_fec_ini: ['', Validators.required],
      inf_acad_fec_fin: ['', Validators.required],
      referenciaAcademicas: this.formBuilder.array([])
    });
  }
  goBack() {
    this.dialog.closeAll();
  }
  crearReferenciasForm(data: ReferenciaAcademica[]) {
    const rowArray = data.map((academica, index) => {
      return this.formBuilder.group({
        ref_acad_id: [academica.ref_acad_id], 
        ref_acad_nom: [academica.ref_acad_nom], 
        ref_acad_ins: [academica.ref_acad_ins],
        ref_acad_email: [academica.ref_acad_email], 
        ref_acad_tel: [academica.ref_acad_tel] 
      });
    });
    this.form.setControl('referenciaAcademicas', this.formBuilder.array(rowArray))
  }
  submitForm(event: Event) {
    event.preventDefault();
  
    if (this.form.valid && this.inf_acad_id !== null) {
      const fechaInicioFormateada = new Date(this.form.value.inf_acad_fec_ini).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(this.form.value.inf_acad_fec_fin).toISOString().split('T')[0];
      const referenciasFormArray = this.form.get('referenciaAcademicas') as FormArray;
      const referencias = referenciasFormArray.getRawValue();
      const academicaNueva: Academica = {
        ...this.form.value,
        inf_acad_fec_ini: fechaInicioFormateada,
        inf_acad_fec_fin: fechaFinFormateada,
        referenciaAcademicas: referencias 
      };      
      this.academicaService
      .guardarAcademica(academicaNueva, this.inf_acad_id)
      .subscribe(
        (academicaGuardada: Academica) => {
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
      if (this.inf_acad_id === null) {
        console.error('El ID es nulo o no está definido.');
      }
    }
  }
  get referenciaFormArray(){
    return this.form.get('referenciaAcademicas') as FormArray;
  }
  addReferencia() {
    const referenciaFormGroup = this.formBuilder.group({
      ref_acad_nom: [''],
      ref_acad_ins: [''],
      ref_acad_email: [''],
      ref_acad_tel: ['']
    });
    this.referenciaFormArray.push(referenciaFormGroup);
  }
  eliminarReferencia(index: number) {
    this.referenciaFormArray.removeAt(index);
  }
}