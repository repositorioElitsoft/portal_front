import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Role } from 'src/app/interface/role.interface';
import { RoleService } from 'src/app/service/role.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})

export class EditRoleComponent implements OnInit {
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();
  usrId: number | null = null;
  allRoles: Role[] = [];
  userRoles: Role[] = [];
  userDataForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditRoleComponent>,
    private userService: UserService,
    private router: Router,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {

    this.userDataForm = this.formBuilder.group({
      id: [null, Validators.required],
    });

  }

  ngOnInit(): void {

    this.usrId = this.data.usuarioId;
    console.log('id de usrId y data: ', this.usrId, this.data.usuarioId)
    this.getRoles();
    this.getRolesByUserId();

    console.log('Datos recibidos del padre:', this.data);


  }

  getRoles() {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.allRoles = roles.map(role => ({ id: role.id, name: role.name }));
        console.log(this.allRoles);
      },
      error: (error) => {
        console.error("Error al obtener la lista de roles", error);
      }
    });
  }

  getRolesByUserId() {
    this.roleService.getRolesByUserId(this.usrId ?? 0).subscribe((data) => {
      this.userRoles = data;
    });
  }


  guardarRol() {
    const roleData = this.userDataForm.value;
    console.log('id: ', this.usrId)
    console.debug('este es el roldata: ', roleData)
    this.roleService.saveOrUpdateRole(roleData, this.usrId ?? 0).subscribe(
      (response) => {
        console.log('Rol guardado con éxito con éxito:', response);
        this.getRolesByUserId();
        this.dialogRef.close();
        this._snackBar.open('Rol asignado con éxito', 'OK', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error al actualizar el rol:', error);
        error.status === 500 ? this._snackBar.open('Rol duplicado, intente agregar otro rol o elimine el existente.', 'OK', {
          duration: 3000,
        }) : this._snackBar.open('Rol duplicado, intente agregar otro rol o elimine el existente.', 'OK', {
          duration: 3000,
        });
      }
    );

  }

  cancelar() {
    this.dialogRef.close();
  }

}
