import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { CerrarSesionComponent } from '../../shared/cerrar-sesion/cerrar-sesion.component';

@Component({
  selector: 'app-sidebar-e-responsive',
  templateUrl: './sidebar-e-responsive.component.html',
  styleUrls: ['./sidebar-e-responsive.component.css']
})
export class SidebarEResponsiveComponent {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private snack: MatSnackBar,
    public login: LoginService,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1300px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

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
