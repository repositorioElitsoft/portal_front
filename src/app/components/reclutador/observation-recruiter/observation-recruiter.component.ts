import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObservacionDTO, Observation } from 'src/app/interface/observation.interface';
import { UserSesionDTO } from 'src/app/interface/user.interface';
import { ObservacionService } from 'src/app/service/observation.service';
import { UserService } from 'src/app/service/user.service';
import { ObservationRecruiterEditComponent } from '../observation-recruiter-edit/observation-recruiter-edit.component';
import { UserJob } from 'src/app/interface/user-job.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-observation-recruiter',
  templateUrl: './observation-recruiter.component.html',
  styleUrls: ['./observation-recruiter.component.css']
})
export class ObservationRecruiterComponent implements OnInit {
  usuarioData: any;
  formulario!: FormGroup;
  userJobId: number | undefined;
  usuarioGuardado: UserSesionDTO = {
    id:0,
    rut: '',
    name: '',
    firstLastname: '',
    secondLastname: '',
    email: '',
    phone: '',
  };
  observacionesPorUserJob: ObservacionDTO[] = [];
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ObservationRecruiterComponent>,
    private userService: UserService,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private observacionService: ObservacionService,
    private _snackBar: MatSnackBar
  ) {
    this.usuarioData = [];
    this.userJobId = undefined;
    
  }
  
  ngOnInit(): void {
    this.createForm();
    this.usuarioData = this.data.usuario;
    this.userJobId = this.data.userJobId ?? 0;
  }
  

  createForm() {
    this.formulario = this.formbuilder.group({
      description: ['', Validators.required],
      userJob: this.formbuilder.group({
        id: [null, Validators.required]
      })
    });
  }
  editarObservacion(usuario: any): void {
    const userId = usuario.id; 
    console.log('data de usuario: ', usuario);
    const dialogRef = this.dialog.open(ObservationRecruiterEditComponent, {
      width: '800px',
      height: '700px',
      data: {
        usuario: usuario, 
        observationId: userId,
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.obtenerObservacionesPorUserJob(this.userJobId ?? 0);
    });
  }
  

  nuevaObs(data: any) {
    // Verificar que se haya ingresado una descripción
    const descripcion = this.formulario.get('description')?.value;
    if (descripcion === undefined || descripcion.trim() === '') {
      console.error('Por favor, agregue una descripción.');
      this._snackBar.open('Por favor, agregue una descripción válida.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }
  
    // Crear un objeto Observation con valores predeterminados
    const nuevaObservacion: Observation = {
      description: descripcion,
      obs_id: 0, // Puedes establecer un valor temporal (por ejemplo, 0) para satisfacer TypeScript
      userJob: {
        id: this.userJobId ?? 0, // Utilizar el valor de userJobId que se estableció en ngOnInit
        salary: 0, // Dejarlo como está
        fecha: '',
        user: {
          name: '',
          email: '',
          address: '',
        },
        applicationDate: new Date(),
        approvals:[],
      },
      updates: [],
    };
  
    // Mostrar la información que se enviará antes de llamar al servicio
    console.log('Información que se enviará:', nuevaObservacion);
  
    // Llamar al servicio para crear la observación
    this.observacionService.crearObservacion(nuevaObservacion).subscribe({
      next: (data) => {
        // La observación se ha creado exitosamente, actualiza obs_id con el valor del servidor
        nuevaObservacion.obs_id = data.obs_id;
      
        console.log('Observación creada:', data);
        this._snackBar.open('Observación creada exitosamente.', 'Cerrar', {
          duration: 3000,
        });
        this.obtenerObservacionesPorUserJob(this.userJobId ?? 0);
      
        // Limpiar el campo de descripción
        this.formulario.get('description')?.setValue('');
      
      },
      error: (error) => {
        // Ocurrió un error al crear la observación
        console.error('Error al crear la observación:', error);
        this._snackBar.open('Error al crear la observación. Por favor, inténtelo de nuevo.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  eliminarObservacion(userJobId: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Realmente desea eliminar la observación?',
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
        // Lógica de eliminación
        this.observacionService.eliminarObservacion(userJobId).subscribe(
          () => {
            // Notificar al usuario sobre la eliminación exitosa
            this._snackBar.open('La observación se ha eliminado con éxito.', 'Cerrar', {
              duration: 3000,
            });
  
            // Actualizar la lista de observaciones después de la eliminación
            this.obtenerObservacionesPorUserJob(this.userJobId ?? 0);
          },
          (error) => {
            console.error('Error al eliminar la observación:', error);
  
            // Notificar al usuario sobre cualquier error
            this._snackBar.open('Error al eliminar la observación. Por favor, inténtelo de nuevo.', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
  
  

  obtenerObservacionesPorUserJob(userJobId: number): void {
    this.observacionService.obtenerObservacionesPorUserJob(userJobId).subscribe({
      next: (data) => {
        this.usuarioData = data; 
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getInitials(name: string, firstLastname: string, secondLastname: string): string {
    // Obtener las dos primeras letras de name y firstLastname
    const initials = name.charAt(0) + firstLastname.charAt(0);
    
    // Verificar si secondLastname existe y no es vacío
    if (secondLastname && secondLastname.trim() !== '') {
      // Si existe, agregar la primera letra de secondLastname
      return initials + secondLastname.charAt(0);
    } else {
      // Si no existe, solo retornar las dos iniciales anteriores
      return initials;
    }
  }

  confirmarCierreFormulario() {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea salir de Observaciones??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#515151',
      confirmButtonColor: '#F57C27',
      customClass: {
        popup: 'custom-border' 
    }
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      }
    });
  }
}



  