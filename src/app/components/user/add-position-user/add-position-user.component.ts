// add-position-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { CargosUsuarioService } from 'src/app/service/cargos-usuario.service';
import { JobPositionService } from 'src/app/service/jobposition.service';
import { JobPosition } from 'src/app/interface/jobposition.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-position-user',
  templateUrl: './add-position-user.component.html',
  styleUrls: ['./add-position-user.component.css']
})
export class AddPositionUserComponent implements OnInit {
  form!: FormGroup;
  jobPositions: JobPosition[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cargosUsuarioService: CargosUsuarioService,
    private jobPositionService: JobPositionService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.obtenerJobPositions();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      // Define los campos necesarios para la postulación
      salary: ["", [Validators.required, Validators.pattern(/^[0-9$.]+$/)]],
      crg_prf: [""],
      JobPositionId: ["", [Validators.required]],
      availability: [""],
      tiempo_incorporacion: [""],
      otro_tiempo_incorporacion: [""],
    });
  }

  obtenerJobPositions() {
    this.jobPositionService.obtenerListaJobPosition().subscribe(
      (data: JobPosition[]) => {
        this.jobPositions = data;
      },
      (error) => {
        console.log('Error al obtener las posiciones de trabajo:', error);
      }
    );
  }

  submitForm(event: Event) {
    event.preventDefault();

    // Realiza la lógica necesaria para guardar la postulación
    const nuevaPostulacion = this.form.value;

    this.cargosUsuarioService.guardarCargo(nuevaPostulacion).subscribe(
      (respuesta) => {
        Swal.fire({
          icon: 'success',
          title: 'Postulación enviada exitosamente',
          text: 'Gracias por postular en Elitsoft',
          cancelButtonColor: '#515151',
          confirmButtonColor: '#F57C27',
          customClass: {
            popup: 'custom-border'
          }
        });

        // Puedes redirigir a otra página después de enviar la postulación
        this.router.navigate(['/user/cargo-usuario']);
      },
      (error) => {
        console.log('Error al guardar la postulación:', error);
      }
    );
  }
}

