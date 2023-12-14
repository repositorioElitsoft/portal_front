import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicaService } from 'src/app/service/academica.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Academica } from 'src/app/interface/academica.interface';
import { ReferenciaLaboral } from 'src/app/interface/referenciaLaboral.interface';
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
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    console.log('esta es la data del hijo ', this.data)
    this.form.patchValue(this.data);
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
        ref_acad_nom: [academica.ref_acad_nom], // Suponiendo que 'nombre' es una propiedad del objeto 'academica'
        ref_acad_ins: [academica.ref_acad_ins], // Suponiendo que 'institucion' es una propiedad del objeto 'academica'
        ref_acad_email: [academica.ref_acad_email], // Suponiendo que 'email' es una propiedad del objeto 'academica'
        ref_acad_tel: [academica.ref_acad_tel] // Suponiendo que 'telefono' es una propiedad del objeto 'academica'
      });
    });
    this.form.setControl('referenciaAcademicas', this.formBuilder.array(rowArray))
  }
  


  submitForm(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      // Formatear las fechas antes de enviar al servidor
      const fechaInicioFormateada = new Date(
        this.form.value.inf_acad_fec_ini
      ).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(
        this.form.value.inf_acad_fec_fin
      ).toISOString().split('T')[0];

      const academicaNueva: Academica = {
        ...this.form.value,
        inf_acad_fec_ini: fechaInicioFormateada,
        inf_acad_fec_fin: fechaFinFormateada,
      };

      this.academicaService
        .guardarAcademica(academicaNueva, this.id)
        .subscribe(
          (academicaGuardada: Academica) => {
            console.log('Información académica guardada:', academicaGuardada);
            this.creationMode = false;
            this.academicaService
              .obtenerListaAcademicasPorUsuario()
              .subscribe({
                next: (data) => {
                  this.academicas = data;
                  // Cierra el diálogo después de guardar los cambios
                  this.EditarAcademicaComponent.emit();
                  this.dialog.closeAll();
                },
                error: (err) => {
                  console.log(err);
                },
              });
          },
          (error) => {
            console.error('Error al guardar información académica:', error);
            console.log('Error detallado:', error);
          }
        );
    } else {
      // Muestra un mensaje de error o realiza alguna otra acción si el formulario no está completo.
      console.log('Por favor, complete todas las casillas del formulario.');

      // Agregar un registro de los errores en el formulario
      console.log('Errores en el formulario:', this.form.errors);

      // Agregar un registro del estado del formulario
      console.log('Estado del formulario:', this.form.value);
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
