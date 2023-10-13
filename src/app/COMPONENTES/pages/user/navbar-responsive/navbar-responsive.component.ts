import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf, NgFor} from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';
import {MatMenuModule} from '@angular/material/menu';



@Component({
  selector: 'app-navbar-responsive',
  templateUrl: './navbar-responsive.component.html',
  styleUrls: ['./navbar-responsive.component.css'],
  standalone: true,
  imports: [
    NgIf,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    NgFor,
  ],
})
export class NavbarResponsiveComponent implements OnInit  {
  mobileQuery: MediaQueryList;



  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    public login:LoginService,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1300px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }
 
  categorias:any;



  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data:any) => {
        console.log(data);
        this.categorias = data;
      },
      (error) => {
        console.log(error);
        this.snack.open('Error al cargar las categorías','',{
          duration:3000
        })
        console.log(error);
      }
    )
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;


  cerrarSesion(): void {
    const confirmacion = window.confirm('¿Deseas cerrar la sesión?');

    if (confirmacion) {
      // Realiza las acciones para cerrar la sesión aquí
      // Por ejemplo, puedes eliminar la cookie de autenticación o realizar una solicitud HTTP al servidor para cerrar la sesión.

      // Ejemplo: Elimina una cookie llamada 'token'
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirige al usuario a la página de inicio de sesión
      window.location.href = '/iniciar-sesion';
    } else {
      console.log('Sesión no cerrada.');
    }
  }

  
}


