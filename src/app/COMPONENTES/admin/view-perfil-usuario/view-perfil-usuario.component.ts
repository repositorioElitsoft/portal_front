import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-view-perfil-usuario',
  templateUrl: './view-perfil-usuario.component.html',
  styleUrls: ['./view-perfil-usuario.component.css']
})
export class ViewPerfilUsuarioComponent implements OnInit {
  rol: string;
  email: string;
  usuario: any = {
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_rut: '',
    email: '',
    usr_pass: '',
    usr_tel: '',
    usr_url_link: '',
    //rol: '' // Agrega el campo del rol aquí
  };

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private router:Router) {
    this.email = ''; // Inicialización en el constructor
    this.rol = '';
   }

  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];

    this.usuarioService.obtenerRolUsuario(this.usuario.email).subscribe(
      (rol: string) => {
        this.rol = rol;
      },
      (error) => {
        console.error('Error obteniendo el rol del usuario', error);
      }
    );
    this.obtenerPerfilUsuario();

    
  }

  obtenerPerfilUsuario(): void {
    this.usuarioService.obtenerPerfil(this.email).subscribe(
      (data) => {
        this.usuario = data;
        console.log('Usuario con rol:', this.usuario);
        console.log('Rol del usuario:', this.usuario.rol); // Acceder al campo "rol"
        //

        //
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        // Aquí podrías mostrar un mensaje de error en la interfaz de usuario si lo deseas.
      }
    );
  }

  regresar() {
    // Redireccionar a la lista de usuarios
    this.router.navigate(['/admin/view-usuarios']);
  }
}
