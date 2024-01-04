import { Component, Inject, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserEditarDTO} from 'src/app/interface/user.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewUsuariosComponent } from '../view-usuarios/view-usuarios.component';
// Componente necesario para que el administrador pueda crear nuevos perfiles. (modulo view-usuarios)
@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.component.html',
  styleUrls: ['./add-usuarios.component.css']
})
export class AddUsuariosComponent implements OnInit {
  userDataForm: FormGroup;
  usrId:number | null = null
  usuario: UserEditarDTO = {
    name: '',
    firstLastname: '',
    secondLastname:'',
    email:'',
    address:'',
    password:'',
    roles:'',
  }
  hide = true;
  constructor( private userService:UserService,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewUsuariosComponent>,
    private _snackBar: MatSnackBar) {

    this.userDataForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
      firstLastname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      secondLastname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(3)]],
      roles: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.usrId = this.data ? this.data.usuarioId : null;
    if (this.usrId) {
      console.log('existo');
      this.userService.getUsuarioId(this.usrId).subscribe({
        next: (data) => {
          this.userDataForm.patchValue(data);
          this.usuario.id = data.id;
          console.log(data.id, 'usuario enviado');
        },
        error: (err) => {
          console.log(err, 'error');
          this._snackBar.open("Error al cargar el usuario existente", "Cerrar", {
            duration: 3000
          });
        }
      });
    } else {
      this.userDataForm.reset();
    }
  }
  guardarUsuario() 
  {
    if (this.userDataForm.invalid) {
      console.log('Ventana Cerrada');
      return;
    }
    const userData = this.userDataForm.value;
    if(this.usrId){
      this.usuario=this.userDataForm.value;
      console.log(this.usuario, 'usuario para act')
      this.userService.actualizarUsuarioAdmin(this.usrId, this.usuario).subscribe({
        next:(dato:any) => {
          this._snackBar.open("User actualizado con éxito","Cerrar",{
            duration:1000
          })
          this.cancelar();
        },
        error:(error) => {
          this._snackBar.open("Error al actualizar usuario","Cerrar",{
            duration:3000
          })
        }
      })
      return
    }
    if (userData.roles === 'ADMIN') {
      this.userService.guardarAdmin(userData).subscribe(
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
    } else if (userData.roles === 'REC') {
      this.userService.guardarRec(userData).subscribe(
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
  this.dialogRef.close();
}
  cancelar() {
    this.dialogRef.close();
  }
}
