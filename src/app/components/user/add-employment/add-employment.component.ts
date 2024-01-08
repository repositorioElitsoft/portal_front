import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboralService } from 'src/app/service/laboral.service';
import { Employment } from 'src/app/interface/employment.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { EmploymentReferences } from 'src/app/interface/employmentReferences.interface';
import { ToolDTO } from 'src/app/interface/herramientas.interface';
@Component({
  selector: 'app-add-employment',
  templateUrl: './add-employment.component.html',
  styleUrls: ['./add-employment.component.css']
})
export class  EditLaboralComponent implements OnInit {
  [x: string]: any;
  @Output()  EditLaboralComponent: EventEmitter<void> = new EventEmitter<void>();
  creationMode= false;  
  employment: Employment[] = [];
  id: number | null | undefined = null;
  today;
  form!: FormGroup;
  checkboxFormCreated = false;
  herramientasDisponibles!: ToolDTO[];
  herrIdList: number[] = [];
  navigateToRoute: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private herramientaService:HerramientasService,
    private laboralService: LaboralService,
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos pasados al diálogo
    ) {
    this.today = new Date().toISOString().split('T')[0];
    this.buildForm();
  }
  ngOnInit(): void {
    console.log('Datos iniciales:', this.data);
  
    this.form.patchValue(this.data || {});
  
    this.id = this.data && this.data.id ? this.data.id : null;
    console.log('Valor asignado a this.id:', this.id);
  
    this.creationMode = this.id === null;
    console.log('Modo de creación:', this.creationMode);
  
    const employmentReferences = Array.isArray(this.data?.employmentReferences) ? this.data.employmentReferences : [];
    console.log('Referencias de empleo inicializadas con:', employmentReferences);
  
    this.crearReferenciasForm(employmentReferences);
  
    this.generateHerrForm();
  
    console.log('Herramientas disponibles en ngOnInit:', this.herramientasDisponibles);
  }
  


  private buildForm() {
    this.form = this.formBuilder.group({
      position: ["", [Validators.required]],
      company: ["", [Validators.required]],
      activities: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
       employmentReferences: this.formBuilder.array([])
    });
    this.generateHerrForm();
  }
  crearReferenciasForm(data: EmploymentReferences[]) {
    if (!Array.isArray(data)) {
      data = [];
    }
  
    const rowArray = data.map((employment, index) => {
      return this.formBuilder.group({
        id: [employment.id],
        name: [employment.name],
        company: [employment.company],
        email: [employment.email],
        phone: [employment.phone]
      });
    });
  
    this.form.setControl('employmentReferences', this.formBuilder.array(rowArray));
  }
  obtenerLaboralesGuardados(id: number) {
    this.laboralService.obtenerLaboralPorId(id).subscribe({
      next: (data:Employment) => {
        this.form.patchValue(data);
        console.log('Esta es la data del metodo', data)
        this.checkBoxMarcado(data);
      },
      error: (err) => console.log(err)
    });
  }
  checkBoxMarcado(employment : Employment){
    console.log(employment, 'esta es la laboral')
    employment.herramientas?.forEach(h => {
      this.form.get(h.id.toString())?.patchValue(true)
      if(h.herr_prd_otro)
        this.form.get(h.herr_prd_otro.toString())?.patchValue(true)
    })
  }
  goBack() {
    this.form.reset();
    this.dialog.closeAll();
  }
  generateHerrForm() {
    this.herramientaService.getCurrentUserTools().subscribe({
      next: (data: ToolDTO[]) => {
        this.herramientasDisponibles = data;
        this.herramientasDisponibles.forEach((herramienta) => {
          const wasCheckedAlready = this.herrIdList.includes(herramienta.id);
          const newControl = new FormControl(wasCheckedAlready);
         
          this.form.addControl(herramienta.id.toString(), newControl);
         
          this.herrIdList.push(herramienta.id);
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
    if (this.form.valid) {
      const fechaInicioFormateada = new Date(this.form.value.startDate).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(this.form.value.endDate).toISOString().split('T')[0];
      const referenciasFormArray = this.form.get('employmentReferences') as FormArray;
      const referencias = referenciasFormArray.getRawValue();
      
      // Obtener el estado de los checkboxes
      const herramientasSeleccionadas: number[] = [];
      this.herramientasDisponibles.forEach(herramienta => {
        const isChecked = this.form.get(herramienta.id.toString())?.value;
        if (isChecked) {
          herramientasSeleccionadas.push(herramienta.id);
        }
      });
  
      console.log('Estos son los checkboxes a guardar:', herramientasSeleccionadas);
  
      const laboral = {
        ...this.form.value,
        startDate: fechaInicioFormateada,
        endDate: fechaFinFormateada,
        employmentReferences: referencias,
        herramientas: herramientasSeleccionadas  // Guardar las herramientas seleccionadas
      };
  
      const idParaGuardar = this.creationMode ? null : this.id;
  
      this.laboralService.guardarLaboral(laboral, idParaGuardar).subscribe({
        next: (response) => {
          this.actualizarListaLaboral();
        },
        error: (error) => {
          console.error(`Error al ${this.creationMode ? 'crear' : 'actualizar'} información laboral:`, error);
        }
      });
    } else {
      console.error('El formulario no es válido.');
    }
  }
  
  
  actualizarListaLaboral() {
    this.laboralService.obtenerListaLaboralPorUsuario().subscribe({
      next: (data) => {
        this.employment = data;
        this.EditLaboralComponent.emit(); // Notifica a otros componentes del cambio
        this.dialog.closeAll(); // Cierra el diálogo después de la actualización
      },
      error: (err) => {
        console.error('Error al obtener la lista laboral por usuario:', err);
      }
    });
  }
  
  get referenciasFormArray() {
    return this.form.get('employmentReferences') as FormArray;
  }
  addReferencia() {
    const referenciaFormGroup = this.formBuilder.group({
      name: [''],
      company: [''],
      email: [''],
      phone: [''],
    });
    this.referenciasFormArray.push(referenciaFormGroup);
  }
  eliminarReferencia(index: number) {
    this.referenciasFormArray.removeAt(index);
  }
  eliminarLaboral(id: number | undefined | null){
    this.laboralService.eliminarLaboral(id).subscribe({
      next:(res)=>{
        this.obtenerLaboralesGuardados(this.id ?? 0);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}