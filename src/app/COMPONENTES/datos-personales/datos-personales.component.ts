import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario, UsuarioService } from 'src/app/SERVICE/usuario.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  Usuario:any;

  constructor(private usuarioService: UsuarioService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  agregarUsuario(){

    const USUARIO: Usuario = {
      id_usuario: this.Usuario.get('id_usuario')?.value,
      usr_rut: this.Usuario.get('usr_rut')?.value,
      usr_nom: this.Usuario.get('usr_nom')?.value,
      usr_ap_pat: this.Usuario.get('usr_ap_pat')?.value,
      usr_ap_mat: this.Usuario.get('usr_ap_mat')?.value,
      usr_email: this.Usuario.get('usr_email')?.value,
      usr_pass: this.Usuario.get('usr_pass')?.value,
      usr_tel: this.Usuario.get('usr_tel')?.value,
      usr_url_link: this.Usuario.get('usr_url_link')?.value,
      pais_id: this.Usuario.get('pais_id')?.value
    }

    this.usuarioService.saveUsuario(USUARIO).subscribe(
      res=>{
        console.log(res)
        this.toastr.success('Datos personales guardados')

      },
      err=>console.log(err)

    );

}
}
