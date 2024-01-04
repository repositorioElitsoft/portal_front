import { Component, Inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { UploadFilesService } from 'src/app/service/upload-files.service';
import { FileDescriptor } from 'src/app/interface/file-descriptor.interface';
import { User } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/service/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {
  selectedFiles!: FileList;
  progressInfo: { value: number; fileName: string }[] = [];
  message = '';
  filename = '';
  fileInfos!: Observable<FileDescriptor[]>;
  isLoading = false;
  usuarioGuardado!: User;
  constructor(private uploadService: UploadFilesService, @Inject(MAT_DIALOG_DATA,) 
  public data: any,
  private dialogRef: MatDialogRef<ViewFilesComponent>
     )  {     this.usuarioGuardado.id = data.userId; }

  ngOnInit(): void {
    this.loadFiles();
  }
  selectFiles(event: any): void {
    this.progressInfo = [];
    this.message = '';
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length > 10) {
      this.message = "Solo se permiten subir hasta 10 archivos.";
      return;
    }
    this.filename = this.selectedFiles.length > 1
      ? `${this.selectedFiles.length} archivos seleccionados`
      : this.selectedFiles[0].name;
  }
  deleteFile(filename: string): void {
    this.uploadService.deleteFile(filename,this.usuarioGuardado.id ?? 0).subscribe(
      () => {
        this.message = "Archivo eliminado con éxito.";
        this.loadFiles();  
      },
      err => {
        this.message = "Error al eliminar el archivo.";
      }
    );
  }
  private loadFiles(): void {
    this.fileInfos = this.uploadService.getFiles(this.usuarioGuardado.id ?? 0).pipe(
      map(files => files.sort((a: { uploadDate: string | number | Date; }, b: { uploadDate: string | number | Date; }) => {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }).slice(0, 20))
    );
  }
  uploadFiles(): void {
    if (!this.selectedFiles) {
      return;
    }
    this.isLoading = true;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(index: number, file: File): void {
    if (!this.usuarioGuardado || this.usuarioGuardado.id === null || this.usuarioGuardado.id === undefined) {
      this.message = "El usuario no tiene un ID válido.";
      return;
    }
    this.progressInfo[index] = { value: 0, fileName: file.name };
    const formData = new FormData();
    formData.append('files', file);
    this.uploadService.upload(formData, this.usuarioGuardado.id).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progressInfo[index].value = Math.round(100 * (event.loaded / event.total));
        } else if (event.type === HttpEventType.Response) {
          this.loadFiles();
          if (index === this.selectedFiles.length - 1) {
            this.isLoading = false;
            this.message = "Todos los archivos se han subido exitosamente!";
          }
        }
      },
      err => {
        console.error("Error al cargar el archivo:", err);
        this.progressInfo[index].value = 0;
        this.message = "No se pudo cargar el archivo: " + file.name;
        this.isLoading = false;
      }
    );
  }
  closeWindow(): void {
    this.dialogRef.close();
  }
}
