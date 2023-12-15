import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboralService } from 'src/app/service/laboral.service';
import { Laboral } from 'src/app/interface/laboral.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { ReferenciaLaboral } from 'src/app/interface/referenciaLaboral.interface';

@Component({
  selector: 'app-edit-laboral',
  templateUrl: './edit-laboral.component.html',
  styleUrls: ['./edit-laboral.component.css']
})
export class  EditLaboralComponent implements OnInit {
  [x: string]: any;
  @Output()  EditLaboralComponent: EventEmitter<void> = new EventEmitter<void>();
  creationMode: boolean = false;
  laborales: Laboral[] = [];
  id: number | null | undefined = null;
  today;
  form!: FormGroup;
  checkboxFormCreated = false;
  herramientasDisponibles!: HerramientaData[];
  herrIdList: number[] = [];
  navigateToRoute: any;
  inf_lab_id: number | null | undefined = null;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute, private router: Router,
    private herramientaService:HerramientasService,
    private laboralService: LaboralService,
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos pasados al diálogo
    ) {
    this.today = new Date().toISOString().split('T')[0];
    this.buildForm();
  }



  ngOnInit(): void {
    console.log('esta es la data del hijo ', this.data);
    this.form.patchValue(this.data);

    // Asigna inf_acad_id con el valor proveniente de data, si existe
    this.inf_lab_id = this.data && this.data.inf_lab_id ? this.data.inf_lab_id : null;

    // Registro en la consola para verificar el valor de inf_acad_id
    console.log('inf_acad_id asignado:', this.inf_lab_id);

    this.crearReferenciasForm(this.data.referenciasLaborales);


  }




  private buildForm() {
    this.form = this.formBuilder.group({
      inf_lab_crg_emp: ["", [Validators.required]],
      inf_lab_emp: ["", [Validators.required]],
      inf_lab_act: ["", [Validators.required]],
      inf_lab_fec_ini: ["", [Validators.required]],
      inf_lab_fec_fin: ["", [Validators.required]],
       referenciasLaborales: this.formBuilder.array([])
    });

    this.generateHerrForm();
  }


  crearReferenciasForm(data: ReferenciaLaboral[]) {
    const rowArray = data.map((laboral, index) => {
      return this.formBuilder.group({
        ref_lab_id: [laboral.ref_lab_id], 
        ref_lab_nom: [laboral.ref_lab_nom], // Suponiendo que 'nombre' es una propiedad del objeto 'academica'
        ref_lab_emp: [laboral.ref_lab_emp], // Suponiendo que 'institucion' es una propiedad del objeto 'academica'
        ref_lab_email: [laboral.ref_lab_email], // Suponiendo que 'email' es una propiedad del objeto 'academica'
        ref_lab_tel: [laboral.ref_lab_tel] // Suponiendo que 'telefono' es una propiedad del objeto 'academica'
      });
    });
    this.form.setControl('referenciasLaborales', this.formBuilder.array(rowArray))
  }
  




  obtenerLaboralesGuardados(id: number) {
    this.laboralService.obtenerLaboralPorId(id).subscribe({
      next: (data:Laboral) => {
        this.form.patchValue(data);
        console.log('Esta es la data del metodo', data)
        this.checkBoxMarcado(data);
      },
      error: (err) => console.log(err)
    });
  }

  checkBoxMarcado(laboral : Laboral){
    console.log(laboral, 'esta es la laboral')
    laboral.herramientas?.forEach(h => {
      this.form.get(h.herr_usr_id.toString())?.patchValue(true)
      if(h.herr_prd_otro)
        this.form.get(h.herr_prd_otro.toString())?.patchValue(true)
    })
  }

  goBack() {
    // Restablecer el formulario a su estado inicial
    this.form.reset();

    // Cerrar todas las ventanas de diálogo abiertas
    this.dialog.closeAll();
  }



  generateHerrForm() {
    this.herramientaService.getHerramientasByUserId().subscribe({
      next: (data: HerramientaData[]) => {
        console.log("received data herramientas: ", data);
        this.herramientasDisponibles = data;

        this.herramientasDisponibles.forEach((herramienta) => {
          // Verificar si la herramienta estaba marcada previamente durante el guardado
          const wasCheckedAlready = this.herrIdList.includes(herramienta.herr_usr_id);

          const newControl = new FormControl(wasCheckedAlready);

          if (!herramienta.herr_prd_otro) {
            this.form.addControl(herramienta.herr_usr_id.toString(), newControl);
          } else {
            this.form.addControl(herramienta.herr_prd_otro, newControl);
          }

          this.herrIdList.push(herramienta.herr_usr_id);
        });

        this.checkboxFormCreated = true;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }





  redirectTo(){
    this.navigateToRoute('/user/cargo-usuario')
  }


  submitForm(event: Event) {
    event.preventDefault();
  
    if (this.form.valid && this.inf_lab_id !== null) {
      const fechaInicioFormateada = new Date(this.form.value.inf_lab_fec_ini).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(this.form.value.inf_lab_fec_fin).toISOString().split('T')[0];
  
      // Asegúrate de incluir los datos de las referencias en la actualización
      const referenciasFormArray = this.form.get('referenciasLaborales') as FormArray;
      const referencias = referenciasFormArray.getRawValue(); // Obtiene los valores actuales del FormArray
  
      const laboralNueva: Laboral = {
        ...this.form.value,
        inf_lab_fec_ini: fechaInicioFormateada,
        inf_lab_fec_fin: fechaFinFormateada,
        referenciasLaborales: referencias // Incluye las referencias en el objeto a actualizar
      };
      console.log('Enviando actualización con ID:', this.inf_lab_id);
      console.log('Datos a actualizar:', laboralNueva);

      
      this.laboralService
      .guardarLaboral(laboralNueva, this.inf_lab_id)
      .subscribe(
        (academicaGuardada: Laboral) => {
          console.log('Información académica guardada:', academicaGuardada);
          this.creationMode = false;
          this.laboralService
            .obtenerListaLaboralPorUsuario()
            .subscribe({
              next: (data) => {
                this.laborales = data;
                // Cierra el diálogo después de guardar los cambios
                this.EditLaboralComponent.emit();
                this.dialog.closeAll();
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
        (error) => {
          console.error('Error al actualizar información académica:', error);
          console.log('Error detallado:', error);
        }
      );
    } else {
      if (this.inf_lab_id === null) {
        console.error('El ID es nulo o no está definido.');
      }
      console.log('Por favor, complete todas las casillas del formulario.');
      console.log('Errores en el formulario:', this.form.errors);
      console.log('Estado del formulario:', this.form.value);
    }
  }
  
  





  get referenciasFormArray() {
    return this.form.get('referenciasLaborales') as FormArray;
  }





  addReferencia() {
    const referenciaFormGroup = this.formBuilder.group({
      ref_lab_nom: [''],
      ref_lab_emp: [''],
      ref_lab_email: [''],
      ref_lab_tel: [''],
    });
    this.referenciasFormArray.push(referenciaFormGroup);
  }

  eliminarReferencia(index: number) {
    this.referenciasFormArray.removeAt(index);
  }

  eliminarLaboral(id: number | undefined | null){
    this.laboralService.eliminarLaboral(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.obtenerLaboralesGuardados(this.id ?? 0);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }




  

}
