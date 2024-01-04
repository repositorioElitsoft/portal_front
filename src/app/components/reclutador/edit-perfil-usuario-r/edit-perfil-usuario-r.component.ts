import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MAT_DIALOG_DATA, MatDialogRef , MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewUsuariosRComponent } from '../view-usuarios-r/view-usuarios-r.component';
import { ActivatedRoute, Router } from '@angular/router';
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
    name: '',
    firstLastname: '',
    secondLastname:'',
    rut: '',
    email:'',
    phone:'',
    password:'',
    roles:'',
    address: ''
  }
  constructor( private userService:UserService,
    private router:Router,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewUsuariosRComponent>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) {
    this.userDataForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
      firstLastname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      secondLastname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      rut: [''],
      email: [''],
      phone: [''],
      roles: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.usrId = this.data ? this.data.usuarioId : null;
    if (this.usrId) {
      this.userService.getUsuarioId(this.usrId).subscribe({
        next: (data) => {
          this.userDataForm.patchValue(data);
          this.usuario.id = data.id;
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
        return;
    }
    const userData = this.userDataForm.value;
    if (this.usrId) {
        this.usuario = this.userDataForm.value;
        this.userService.actualizarUsuarioAdmin(this.usrId, this.usuario).subscribe({
            next: (dato: any) => {
                this._snackBar.open("User actualizado con éxito", "Cerrar", {
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
    this.userService.updateUsuario(userData).subscribe({
        next: (data) => {
            this.notification.showNotification(
                'success',
                'Registro Exitoso',
                'User agregado con éxito'
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
    this.dialogRef.close();
  }
}
