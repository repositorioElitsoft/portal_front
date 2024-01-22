import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboralService } from 'src/app/service/laboral.service';
import { Employment } from 'src/app/interface/employment.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { EmploymentReferences } from 'src/app/interface/employmentReferences.interface';
import { OnlyIdToolDTO, ToolDTO } from 'src/app/interface/herramientas.interface';
@Component({
  selector: 'app-add-employment',
  templateUrl: './add-employment.component.html',
  styleUrls: ['./add-employment.component.css']
})
export class EditLaboralComponent implements OnInit {
  [x: string]: any;
  @Output() EditLaboralComponent: EventEmitter<void> = new EventEmitter<void>();
  creationMode = false;
  employment: Employment[] = [];
  id: number | null | undefined = null;
  today;
  form!: FormGroup;
  checkboxFormCreated = false;
  herramientasDisponibles!: ToolDTO[];
  navigateToRoute: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private herramientaService: HerramientasService,
    private laboralService: LaboralService,
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos pasados al diálogo
  ) {
    this.today = new Date().toISOString().split('T')[0];
    this.buildForm();
  }
  ngOnInit(): void {
    console.log('Datos iniciales:', this.data);

    this.form.patchValue(this.data || {});

    this.id = this.data && this.data.id ? this.data.id : null; // Cambio en esta línea
    console.log('Valor asignado a this.id:', this.id);

    this.creationMode = this.id === null;
    console.log('Modo de creación:', this.creationMode);

    const employmentReferences = Array.isArray(this.data?.employmentReferences) ? this.data.employmentReferences : [];
    console.log('Referencias de empleo inicializadas con:', employmentReferences);

    this.crearReferenciasForm(employmentReferences);



    console.log('Herramientas disponibles en ngOnInit:', this.herramientasDisponibles);
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      position: ["", [Validators.required]],
      company: ["", [Validators.required]],
      activities: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      employmentReferences: this.formBuilder.array([]),
      tools: this.formBuilder.array([]),
    });
    this.generateToolForm();
  }
  crearReferenciasForm(data: EmploymentReferences[]) {
    // if (!Array.isArray(data)) {
    //   data = [];
    // }

    const rowArray = data.map((employment, index) => {
      return this.formBuilder.group({
        id: [employment.id],
        name: [employment.name, Validators.required],
        company: [employment.company, Validators.required],
        email: [employment.email, [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")]],
        phone: [employment.phone, [Validators.required, Validators.minLength(11)]]
      });
    })

    this.form.setControl('employmentReferences', this.formBuilder.array(rowArray));
  }

  checkToolBoxes() {
    this.getToolsFormArray.forEach(c => {

    })
  }


  goBack() {
    this.form.reset();
    this.dialog.closeAll();
  }
  generateToolForm() {

    const toolIdSet = new Set(this.data?.tools?.map((tool: ToolDTO) => tool.id));
    this.herramientaService.getCurrentUserTools().subscribe({
      next: (data: ToolDTO[]) => {
        this.herramientasDisponibles = data;
        this.herramientasDisponibles.forEach((herramienta) => {
          const newGroup = this.formBuilder.group({
            id: [herramienta.id],
            value: [toolIdSet.has(herramienta.id)]
          });
          (this.form.get("tools") as FormArray).push(newGroup);
        });
        this.checkboxFormCreated = true;
        this.checkToolBoxes();
      },
      error: (err: any) => {
        console.log(err);
      },
    });



  }


  get getToolsFormArray() {
    return (this.form.get('tools') as FormArray).controls;
  }

  redirectTo() {
    this.navigateToRoute('/user/cargo-usuario')
  }
  submitForm(event: Event) {
    event.preventDefault();
    if (this.form.valid) {

      console.log("This is the form value:", this.form.value)
      const fechaInicioFormateada = new Date(this.form.value.startDate).toISOString().split('T')[0];
      const fechaFinFormateada = new Date(this.form.value.endDate).toISOString().split('T')[0];
      const referenciasFormArray = this.form.get('employmentReferences') as FormArray;
      const referencias = referenciasFormArray.getRawValue();

      // Obtener el estado de los checkboxes
      const selectedTools: OnlyIdToolDTO[] = [];


      this.getToolsFormArray.forEach(c => {
        if (c.get("value")!.value) {
          selectedTools.push({ id: c.get("id")!.value })
        }
      })

      console.log('Estos son los checkboxes a guardar:', selectedTools);

      const laboral = {
        ...this.form.value,
        startDate: fechaInicioFormateada,
        endDate: fechaFinFormateada,
        employmentReferences: referencias,
        tools: selectedTools  // Guardar las herramientas seleccionadas
      };
      const idParaGuardar = this.creationMode ? null : this.id;

      console.log("Laboral to save: ", laboral)
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
        this.EditLaboralComponent.emit();
        this.dialog.closeAll();
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
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
    });
    this.referenciasFormArray.push(referenciaFormGroup);
  }
  eliminarReferencia(index: number) {
    this.referenciasFormArray.removeAt(index);
  }

}