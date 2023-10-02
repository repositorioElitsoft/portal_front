import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/interface/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisService } from 'src/app/service/pais.service';
import { Pais } from 'src/app/interface/pais.interface';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @ViewChild('btnradio1', { static: true }) btnradio1!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio2', { static: true }) btnradio2!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio3', { static: true }) btnradio3!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio4', { static: true }) btnradio4!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio5', { static: true }) btnradio5!: ElementRef<HTMLInputElement>;


  usuarioNuevo:Usuario={
    usr_rut: '',
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_email: '',
    usr_pass: '',
    usr_tel: '',
    usr_url_link: '',
    pais: {
      pais_id: undefined,
      pais_nom: ''
    },
    pais_nom: ''
  };

  constructor(private usuarioService: UsuarioService, private paisService: PaisService, private toastr:ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateToRoute(route: string) {
    // Navegamos a la ruta proporcionada
    this.router.navigate([route]);
  }

  // Agregamos eventos a cada radio button y navegamos a la ruta correspondiente
  onRadio1Change() {
    this.navigateToRoute('/datos_personales');
  }

  onRadio2Change() {
    this.navigateToRoute('/herramientas-tecnologias');
  }

  onRadio3Change() {
    this.navigateToRoute('/informacion-academica');
  }

  onRadio4Change() {
    this.navigateToRoute('/informacion-laboral');
  }

  onRadio5Change() {
    this.navigateToRoute('/cargo-usuario');
  }

  agregarUsuario() {
    this.paisService.obtenerPaisPorNombre(this.usuarioNuevo.pais_nom).subscribe(
      (pais: Pais) => {
        // Asignar el objeto Pais al usuarioNuevo
        this.usuarioNuevo.pais = pais;

        // Llamar al servicio UsuarioService para guardar el usuario
        this.usuarioService.saveUsuario(this.usuarioNuevo).subscribe(
          (res: any) => {
            console.log(res);
            this.toastr.success('Datos personales guardados');
            // Navegar a la página de Herramientas y Tecnologías y pasar el id de usuario como query parameter
            this.router.navigate(['/herramientas-tecnologias'], {
              relativeTo: this.route,
              queryParams: { usr_id: res.usr_id }
            });
          },
          (err: any) => console.log(err)
        );
      },
      (err: any) => console.log(err)
    );
  }







}
