import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicaService } from 'src/app/service/academica.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from '../../interface/user.interface'
import { Academica } from 'src/app/interface/academica.interface';

@Component({
  selector: 'app-informacion-academica',
  templateUrl: './informacion-academica.component.html',
  styleUrls: ['./informacion-academica.component.css']
})
export class InformacionAcademicaComponent implements OnInit {

  @ViewChild('btnradio1', { static: true }) btnradio1!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio2', { static: true }) btnradio2!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio3', { static: true }) btnradio3!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio4', { static: true }) btnradio4!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio5', { static: true }) btnradio5!: ElementRef<HTMLInputElement>;

  usuario: Usuario = {
    usr_id: -1,
    usr_rut: '',
    usr_nom: '',
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_email: '',
    usr_pass: '',
    usr_tel: '',
    usr_url_link: '',
    pais_nom: '',
    pais: { pais_id: undefined,
            pais_nom: '' } // Asegúrate de tener una instancia de Pais aquí
  };

    academica:Academica = {
    inf_acad_id:-1,
    titl:'',
    inf_acad_nom_esc: '',
    inf_acad_fec_ini:new Date(),
    inf_acad_fec_fin:new Date(),
    inf_acad_est:'',
    usr_id:-1
    }

    minFecha: string =''; // Representa la fecha mínima permitida
    selectedEstadoAcademico: string = '';



  constructor(private usuarioService:UsuarioService , private academicaService:AcademicaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const usr_id = params['usr_id'];
      console.log(usr_id)
      this.usuario.usr_id = usr_id
      if (usr_id) {
        this.academica.usr_id = usr_id;
        if (typeof usr_id === 'number') { // Verificar si usr_id es un número
          this.obtenerDatosUsuario(usr_id);
        }
      }
    });
    //const fechaActual = new Date();
    this.minFecha = '1950-01-01';
  }

  obtenerDatosUsuario(usuarioId: number) {
    this.usuarioService.obtenerUsuarioPorId(usuarioId).subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario; // Almacena los datos del usuario
      },
      (error) => {
        console.log('Error al obtener los datos del usuario:', error);
      }
    );
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


  // Método para guardar información académica
  guardarInformacionAcademica() {
    // Asignar el valor seleccionado del combobox
    this.academica.inf_acad_est = this.selectedEstadoAcademico;

      // Formatear la fecha antes de guardar
    const fechaInicio = new Date(this.academica.inf_acad_fec_ini);
    const fechaFin = new Date(this.academica.inf_acad_fec_fin);

    // Guardar la fecha formateada en el objeto academica
    this.academica.inf_acad_fec_ini = fechaInicio; // No se necesita .toISOString() aquí
    this.academica.inf_acad_fec_fin = fechaFin;

    // Verificamos si tenemos un usuario válido antes de guardar
    if (!this.usuario || this.usuario.usr_id === undefined) {
      console.log('No se encontró un usuario válido.');
      return;
    }
    this.academicaService.guardarAcademica(this.academica, this.usuario.usr_id).subscribe(
      (nuevaAcademica: Academica) => {
        // Aquí puedes hacer lo que necesites después de guardar la información
        console.log('Información académica guardada:', nuevaAcademica);
      },
      (error) => {
        console.log('Error al guardar la información académica:', error);
      }
    );
  }

}
