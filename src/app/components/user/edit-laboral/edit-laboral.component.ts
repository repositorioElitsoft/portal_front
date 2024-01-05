import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboralService } from 'src/app/service/laboral.service';
import { Employment } from 'src/app/interface/employment.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { EmploymentReferences } from 'src/app/interface/employmentReferences.interface';
@Component({
  selector: 'app-edit-laboral',
  templateUrl: './edit-laboral.component.html',
  styleUrls: ['./edit-laboral.component.css']
})
export class  EditLaboralComponent implements OnInit {
  [x: string]: any;
  @Output()  EditLaboralComponent: EventEmitter<void> = new EventEmitter<void>();
  creationMode: boolean = false;
  laborales: Employment[] = [];
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
    this.form.patchValue(this.data);
    this.inf_lab_id = this.data && this.data.inf_lab_id ? this.data.inf_lab_id : null;
    this.crearReferenciasForm(this.data.employmentReferences);
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
    const rowArray = data.map((employment, index) => {
      return this.formBuilder.group({
        id: [employment.id], 
        name: [employment.name], // Suponiendo que 'nombre' es una propiedad del objeto 'academica'
        company: [employment.company], // Suponiendo que 'institucion' es una propiedad del objeto 'academica'
        email: [employment.email], // Suponiendo que 'email' es una propiedad del objeto 'academica'
        phone: [employment.phone] // Suponiendo que 'telefono' es una propiedad del objeto 'academica'
      });
    });
    this.form.setControl('referenciasLaborales', this.formBuilder.array(rowArray))
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
    this.herramientaService.getHerramientasByUserId().subscribe({
      next: (data: HerramientaData[]) => {
        this.herramientasDisponibles = data;
        this.herramientasDisponibles.forEach((herramienta) => {
          const wasCheckedAlready = this.herrIdList.includes(herramienta.id);
          const newControl = new FormControl(wasCheckedAlready);
          if (!herramienta.herr_prd_otro) {
            this.form.addControl(herramienta.id.toString(), newControl);
          } else {
            this.form.addControl(herramienta.herr_prd_otro, newControl);
          }
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
    if (this.form.valid && this.inf_lab_id !== null) {
      const fechaInicioFormateada = new Date(this.form.value.startDate).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(this.form.value.endDate).toISOString().split('T')[0];
      const referenciasFormArray = this.form.get('referenciasLaborales') as FormArray;
      const referencias = referenciasFormArray.getRawValue();
      const laboralNueva: Employment = {
        ...this.form.value,
        startDate: fechaInicioFormateada,
        endDate: fechaFinFormateada,
        referenciasLaborales: referencias // Incluye las referencias en el objeto a actualizar
      };
      this.laboralService
      .guardarLaboral(laboralNueva, this.inf_lab_id)
      .subscribe(
        (academicaGuardada: Employment) => {
          this.creationMode = false;
          this.laboralService
            .obtenerListaLaboralPorUsuario()
            .subscribe({
              next: (data) => {
                this.laborales = data;
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
        }
      );
    } else {
      if (this.inf_lab_id === null) {
        console.error('El ID es nulo o no está definido.');
      }
    }
  }
  get referenciasFormArray() {
    return this.form.get('referenciasLaborales') as FormArray;
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