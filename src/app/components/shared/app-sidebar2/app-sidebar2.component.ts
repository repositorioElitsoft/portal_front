import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';
import { MatDialog } from '@angular/material/dialog';  //
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CerrarSesionComponent } from '../../login/cerrar-sesion/cerrar-sesion.component';
@Component({
  selector: 'app-app-sidebar2',
  templateUrl: './app-sidebar2.component.html',
  styleUrls: ['./app-sidebar2.component.css']
})
export class AppSidebar2Component implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,

    public dialog: MatDialog,
    private router: Router, private cookieService: CookieService,
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
