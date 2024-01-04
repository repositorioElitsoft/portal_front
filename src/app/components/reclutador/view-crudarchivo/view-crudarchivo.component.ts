import {Component, Inject} from '@angular/core';
import {MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { UserService } from 'src/app/service/user.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewFilesComponent } from '../view-files/view-files.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: './view-crudarchivo.component.html',
    standalone: true,
    imports: [MatListModule],
  })
  export class viewCrudArchivoComponent {
    constructor(private _bottomSheetRef: MatBottomSheetRef<viewCrudArchivoComponent>
      ,private userService: UserService,
      public dialog: MatDialog,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
        const userId = data.userId;
       }
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }
    downloadCv(): void {
      const userId = this.data.userId;
      this.userService.downloadCv(userId).subscribe(
        (data: Blob) => {
          const url = window.URL.createObjectURL(data);
          window.open(url, '_blank');
        },
        (error) => {
        }
      );
    }
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string, userId: string): void {
      this.dialog.open(UploadFilesComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { userId: userId }
      });
    }
    openDialogVerArchivos(enterAnimationDuration: string, exitAnimationDuration: string, userId: string): void {
      this.dialog.open(ViewFilesComponent, {
        width: '700px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { userId: userId }
      });
    }
  }

  