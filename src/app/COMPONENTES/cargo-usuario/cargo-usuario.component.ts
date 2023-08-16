import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CargosElitsoft, CargosElitsoftService } from 'src/app/SERVICE/cargos-elitsoft.service';
import { CargoUsuario, CargosUsuarioService } from 'src/app/SERVICE/cargos-usuario.service';
import { Usuario, UsuarioService } from 'src/app/SERVICE/usuario.service';

@Component({
  selector: 'app-cargo-usuario',
  templateUrl: './cargo-usuario.component.html',
  styleUrls: ['./cargo-usuario.component.css']
})
export class CargoUsuarioComponent implements OnInit {

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

  cargo: CargoUsuario = {
    crg_usr_id:-1,
    crg_usr_pret:'',
    usr_id:-1
  }

  cargoElitsoft: CargosElitsoft ={
    crg_elit_id:-1,
    crg_elit_nom:''
  }

  cargosElitsoft: CargosElitsoft[] = [];

  selectedCargoElitsoft:number | undefined;

  constructor(private usuarioService: UsuarioService, private cargosusuarioService:CargosUsuarioService, private cargoselitsoftService:CargosElitsoftService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const usr_id = params['usr_id'];
      console.log(usr_id)
      this.usuario.usr_id = usr_id
      if (usr_id) {
        this.cargo.usr_id = usr_id;
        if (typeof usr_id === 'number') { // Verificar si usr_id es un número
          this.obtenerDatosUsuario(usr_id);
        }
      }
      this.obtenerCargosElitsoft();
    });
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

    obtenerCargosElitsoft() {
      this.cargoselitsoftService.obtenerListaCargosElitsoft().subscribe(
        (data: CargosElitsoft[]) => {
          this.cargosElitsoft = data;
          console.log('Cargos cargados:', this.cargosElitsoft);
        },
        (error) => {
          console.log('Error al obtener niveles:', error);
        }
      );
    }

    guardarCargo(){
      // Verificamos si se ha seleccionado un cargo
    if (!this.selectedCargoElitsoft) {
      console.log('Seleccione un cargo antes de guardar.');
      return;
    }
    // Verificamos si tenemos un usuario válido antes de guardar
    if (!this.usuario || this.usuario.usr_id === undefined) {
      console.log('No se encontró un usuario válido.');
      return;
    }
    // Completamos los datos del cargo con las selecciones
    this.cargoElitsoft.crg_elit_id = this.selectedCargoElitsoft;

    // Llamamos al servicio para guardar el cargo
    this.cargosusuarioService.guardarCargo(this.cargo, this.usuario.usr_id).subscribe(
      (nuevoCargo: CargoUsuario) => {
        console.log('Cargo guardado exitosamente:', nuevoCargo);
        // Puedes redirigir al usuario a otra página o realizar alguna otra acción después de guardar.
      },
      (error) => {
        console.log('Error al guardar herramienta:', error);
      }
    );
    }



}
