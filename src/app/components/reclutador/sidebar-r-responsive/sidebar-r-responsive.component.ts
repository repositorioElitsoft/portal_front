import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';
import { MatDialog } from '@angular/material/dialog';  //
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CerrarSesionComponent } from '../../login/cerrar-sesion/cerrar-sesion.component';
@Component({
  selector: 'app-sidebar-r-responsive',
  templateUrl: './sidebar-r-responsive.component.html',
  styleUrls: ['./sidebar-r-responsive.component.css']
})
export class SidebarRResponsiveComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private router: Router,private cookieService: CookieService,
    private snack: MatSnackBar,
    public login: LoginService,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1300px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  categorias: any;
  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },
      (error) => {
        console.log(error);
        this.snack.open('Error al cargar las categorías', '', {
          duration: 3000,
        });
        console.log(error);
      }
    );
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = true;
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CerrarSesionComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
