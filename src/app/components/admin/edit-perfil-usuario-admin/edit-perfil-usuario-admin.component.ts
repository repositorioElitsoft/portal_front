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
  usuario: UserEditarDTO2 = {
    name: '',
    firstLastname: '',
    secondLastname: '',
    rut: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    roles: ''
  }
  hidePassword: boolean = true;
  roles: Role[] = []; // Inicializa la lista de roles vacía

  constructor(
    private userService: UserService,
    private router: Router,
    private roleService: RoleService, // Inyecta el servicio de roles
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewUsuariosComponent>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.userDataForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
      firstLastname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      secondLastname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      rut: [''],
      email: [''],
      phone: [''],
      roles: [null, Validators.required], // Utiliza null como valor inicial para roles
    });
  }

  ngOnInit(): void {
    this.getRoles(); // Llama al método getRoles() para obtener la lista de roles

    this.usrId = this.data ? this.data.usuarioId : null;
    if (this.usrId) {
      console.log('existo');
      this.userService.getUsuarioId(this.usrId).subscribe({
        next: (data) => {
          this.userDataForm.patchValue(data);
          this.usuario.id = data.id;

          // Establece el valor seleccionado en función de user.role
          this.userDataForm.controls['roles'].setValue(data.roleId);

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


  guardarUsuario() {
    if (this.userDataForm.invalid) {
      console.log('Ventana Cerrada');
      return;
    }

    const userData = this.userDataForm.value;
    const roleId = userData.roles; // Aquí obtienes el ID del rol seleccionado


    userData.roleId = roleId;

    // Después, procede a guardar o actualizar el usuario con el nuevo rol
    const accionCompleta = (mensaje: string) => {
      this._snackBar.open(mensaje, "Cerrar", { duration: 3000 });
      this.cancelar();
      this.dialog.closeAll();
      this.dialogClosed.emit();
    };

    if (this.usrId) {
      console.log(userData, 'usuario para actualizar');
      this.userService.actualizarUsuarioAdmin(this.usrId, userData).subscribe({
        next: () => accionCompleta("User actualizado con éxito"),
        error: () => accionCompleta("Error al actualizar usuario")
      });
    } else {
      console.log(userData, 'usuario para agregar');
      this.userService.updateUser(userData).subscribe({
        next: () => {
          console.log('Registro Exitoso');
          this.notification.showNotification('success', 'Registro Exitoso', 'User agregado con éxito');
          this.limpiarCampos();
        },
        error: (error) => console.log(error)
      });
    }
  }

  guardarRole(role: Role, callback: () => void) {
    this.roleService.saveOrUpdateRole(role).subscribe({
      next: () => {
        console.log('Rol guardado o actualizado con éxito');
        callback(); // Llama al callback una vez que el rol se ha guardado o actualizado
      },
      error: (error) => {
        console.error('Error al guardar o actualizar el rol', error);
        // Manejo de errores
      }
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

  // Método para obtener la lista de roles
  getRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        // Crea objetos Role con los nombres de los roles sin "ROLE_"
        this.roles = roles.map(role => ({ id: role.id, name: role.name.replace('ROLE_', '') }));
        console.log(this.roles);
      },
      error: (error) => {
        console.error("Error al obtener la lista de roles", error);
      }
    });
  }
}
