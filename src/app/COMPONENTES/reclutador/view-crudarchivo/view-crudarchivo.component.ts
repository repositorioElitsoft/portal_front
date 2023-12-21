import {Component, Inject} from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UploadFilesComponent } from '../../upload-files/upload-files.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewFilesComponent } from '../../view-files/view-files.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: './view-crudarchivo.component.html',
    standalone: true,
    imports: [MatListModule],
  })
  export class viewCrudArchivoComponent {
    constructor(private _bottomSheetRef: MatBottomSheetRef<viewCrudArchivoComponent>
      ,private usuarioService: UsuarioService,
      public dialog: MatDialog,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        const userId = data.userId;
        console.log('User ID en el componente hijo:', userId);}
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }
    downloadCv(): void {
      // Accede a userId directamente desde this.data.userId
      const userId = this.data.userId;
    
      // Luego, puedes usar userId en tu lógica de descarga
      console.log('usuarioId', userId);
    
      this.usuarioService.downloadCv(userId).subscribe(
        (data: Blob) => {
          const url = window.URL.createObjectURL(data);
          window.open(url, '_blank');
          // console.log('data:', data);
        },
        (error) => {
          // Manejo de errores
        }
      );
    }
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string, userId: string): void {
      console.log('User ID en openDialog:', userId);
    
      this.dialog.open(UploadFilesComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { userId: userId }
      });
    }
    openDialogVerArchivos(enterAnimationDuration: string, exitAnimationDuration: string, userId: string): void {
      console.log('User ID en openDialog:', userId);
    
      this.dialog.open(ViewFilesComponent, {
        width: '700px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { userId: userId }
      });
    }
  }

  