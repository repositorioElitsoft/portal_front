import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef , MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewUsuariosRComponent } from '../view-usuarios-r/view-usuarios-r.component';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import {  UserEditarDTO2 } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-edit-perfil-usuario-r',
  templateUrl: './edit-perfil-usuario-r.component.html',
  styleUrls: ['./edit-perfil-usuario-r.component.css'],
})


export class EditPerfilUsuarioRComponent implements OnInit {


  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();

  userDataForm: FormGroup;
  usrId:number | null = null
  usuario: UserEditarDTO2 = {
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat:'',
    usr_rut: '',
    usr_email:'',
    usr_tel:'',
    usr_pass:'',
    usr_rol:'',
    usr_direcc: ''

  }

  constructor( private usuarioService:UsuarioService,
    private router:Router,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewUsuariosRComponent>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) {

    this.userDataForm = this.formBuilder.group({
      usr_nom: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
      usr_ap_pat: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      usr_ap_mat: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      usr_rut: [''],
      usr_email: [''],
      usr_tel: [''],
      usr_rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.usrId = this.data ? this.data.usuarioId : null;

    if (this.usrId) {
      this.usuarioService.getUsuarioId(this.usrId).subscribe({
        next: (data) => {
          this.userDataForm.patchValue(data);
          this.usuario.usr_id = data.usr_id;
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


  guardarUsuario() {
    if (this.userDataForm.invalid) {
        console.log('Ventana Cerrada');
        return;
    }

    const userData = this.userDataForm.value;

    if (this.usrId) {
        this.usuario = this.userDataForm.value;
        console.log(this.usuario, 'usuario para act')
        this.usuarioService.actualizarUsuarioAdmin(this.usrId, this.usuario).subscribe({
            next: (dato: any) => {
                this._snackBar.open("Usuario actualizado con éxito", "Cerrar", {
                    duration: 1000
                });
                this.cancelar();
                this.dialog.closeAll();
                this.dialogClosed.emit();

            },
            error: (error) => {
                this._snackBar.open("Error al actualizar usuario", "Cerrar", {
                    duration: 3000
                });
            }
        });
        return;
    }

    this.usuarioService.updateUsuario(userData).subscribe({
        next: (data) => {
            console.log(data);
            this.notification.showNotification(
                'success',
                'Registro Exitoso',
                'Usuario agregado con éxito'
            );
            this.limpiarCampos();
        },
        error: (error) => {
            console.log(error);
        }
    });
  }


  private limpiarCampos() {
    this.userDataForm.reset();
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close(); // Cierra solo el diálogo actual
  }

}
