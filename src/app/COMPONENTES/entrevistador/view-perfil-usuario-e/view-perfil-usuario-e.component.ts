import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-perfil-usuario-e',
  templateUrl: './view-perfil-usuario-e.component.html',
  styleUrls: ['./view-perfil-usuario-e.component.css']
})
export class ViewPerfilUsuarioEComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewPerfilUsuarioEComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: any,) {

   }

  ngOnInit(): void {
    //this.email = this.route.snapshot.params['email'];
    //this.obtenerPerfilUsuario();

  }

}
