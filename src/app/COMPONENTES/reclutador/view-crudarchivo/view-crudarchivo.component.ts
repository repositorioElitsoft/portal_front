import {Component} from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UploadFilesComponent } from '../../upload-files/upload-files.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: './view-crudarchivo.component.html',
    standalone: true,
    imports: [MatListModule],
  })
  export class viewCrudArchivoComponent {
    constructor(private _bottomSheetRef: MatBottomSheetRef<viewCrudArchivoComponent>
      ,private usuarioService: UsuarioService,
      public dialog: MatDialog,) {}
  
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }


    downloadCv(event: any) {
      console.log('usuarioId', event.target?.parentElement)
      const userId = event.target?.parentElement.id
      this.usuarioService.downloadCv(userId).subscribe(
        (data: Blob) => {
          const url = window.URL.createObjectURL(data);
          window.open(url, '_blank');
          // console.log('data:', data);
        },
        (error) => {
          
        }
      )
    }
  
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(UploadFilesComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  


    
    
  }

  