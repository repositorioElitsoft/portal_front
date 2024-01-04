import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: User
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.usuario.name, Validators.required),
      firstLastname: new FormControl(this.usuario.firstLastname, Validators.required),
      email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      rut: new FormControl(this.usuario.rut, [Validators.required]),
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
