import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboralService } from 'src/app/service/laboral.service';
import { Employment } from 'src/app/interface/employment.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HerramientasService } from 'src/app/service/herramientas.service';
@Component({
  selector: 'app-add-employment',
  templateUrl: './add-employment.component.html',
  styleUrls: ['add-employment.component.css']
})
export class AddEmploymentComponent implements OnInit {
  [x: string]: any;
  @Output() AddEmploymentComponent: EventEmitter<void> = new EventEmitter<void>();
  creationMode: boolean = false;
  laborales: Employment[] = [];
  id: number | null | undefined = null;
  today;
  form!: FormGroup;
  checkboxFormCreated = false;
  herramientasDisponibles!: HerramientaData[];
  herrIdList: number[] = [];
  navigateToRoute: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute, private router: Router,
    private herramientaService:HerramientasService,
    private laboralService: LaboralService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) {
    this.today = new Date().toISOString().split('T')[0];
    this.buildForm();
  }
  ngOnInit(): void {
    this.obtenerLaboralesGuardados();
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
  obtenerLaboralesGuardados() {
    this.laboralService. obtenerListaLaboralPorUsuario().subscribe(
      (data) => {
        this.laborales = data; 
      },
      (error) => {
        console.error('Error al obtener la información laboral:', error); 
      }
    );
  }
  eliminarLaboral(id: number | undefined | null){
    this.laboralService.eliminarLaboral(id).subscribe({
      next:(res)=>{
        this.obtenerLaboralesGuardados();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  goBack() {
    this.form.reset();
    this.dialog.closeAll();
  }
  editarLaboral(id: number | undefined | null){
    this.id = id;
    const laboralToEdit = this.laborales.find(employment => employment.id === this.id);
    this.form.patchValue({
      position: laboralToEdit?.position,
      company: laboralToEdit?.company,
      activities: laboralToEdit?.activities,
      startDate: laboralToEdit?.startDate,
      endDate: laboralToEdit?.endDate,
    });
    this.herrIdList.forEach(herrId =>{
      this.form.get(herrId.toString())?.patchValue(false);
    })
    laboralToEdit?.herramientas?.forEach(herr =>{
      if(this.herrIdList.find((herrID) => herrID === herr.id)){
        this.form.get(herr.id.toString())?.patchValue(true);
      }
    })
    this.creationMode = !this.creationMode;
  }
  generateHerrForm(){
    this.herramientaService.getHerramientasByUserId().subscribe({
      next:(data: HerramientaData[])=>{
        this.herramientasDisponibles = data;
        this.herramientasDisponibles.forEach((herramienta)=>{
          let wasCheckedAlready = false
          const newControl = new FormControl(wasCheckedAlready);
          if (!herramienta.herr_prd_otro){
            this.form.addControl(herramienta.id.toString(), newControl);
          }
          else {
            this.form.addControl(herramienta.herr_prd_otro, newControl);
          }
          this.herrIdList.push(herramienta.id)
        })
        this.checkboxFormCreated = true;
      },
      error:(err: any)=>{
        console.log(err)
      }
    })
  }
  redirectTo(){
    this.navigateToRoute('/user/cargo-usuario')
  }
  submitForm(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const laboralNueva: Employment = this.form.value;
      let herramientasFinal: HerramientaData[] = [];
      this.herrIdList.forEach(id => {
        if (this.form.get(id.toString())?.value === true) {
          let herra: HerramientaData = {
            id: id,
            certification: {
              url: ""
            },
            level: {
              description: "" // Asigna un valor por defecto o real, según corresponda
            },
            yearsOfExperience: 0,
            herr_prd_otro: "",
            productVersion: {
              id: 0,
              name: "",
              product: {
                id: 0,
                name: "",
                productCategory: {
                  id: 0,
                  name: ""
                }
              }
            },
            employments: {
              position: "", // Asigna un valor por defecto o real
              company: "", // Asigna un valor por defecto o real
              activities: "", // Asigna un valor por defecto o real
              startDate: new Date(), // Asigna una fecha de inicio
              endDate: new Date(), // Asigna una fecha de fin
            }
          };
          herramientasFinal.push(herra);
        }
      });
      laboralNueva.herramientas = herramientasFinal;
      this.laboralService.guardarLaboral(laboralNueva, this.id).subscribe(
        (laboralGuardada: Employment) => {
          this.creationMode = false; 
          this.laboralService.obtenerListaLaboralPorUsuario().subscribe({
            next:(data) => {
              this.laborales = data;
                this.AddEmploymentComponent.emit();
                this.dialog.closeAll();
            },
            error:(err) => {
              console.error('Error al obtener la lista de experiencias laborales:', err);
            }
          });
        },
        (error) => {
          console.error('Error al guardar la información laboral:', error);
        }
      );
    } else {
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
}
