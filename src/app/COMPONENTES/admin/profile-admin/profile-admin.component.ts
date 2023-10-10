import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {


  perfil: any = {
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_rut: '',
    email: '',
     };

  constructor(private usuarioService: UsuarioService) { }
  
    ngOnInit(): void {
      // Obtener el perfil del usuario admin
      const email = 'admin@ejemplo.com'; // Reemplaza con el email del usuario admin
      this.usuarioService.obtenerPerfil(email).subscribe(
        (data: any) => {
          this.perfil = data;
        },
        (error) => {
          console.error('Error al obtener el perfil', error);
        }
      );
    }

  //  ngOnInit(): void {
  //    // Obtener usuario desde localStorage
  //    const usuario = this.usuarioService.obtenerUsuarioDesdeLocalStorage();
    
  //    if (usuario && usuario.email) {
  //      // Obtener perfil del usuario por email
  //      this.usuarioService.obtenerPerfil(usuario.email).subscribe(
  //        (data: any) => {
  //          this.perfil = data;
  //        },
  //        (error) => {
  //          console.error('Error al obtener el perfil', error);
  //        }
  //      );
  //    }
  //  }
}
