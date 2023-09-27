import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboralService } from 'src/app/service/laboral.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { Usuario } from '../../interface/user.interface'
import { Herramientas } from 'src/app/interface/herramientas.interface';
import { Laboral } from 'src/app/interface/laboral.interface';


@Component({
  selector: 'app-informacion-laboral',
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css']
})
export class InformacionLaboralComponent implements OnInit {

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
    pais: { pais_id: undefined, pais_nom: '' }
  };

  laboral: Laboral = {
    inf_lab_id: -1,
    inf_lab_crg_emp: '',
    inf_lab_emp: '',
    inf_lab_act: '',
    inf_lab_fec_ini: new Date(),
    inf_lab_fec_fin: new Date(),
    usr_id: -1,
    herr_usr_id: -1,
  };

  herramientas: Herramientas = {
    herr_usr_id: -1,
    herr_usr_anos_exp: '',
    herr_usr_vrs: '',
    cat_prod_id: -1,
    prd_id: -1,
    cert_id: -1,
    nvl_id: -1,
    usr_id: -1,
    prd_nom: ''
  }

  minFecha: string = '';

  herramientasA: Herramientas[] = []; // Lista de herramientas disponibles
  herramientasSeleccionadas: Herramientas[] = [];
  burbujas: { id: number, nombre: string }[] = [];

  constructor(private usuarioService: UsuarioService, private herramientaService:HerramientasService, private laboralService: LaboralService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const usr_id = params['usr_id'];
      console.log(usr_id)
      this.usuario.usr_id = usr_id
      if (usr_id) {
        this.laboral.usr_id = usr_id;
        if (typeof usr_id === 'number') {
          this.obtenerDatosUsuario(usr_id);
          this.cargarHerramientasConProductos(usr_id);
          console.log(this.cargarHerramientasConProductos);

        }
      }
      this.minFecha = '1950-01-01';
    });
  }

  obtenerDatosUsuario(usuarioId: number) {
    this.usuarioService.obtenerUsuarioPorId(usuarioId).subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
      },
      (error) => {
        console.log('Error al obtener los datos del usuario:', error);
      }
    );
  }

  cargarHerramientasConProductos(usuarioId: number) {
    this.herramientaService.obtenerHerramientasConProductosPorUsuario(usuarioId).subscribe(
      (herramientas: Herramientas[]) => {
        this.herramientasA = herramientas; // Almacenar la lista de herramientas disponibles
      },
      (error) => {
        console.error('Error al cargar herramientas con productos:', error);
      }
    );
  }

  agregarHerramientaSeleccionada(herramienta: Herramientas) {
    if (!this.herramientasSeleccionadas.some(h => h.herr_usr_id === herramienta.herr_usr_id)) {
      this.herramientasSeleccionadas.push(herramienta);
    }
  }



  guardarLaboral() {
    if (!this.usuario || this.usuario.usr_id === undefined || this.herramientas.herr_usr_id === undefined) {
      console.log('Usuario o herramienta no seleccionados.');
      return;
    }

    this.laboral.usr_id = this.usuario.usr_id;
    this.laboral.herr_usr_id = this.herramientas.herr_usr_id;

    const herramientaSeleccionada = this.herramientasA.find(h => h.herr_usr_id === this.herramientas.herr_usr_id);

    if (herramientaSeleccionada && herramientaSeleccionada.producto) {
      this.burbujas.push({ id: herramientaSeleccionada.herr_usr_id || 0, nombre: herramientaSeleccionada.producto.prd_nom || '' });
    }

    this.laboralService.guardarLaboral(this.laboral, this.usuario.usr_id, this.herramientas.herr_usr_id).subscribe(
      (laboralGuardada: Laboral) => {
        console.log('Información laboral guardada:', laboralGuardada);
        // Clear selected tool after saving
        this.herramientas.herr_usr_id = undefined;
        this.herramientasSeleccionadas = [];
      },
      (error) => {
        console.error('Error al guardar información laboral:', error);
      }
    );
  }

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }

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

}
