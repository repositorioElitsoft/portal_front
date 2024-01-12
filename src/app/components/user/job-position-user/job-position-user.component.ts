import { Component,  OnInit} from '@angular/core';
import {  Router } from '@angular/router';
import { JobPositionService } from 'src/app/service/jobposition.service';
import { UserJobService} from 'src/app/service/user-job.service';
import { JobPosition } from 'src/app/interface/jobposition.interface';
import { UserJob } from 'src/app/interface/user-job.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AddPositionUserComponent } from '../add-position-user/add-position-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserPrefferedJobComponent } from '../user-preffered-job/user-preffered-job.component';
import { UserPreferredJob } from 'src/app/interface/user-preferred-job-interface';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-job-position-user',
  templateUrl: './job-position-user.component.html',
  styleUrls: ['./job-position-user.component.css']
})
export class JobPositionUserComponent implements OnInit {
  form!: FormGroup;
  mostrarFormulario: boolean = true;
  isntrainee: boolean= false;
  creationMode: boolean = false;
  JobPosition: JobPosition[] = [];
  userJobs: UserJob[] = [];
  userPreferredJob: UserPreferredJob | null = null;
  selectedjobPosition:number | undefined;
  
  private buildForm(){
    this.form = this.formBuilder.group({
      salary: ["", [Validators.required, Validators.pattern(/^[0-9$.]+$/)]],
      JobPositionId: ["", [Validators.required]],
     // availability: ["", [Validators.required]],
      availability: this.formBuilder.group({
        id:['1',],
        time:['', ]
      }),
      });
  }
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private cargosusuarioService:UserJobService,
    private userService:UserService,
    private JobPositionService:JobPositionService,
    private router: Router ) {
      this.buildForm();
    }
  ngOnInit(): void {
    this.getCargoUsuario();
    this.obtenerJobPosition();
    this.getPreferredJobs(); 
  }
  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
  obtenerJobPosition() {
    this.JobPositionService.obtenerListaJobPosition().subscribe(
      (data: JobPosition[]) => {
        this.JobPosition = data;
        console.log('JobPosition:', this.JobPosition); // Agrega este console.log
      },
      (error) => {
        console.log('Error al obtener el cargo de elitsoft:', error);
      }
    );
  }
  
  
  getCargoUsuario() {
    this.cargosusuarioService.getCargosByUserId().subscribe(
      (data: UserJob[]) => {
        console.log('esta es la data:', data);
        if (data && data.length > 0) {
          this.userJobs = data;
        } else {
          console.log('No se han encontrado datos');
          // Aquí puedes mostrar un mensaje al usuario o realizar otras acciones según tus necesidades.
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        // Maneja el error si es necesario
      }
    );
  }
  
  

  successMessage() {
    const newCargo: UserJob = this.form.value;
    const usuarioId = newCargo.user;
    Swal.fire({
      icon: 'success',
      title: 'Datos enviados exitosamente',
      text: 'Gracias por postular en Elitsoft',
      cancelButtonColor: '#515151',
      confirmButtonColor: '#F57C27',
      customClass: {
        popup: 'custom-border' 
      }
    });
  }
  redirectToReferencias() {
    this.router.navigate(['/user/informacion-academica']);
  }
  ///////////////////////////////////////////
  esCargoTrainee(){
    const cargoSeleccionado = this.JobPosition.find(position => position.id === Number(this.form.get("JobPositionId")?.value));
    console.log('cargoSeleccionado:', cargoSeleccionado);
    console.log('cargoSeleccionado id:', this.form.get("JobPositionId")?.value);
    console.log('cargoSeleccionado name:', this.JobPosition);
    this.isntrainee = !!cargoSeleccionado && !!cargoSeleccionado.name && cargoSeleccionado.name.toLowerCase().includes('trainee');
  }
  //////////////////////////////////////
  submitForm(event: Event){
    event.preventDefault();
  const pretensionRentaFormatted = this.form.get('salary')?.value;
  const pretensionRentaWithoutFormat = pretensionRentaFormatted.replace(/[^\d]/g, '');
  this.form.get('salary')?.setValue(pretensionRentaWithoutFormat);
  const newCargo: UserJob = this.form.value;
  
  newCargo.jobPosition = {
    id: this.form.value.JobPositionId,
  }
  console.log('new cargo:', newCargo);
  this.cargosusuarioService.guardarCargo(newCargo).subscribe(
    (nuevoCargo: UserJob) => {
      //////////////
     // this.mostrarFormulario = !this.esCargoTrainee(nuevoCargo.jobPosition?.id ?? undefined);
      ////////////////////
    },
    (error) => {
      console.log('Error al guardar postulación:', error);
    }
  );
  }
  formatCurrency() {
    const control = this.form.get('salary');
    if (control && control.value) {
      let value = control.value.toString();
      value = value.replace(/[^0-9]/g, '');
      const formattedValue = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
      }).format(Number(value));
      control.setValue(formattedValue);
    }

    
  }
 
  deleteJob(userjob: UserJob) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la postulación. Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#515151',
      confirmButtonColor: '#F57C27',
      customClass: {
        popup: 'custom-border' 
      }
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargosusuarioService.eliminarPostulacionPorId(userjob.id).subscribe(
          (eliminacionExitosa) => {
              this.getCargoUsuario();
              Swal.fire('Eliminado', 'Su postulación ha sido eliminada con éxito.', 'success');
          },
          (error) => {
            console.error('Error al eliminar su postulación:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar la postulación.', 'error');
          }
        );
      }
    });
  }
  
  editJob(userJob: UserJob) {
    if (userJob) {
      console.log('esta es la data:', userJob);
      const dialogRef = this.dialog.open(AddPositionUserComponent, {
        width: '800px',
        height: '700px',
        data: { userJob: userJob, creationMode: false } 
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        this.getCargoUsuario();
      });
    } else {
      console.error('JobPositionId es undefined o null');
    }
  }
  
  
  openAddPositionUser(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AddPositionUserComponent, {
      width: '600px',
      height: '700px',
      data: {}, 
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCargoUsuario();    });
  }
  redirectTo(){
    this.navigateToRoute('/user-dashboard/0')
  }
  
  openPrefferedJob(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UserPrefferedJobComponent, {
      width: '400px',
      height: '300px',
      data: {creationMode: true }, 
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPreferredJobs();    });
  }

  getPreferredJobs() {
    this.userService.getPreferredJob().subscribe(
      (data: UserPreferredJob) => { // Cambia el tipo de dato a UserPreferredJob
        console.log('Datos recibidos en ngOnInit:', data);
        this.userPreferredJob= data; // Convierte el objeto en un array de un solo elemento
      },
      (error) => {
        console.log('Error al obtener el cargo preferido:', error);
      }
    );
  }
  
  editpostpref(userPreferredJob: UserPreferredJob) {
    const dialogRef = this.dialog.open(UserPrefferedJobComponent, {
      width: '400px',
      height: '300px',
      data: { userPreferredJob: userPreferredJob, creationMode: false },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '150ms',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getPreferredJobs();     });
  }
  
  
  
}