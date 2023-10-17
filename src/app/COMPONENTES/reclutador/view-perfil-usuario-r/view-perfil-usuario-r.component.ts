import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interface/user.interface';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-view-perfil-usuario-r',
  templateUrl: './view-perfil-usuario-r.component.html',
  styleUrls: ['./view-perfil-usuario-r.component.css']
})
export class ViewPerfilUsuarioRComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,
    private usuarioService: UsuarioService, 
    private router:Router,
    public dialogRef: MatDialogRef<ViewPerfilUsuarioRComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: any,) {
   
   }

  ngOnInit(): void {
    //this.email = this.route.snapshot.params['email'];
    //this.obtenerPerfilUsuario();
    
  }


}


