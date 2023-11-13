import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboralService } from 'src/app/service/laboral.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { Usuario } from '../../interface/user.interface'
import { Herramientas } from 'src/app/interface/herramientas.interface';
import { Laboral } from 'src/app/interface/laboral.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { ReferenciaLaboral } from 'src/app/interface/referenciaLaboral.interface';



@Component({
  selector: 'app-informacion-laboral',
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css']
})
export class InformacionLaboralComponent implements OnInit {

  creationMode: boolean = false;
  laborales: Laboral[] = []
  id: number | null | undefined = null
  today;
  form!: FormGroup
  minFecha: string = '';
  checkboxFormCreated = false;

  herramientasDisponibles!: HerramientaData[];
  herrIdList: number[] = [];
  referenciasLaborales: [] = []


  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private herramientaService:HerramientasService,
    private laboralService: LaboralService,
    private route: ActivatedRoute, private router: Router) {
      this.today = new Date().toISOString().split('T')[0];
      this.buildForm();
  }

  ngOnInit(): void {
    this.obtenerLaboralesGuardados();

  }

  private buildForm(){
    this.form = this.formBuilder.group({
      inf_lab_crg_emp: ["",[Validators.required]],
      inf_lab_emp: ["",[Validators.required]],
      inf_lab_act: ["",[Validators.required]],
      inf_lab_fec_ini: ["",[Validators.required]],
      inf_lab_fec_fin: ["",[Validators.required]],
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
        console.log(this.laborales)
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  addReferencia() {
    const referenciaFormGroup = this.formBuilder.group({
      ref_lab_nom: [''],
      ref_lab_emp: [''],
      ref_lab_email: [''],
      ref_lab_tel: ['']
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

    const laboralToEdit = this.laborales.find(laboral => laboral.inf_lab_id === this.id);
    this.form.patchValue({
      inf_lab_crg_emp: laboralToEdit?.inf_lab_crg_emp,
      inf_lab_emp: laboralToEdit?.inf_lab_emp,
      inf_lab_act: laboralToEdit?.inf_lab_act,
      inf_lab_fec_ini: laboralToEdit?.inf_lab_fec_ini,
      inf_lab_fec_fin: laboralToEdit?.inf_lab_fec_fin,
    });

    while (this.referenciasFormArray.length) {
      this.referenciasFormArray.removeAt(0);
    }

    laboralToEdit?.referenciasLaborales?.forEach(referencia => {
      const referenciaFormGroup = this.formBuilder.group({
        ref_lab_id: referencia.ref_lab_id,
        ref_lab_nom: referencia.ref_lab_nom,
        ref_lab_emp: referencia.ref_lab_emp,
        ref_lab_email: referencia.ref_lab_email,
        ref_lab_tel: referencia.ref_lab_tel,
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
    this.herramientaService.getHerramientasByUserId().subscribe({
      next:(data)=>{

        console.log("recieved data herramientas: ",data)
        this.herramientasDisponibles = data;

        this.herramientasDisponibles.forEach((herramienta)=>{

          let wasCheckedAlready = false

          const newControl = new FormControl(wasCheckedAlready);
          this.form.addControl(herramienta.herr_usr_id.toString(), newControl);

          this.herrIdList.push(herramienta.herr_usr_id)

        })

        this.checkboxFormCreated = true;
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }


  addExperienceRow(){
    this.id = null;
    this.form.patchValue({
      inf_lab_crg_emp: "",
      inf_lab_emp: "",
      inf_lab_act: "",
      inf_lab_fec_ini:"",
      inf_lab_fec_fin: "",
    });

    this.herrIdList.forEach(herrId =>{
      this.form.get(herrId.toString())?.patchValue(false);
    })

    this.creationMode = !this.creationMode;
  }

  redirectTo(){
    this.navigateToRoute('/user/cargo-usuario')
  }

  submitForm(event: Event) {

    event.preventDefault();
    console.log("Form guardado:",this.form.value)

    const laboralNueva: Laboral = {
      ...this.form.value,
      herramientas: this.getHerramientasSeleccionadas(),
      referenciasLaborales: this.referenciasFormArray.value.map( (ref: ReferenciaLaboral) => {
        return {
          ref_lab_id: ref.ref_lab_id,
          ref_lab_nom: ref.ref_lab_nom,
          ref_lab_emp: ref.ref_lab_emp,
          ref_lab_email: ref.ref_lab_email,
          ref_lab_tel: ref.ref_lab_tel,
        };
      })
    };

    // let herramientasFinal: HerramientaData[] = [];
    // this.herrIdList.forEach(id =>{
    //   let herra: HerramientaData = {
    //       herr_usr_id: id,
    //       herr_is_cert: false,
    //       herr_nvl: "",
    //       herr_usr_anos_exp: "",
    //       versionProducto: {
    //         vrs_id: 0,
    //         vrs_name: "",
    //         prd: {
    //           prd_id:0,
    //           prd_nom:"",
    //           cat_prod_id:{
    //             cat_prod_id: 0,
    //             cat_prod_nom: ""
    //           }
    //         }
    //       }
    //   }

    //   if (this.form.get(id.toString())?.value == true) {
    //     herramientasFinal.push(herra);
    //   }

    // })

    // laboralNueva.herramientas = herramientasFinal;

    console.log("Laboral final guardada", laboralNueva)
    this.laboralService.guardarLaboral(laboralNueva, this.id).subscribe(
      (laboralGuardada: Laboral) => {
        console.log('Información laboral guardada:', laboralGuardada);
        this.creationMode = false;
        this.laboralService.obtenerListaLaboralPorUsuario().subscribe({
          next:(data)=>{
            this.laborales = data;
          },
          error:(err)=>{
            console.log(err);
          }
        })
      },
      (error) => {
        console.error('Error al guardar información laboral:', error);
      }
    );
  }


// Método para obtener las herramientas seleccionadas del formulario
  private getHerramientasSeleccionadas(): HerramientaData[] {
    return this.herrIdList.map(id => {
      if (this.form.get(id.toString())?.value) {
        return {
          herr_usr_id: id,
          herr_is_cert: false,
          herr_nvl: "",
          herr_usr_anos_exp: "",
          versionProducto: {
            vrs_id: 0,
            vrs_name: "",
            prd: {
              prd_id:0,
              prd_nom:"",
              cat_prod_id:{
                cat_prod_id: 0,
                cat_prod_nom: ""
              }
            }
          }
        } as HerramientaData;
      }
      return null;
    }).filter(herramienta => herramienta !== null) as HerramientaData[];
  }

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
}
