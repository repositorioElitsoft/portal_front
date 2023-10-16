import { Component, OnInit } from '@angular/core';
import { ReclutadorService } from 'src/app/service/reclutador.service';


@Component({
  selector: 'app-profile-r',
  templateUrl: './profile-r.component.html',
  styleUrls: ['./profile-r.component.css']
})
export class ProfileRComponent implements OnInit {


 // perfilr: any;
 perfilr: any = {
    usr_nom: this.usr_nom,
    usr_ap_pat: '',
    usr_ap_mat: '',
    usr_rut: '',
    email: '',
     };

  constructor(private reclutadorService: ReclutadorService) { }

    ngOnInit(): void {
      // Obtener el perfil del usuario admin
      const email = 'juan.perez4@example.com'; // Reemplaza con el email del usuario admin
      this.reclutadorService.obtenerPerfilr(email).subscribe(
        (data: any) => {
          this.perfilr = data;
        },
        (error) => {
          console.error('Error al obtener el perfil', error);
        }
      );
    }
   


}



