import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LaboralService } from 'src/app/service/laboral.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { Employment } from 'src/app/interface/employment.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditLaboralComponent } from '../add-employment/add-employment.component';
import { ToolDTO } from 'src/app/interface/herramientas.interface';
@Component({
  selector: 'app-informacion-laboral',
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css']
})
export class InformacionLaboralComponent implements OnInit {
  creationMode: boolean = false;
  employment: Employment[] = []
  id: number | null | undefined = null
  today;
  form!: FormGroup
  minFecha: string = '';
  checkboxFormCreated = false;
  herramientasDisponibles!: ToolDTO[];
  herrIdList: number[] = [];
  constructor(
    public dialog : MatDialog,
    private herramientaService:HerramientasService,
    private laboralService: LaboralService,
    private router: Router) {
      this.today = new Date().toISOString().split('T')[0];
  }
  ngOnInit(): void {
    this.obtenerLaboralesGuardados();
 
}

obtenerLaboralesGuardados(){
  this.laboralService.obtenerListaLaboralPorUsuario().subscribe({
    next: (data) =>{
      this.employment = data;
      console.log('Datos de employment obtenidos:', data);
    },
    error: (err)=>{
      console.error('Error al obtener datos de employment:', err);
    }
  })
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

  
 
  redirectTo(){
    this.navigateToRoute('/user/cargo-usuario')
  }
  openaddExperienciaLaboral(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(EditLaboralComponent, {
      width: '600px',
      height: '700px',
      data: {}, 
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerLaboralesGuardados();    });
  }
  
 
  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
  editLaboral(event: any) {
    const id = event.target.parentElement.id;
    console.log('id:', id); 
    if (id) {
      this.laboralService.obtenerLaboralPorId( id).subscribe({
        next: (data) => {
          const dialogRef = this.dialog.open(EditLaboralComponent, {
            width: '800px',
            height: '700px',
            data: { id: data.id, ...data } 
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
      console.error('id es undefined o null'); 
    }
  }
}