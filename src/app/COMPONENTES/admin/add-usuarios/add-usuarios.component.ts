import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.component.html',
  styleUrls: ['./add-usuarios.component.css']
})
export class AddUsuariosComponent implements OnInit {

  userDataForm: FormGroup;



  constructor( private usuarioService:UsuarioService, private router:Router, private formBuilder: FormBuilder, private notification: NotificationService ) {

    this.userDataForm = this.formBuilder.group({
      usr_nom: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
      usr_ap_pat: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      usr_ap_mat: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      usr_email: ['', [Validators.required, Validators.email, Validators.maxLength(30), Validators.minLength(3)]],
      usr_pass: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(3)]],
      usr_rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  guardarUsuario() {
    if (this.userDataForm.invalid) {
      alert('Por favor, complete el formulario correctamente.');
      return;
    }

    const userData = this.userDataForm.value;

    if (userData.usr_rol === 'ADMIN') {
      this.usuarioService.guardarAdmin(userData).subscribe(
        (data) => {
          console.log(data);
          this.notification.showNotification(
            'success',
            'Registro Exitoso',
            'Administrador agregado con exito');
          this.limpiarCampos();
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (userData.usr_rol === 'REC') {
      this.usuarioService.guardarRec(userData).subscribe(
        (data) => {
          console.log(data);
          this.notification.showNotification(
            'success',
            'Registro Exitoso',
            'Reclutador agregado con exito');
          this.limpiarCampos();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  private limpiarCampos() {
    this.userDataForm.reset();
  }


  cancelar() {

    this.router.navigate(['/admin/view-usuarios']);
  }



}
