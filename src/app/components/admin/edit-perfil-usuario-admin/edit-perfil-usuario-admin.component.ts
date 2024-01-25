import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserEditarDTO2 } from 'src/app/interface/user.interface';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ViewUsuariosComponent } from '../view-usuarios/view-usuarios.component';
import { Role } from 'src/app/interface/role.interface';
import { RoleService } from 'src/app/service/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditRoleComponent } from '../edit-role/edit-role.component';

@Component({
  selector: 'app-edit-perfil-usuario-admin',
  templateUrl: './edit-perfil-usuario-admin.component.html',
  styleUrls: ['./edit-perfil-usuario-admin.component.css'],
})
export class EditPerfilUsuarioAdminComponent implements OnInit {
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();
  userDataForm: FormGroup;
  usrId: number | null = null
  hide = true;
  hidePassword: boolean = true;
  roles: Role[] = [];
  roleId: number | null = null

  constructor(
    private userService: UserService,
    private router: Router,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewUsuariosComponent>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.userDataForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
      firstLastname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      secondLastname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      rut: [''],
      email: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    this.getRoles();
    this.usrId = this.data ? this.data.usuarioId : null;
    if (this.usrId) {
      console.log('existo');
      this.userService.getUsuarioId(this.usrId).subscribe({
        next: (data) => {
          this.userDataForm.patchValue(data);


          if (data && data.roleId !== undefined) {
            this.userDataForm.controls['roles'].setValue(data.roleId);
          }


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

    this.getRolesByUserId();
  }

  guardarUsuario() {
    if (this.userDataForm.invalid) {
      console.log('Formulario no válido');
      return;
    }

    const userData = this.userDataForm.value;
    const userId = this.usrId ?? 0; // Asegúrate de tener un ID de usuario válido
    console.log('Valor de userId:', userId); // Agrega esta línea para verificar el valor de userId

    const accionCompleta = (mensaje: string) => {
      this._snackBar.open(mensaje, "Cerrar", { duration: 3000 });
      this.cancelar();
      this.dialog.closeAll();
      this.dialogClosed.emit();
    };

    const esActualizacion = !!this.usrId;


    if (esActualizacion) {
      console.log(userData, 'usuario para actualizar');
      this.userService.actualizarUsuarioAdmin(userId, userData).subscribe({
        next: () => {

          accionCompleta("Usuario actualizado con éxito");
        },
        error: () => {
          accionCompleta("Error al actualizar usuario");
        }
      });
    } else {
      console.log(userData, 'usuario para agregar');
      this.userService.updateUser(userData).subscribe({
        next: () => {
          accionCompleta("Registro Exitoso");
        },
        error: (error) => {
          console.error(error);
          accionCompleta("Error al agregar usuario");
        }
      });
    }
  }

  getRolesByUserId() {
    this.roleService.getRolesByUserId(this.usrId ?? 0).subscribe((data) => {
      this.roles = data;
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  private limpiarCampos() {
    this.userDataForm.reset();
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles.map(role => ({ id: role.id, name: role.name }));
        console.log(this.roles);
      },
      error: (error) => {
        console.error("Error al obtener la lista de roles", error);
      }
    });
  }

  editRole(usrId: number): void {
    if (!usrId) {
      console.error('El usrId no es válido');
      return;
    }

    console.log('usrId enviado:', usrId);

    const dialogRef = this.dialog.open(EditRoleComponent, {
      width: '400px',
      height: '400px',
      data: { usuarioId: usrId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getRolesByUserId();
    }, (error) => {
      console.error(error);
    });
  }




  deleteRole(userId: number, roleId: number): void {
    this.roleService.deleteRole(userId, roleId).subscribe(
      response => {
        // Manejar la respuesta después de la eliminación, por ejemplo, recargar la lista de roles.
        this._snackBar.open('Rol eliminado correctamente', 'Cerrar', { duration: 3000 }); // Muestra un mensaje de éxito en el snack bar
        this.getRolesByUserId() // Actualiza la lista de roles
      },
      error => {
        console.error('Error al eliminar el rol:', error);
        this._snackBar.open('Error al eliminar el rol', 'Cerrar', { duration: 3000 }); // Muestra un mensaje de error en el snack bar
      }
    );
  }
}


