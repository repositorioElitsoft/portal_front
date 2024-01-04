import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-view-perfil-usuario',
  templateUrl: './view-perfil-usuario.component.html',
  styleUrls: ['./view-perfil-usuario.component.css']
})
export class ViewPerfilUsuarioComponent implements OnInit {
  rol: string;
  email: string;
  usuario: any = {
    name: '',
    firstLastname: '',
    secondLastname: '',
    rut: '',
    email: '',
    password: '',
    phone: '',
    linkedin: '',
  };
  constructor(private route: ActivatedRoute, private userService: UserService, private router:Router) {
    this.email = '';
    this.rol = '';
   }
  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];

    this.userService.obtenerRolUsuario(this.usuario.email).subscribe(
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
    this.userService.obtenerPerfil(this.email).subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }
  regresar() {
    this.router.navigate(['/admin/view-usuarios']);
  }
}
