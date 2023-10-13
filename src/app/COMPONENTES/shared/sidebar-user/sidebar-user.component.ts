import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';
import { MatDialog } from '@angular/material/dialog';  // Importar correctamente MatDialog


@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css'],
  
})
export class SidebarUserComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
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
        console.log(data);
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
    // Tu código para abrir el diálogo
  }

  cerrarSesion(): void {
    // Tu código para cerrar la sesión
  }
}
