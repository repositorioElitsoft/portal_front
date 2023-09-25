import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/SERVICIOS/usuario.service';

@Component({
  selector: 'app-view-usuarios-r',
  templateUrl: './view-usuarios-r.component.html',
  styleUrls: ['./view-usuarios-r.component.css']
})
export class ViewUsuariosRComponent implements OnInit {

  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
