import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      usr_nom: new FormControl(this.usuario.usr_nom, Validators.required),
      usr_ap_pat: new FormControl(this.usuario.usr_ap_pat, Validators.required),
      usr_email: new FormControl(this.usuario.usr_email, [Validators.required, Validators.email]),
      usr_rut: new FormControl(this.usuario.usr_rut, [Validators.required]),
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
