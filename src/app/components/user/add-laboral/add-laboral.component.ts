import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboralService } from 'src/app/service/laboral.service';
import { Laboral } from 'src/app/interface/laboral.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HerramientasService } from 'src/app/service/herramientas.service';
@Component({
  selector: 'app-add-laboral',
  templateUrl: './add-laboral.component.html',
  styleUrls: ['add-laboral.component.css']
})
export class AddLaboralComponent implements OnInit {
  [x: string]: any;
  @Output() AddLaboralComponent: EventEmitter<void> = new EventEmitter<void>();
  creationMode: boolean = false;
  laborales: Laboral[] = [];
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
      inf_lab_crg_emp: ["", [Validators.required]],
      inf_lab_emp: ["", [Validators.required]],
      inf_lab_act: ["", [Validators.required]],
      inf_lab_fec_ini: ["", [Validators.required]],
      inf_lab_fec_fin: ["", [Validators.required]],
      referenciasLaborales: this.formBuilder.array([])
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
    const laboralToEdit = this.laborales.find(laboral => laboral.inf_lab_id === this.id);
    this.form.patchValue({
      inf_lab_crg_emp: laboralToEdit?.inf_lab_crg_emp,
      inf_lab_emp: laboralToEdit?.inf_lab_emp,
      inf_lab_act: laboralToEdit?.inf_lab_act,
      inf_lab_fec_ini: laboralToEdit?.inf_lab_fec_ini,
      inf_lab_fec_fin: laboralToEdit?.inf_lab_fec_fin,
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
    this.herramientaService.getHerramientasByUserId().subscribe({
      next:(data: HerramientaData[])=>{
        this.herramientasDisponibles = data;
        this.herramientasDisponibles.forEach((herramienta)=>{
          let wasCheckedAlready = false
          const newControl = new FormControl(wasCheckedAlready);
          if (!herramienta.herr_prd_otro){
            this.form.addControl(herramienta.herr_usr_id.toString(), newControl);
          }
          else {
            this.form.addControl(herramienta.herr_prd_otro, newControl);
          }
          this.herrIdList.push(herramienta.herr_usr_id)
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
      const laboralNueva: Laboral = this.form.value;
      let herramientasFinal: HerramientaData[] = [];
      this.herrIdList.forEach(id => {
        if (this.form.get(id.toString())?.value === true) {
          let herra: HerramientaData = {
            herr_usr_id: id,
            herr_is_cert: false,
            herr_nvl: "",
            herr_usr_anos_exp: "",
            herr_prd_otro:"",
            versionProducto: {
              vrs_id: 0,
              vrs_name: "",
              prd: {
                prd_id: 0,
                prd_nom: "",
                cat_prod_id: {
                  cat_prod_id: 0,
                  cat_prod_nom: ""
                }
              }
            }
          };
          herramientasFinal.push(herra);
        }
      });
      laboralNueva.herramientas = herramientasFinal;
      this.laboralService.guardarLaboral(laboralNueva, this.id).subscribe(
        (laboralGuardada: Laboral) => {
          this.creationMode = false; 
          this.laboralService.obtenerListaLaboralPorUsuario().subscribe({
            next:(data) => {
              this.laborales = data;
                this.AddLaboralComponent.emit();
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
}
