import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserEditarDTO, Usuario } from 'src/app/interface/user.interface';



@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.component.html',
  styleUrls: ['./add-usuarios.component.css']
})
export class AddUsuariosComponent implements OnInit {

  userDataForm: FormGroup;
  usrId:number | null = null
  usuario: UserEditarDTO = {
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat:'',
    usr_email:'',
    usr_pass:'',
    usr_rol:''

  }




  constructor( private usuarioService:UsuarioService,
    private router:Router,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar) {

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
      this.usrId = this.route.snapshot.params['usuarioId'];
      if(this.usrId){
        console.log('existo')
        this.usuarioService.getUsuarioId(this.usrId).subscribe({
          next:(data)=>{
            this.userDataForm.patchValue(data);
            this.usuario.usr_id=data.usr_id;
            console.log(data.usr_id, 'usuario enviado')
          },
          error:(err)=>{
            console.log(err, 'error')
            this._snackBar.open("Error al cargar el usuario existente","Cerrar",{
              duration:3000
            })
          }
        })
      }
    }


  guardarUsuario() {
    if (this.userDataForm.invalid) {
      alert('Por favor, complete el formulario correctamente.');
      return;
    }

    const userData = this.userDataForm.value;

    if(this.usrId){

      this.usuario=this.userDataForm.value;
      console.log(this.usuario, 'usuario para act')
      this.usuarioService.actualizarUsuarioAdmin(this.usrId, this.usuario).subscribe({
        next:(dato:any) => {
          this._snackBar.open("Usuario actualizado con éxito","Cerrar",{
            duration:3000
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
