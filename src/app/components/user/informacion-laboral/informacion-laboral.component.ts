import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboralService } from 'src/app/service/laboral.service';
import { UserService } from 'src/app/service/user.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { Employment } from 'src/app/interface/employment.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddLaboralComponent } from '../add-laboral/add-laboral.component';
import { EditLaboralComponent } from '../edit-laboral/edit-laboral.component';
import { EmploymentReferences } from 'src/app/interface/employmentReferences.interface';
import { ToolDTO } from 'src/app/interface/herramientas.interface';
@Component({
  selector: 'app-informacion-laboral',
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css']
})
export class InformacionLaboralComponent implements OnInit {
  creationMode: boolean = false;
  laborales: Employment[] = []
  id: number | null | undefined = null
  today;
  form!: FormGroup
  minFecha: string = '';
  checkboxFormCreated = false;
  herramientasDisponibles!: ToolDTO[];
  herrIdList: number[] = [];
  employmentReferences: [] = []
  constructor(
    private formBuilder: FormBuilder,
    public dialog : MatDialog,
    private herramientaService:HerramientasService,
    private laboralService: LaboralService,
    private router: Router) {
      this.today = new Date().toISOString().split('T')[0];
      this.buildForm();
  }
  ngOnInit(): void {
    this.obtenerLaboralesGuardados();
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      position: ["",[Validators.required]],
      company: ["",[Validators.required]],
      activities: ["",[Validators.required]],
      startDate: ["",[Validators.required]],
      endDate: ["",[Validators.required]],
      referenciasLaborales: this.formBuilder.array([])
    });
    this.generateHerrForm()
  }
  get referenciasFormArray() {
    return this.form.get('referenciasLaborales') as FormArray;
  }
  obtenerLaboralesGuardados(){
    this.laboralService.obtenerListaLaboralPorUsuario().subscribe({
      next: (data) =>{
        this.laborales = data;
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
  addReferencia() {
    const referenciaFormGroup = this.formBuilder.group({
      name: [''],
      company: [''],
      email: [''],
      phone: ['']
    });
    this.referenciasFormArray.push(referenciaFormGroup);
  }
  eliminarReferencia(index: number) {
    this.referenciasFormArray.removeAt(index);
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
  goBack(){
    this.creationMode = false;
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
    while (this.referenciasFormArray.length) {
      this.referenciasFormArray.removeAt(0);
    }
    laboralToEdit?.employmentReferences?.forEach(referencia => {
      const referenciaFormGroup = this.formBuilder.group({
        id: referencia.id,
        name: referencia.name,
        company: referencia.company,
        email: referencia.email,
        phone: referencia.phone,
      });
      this.referenciasFormArray.push(referenciaFormGroup);
    });
    this.herrIdList.forEach(herrId =>{
      this.form.get(herrId.toString())?.patchValue(false);
    })
    laboralToEdit?.herramientas?.forEach(herr =>{
      if(this.herrIdList.find((herrID) => herrID === herr.herr_usr_id)){
        this.form.get(herr.herr_usr_id.toString())?.patchValue(true);
      }
    })
    this.creationMode = !this.creationMode;
  }
  generateHerrForm(){
    this.herramientaService.getCurrentUserTools().subscribe({
      next:(data)=>{
        this.herramientasDisponibles = data;
        this.herramientasDisponibles.forEach((herramienta)=>{
          let wasCheckedAlready = false
          const newControl = new FormControl(wasCheckedAlready);
          this.form.addControl(herramienta.id.toString(), newControl);
          this.herrIdList.push(herramienta.id)
        })
        this.checkboxFormCreated = true;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  openaddExperienciaLaboral() {
    const dialogRef = this.dialog.open(AddLaboralComponent, {
      width: '600px',
      height: '700px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerLaboralesGuardados();
    });
  }
  addExperienceRow(){
    this.id = null;
    this.form.patchValue({
      position: "",
      company: "",
      activities: "",
      startDate:"",
      endDate: "",
    });
    this.herrIdList.forEach(herrId =>{
      this.form.get(herrId.toString())?.patchValue(false);
    })
    this.creationMode = !this.creationMode;
  }
  redirectTo(){
    this.navigateToRoute('/user/cargo-usuario')
  }
 addExperienciaLaboral(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddLaboralComponent, {
      width: '600px',
      height: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  submitForm(event: Event) {
    event.preventDefault();
    console.log("Form guardado:",this.form.value)
    const laboralNueva: Employment = {
      ...this.form.value,
      herramientas: this.getHerramientasSeleccionadas(),
      employmentReferences: this.referenciasFormArray.value.map( (ref: EmploymentReferences) => {
        return {
          id: ref.id,
          name: ref.name,
          company: ref.company,
          email: ref.email,
          phone: ref.phone,
        };
      })
    };
    this.laboralService.guardarLaboral(laboralNueva, this.id).subscribe(
      (laboralGuardada: Employment) => {
        this.obtenerLaboralesGuardados();
        this.creationMode = false;
      },
      (error) => {
        console.error('Error al guardar información laboral:', error);
      }
    );
  }
  private getHerramientasSeleccionadas(): HerramientaData[] {
  return [];
  }
  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
  editLaboral(event: any) {
    const inf_lab_id = event.target.parentElement.id;
    console.log('inf_lab_id:', inf_lab_id); 
    if (inf_lab_id) {
      this.laboralService.obtenerLaboralPorId( inf_lab_id).subscribe({
        next: (data) => {
          const dialogRef = this.dialog.open(EditLaboralComponent, {
            width: '800px',
            height: '700px',
            data: data
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            this.obtenerLaboralesGuardados();
          });
        },
        error: (error) => {
          console.error('Error al obtener datos:', error); 
        }
      });
    } else {
      console.error('inf_lab_id es undefined o null'); 
    }
  }
}