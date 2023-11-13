import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { UploadFilesService } from 'src/app/service/upload-files.service';
import { FileDescriptor } from 'src/app/interface/file-descriptor.interface';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  selectedFiles!: FileList;
  progressInfo: { value: number; fileName: string }[] = [];
  message = '';
  filename = '';
  fileInfos!: Observable<FileDescriptor[]>; // Usa la interfaz aquí
  isLoading = false;

  constructor(private uploadService: UploadFilesService) { }

  ngOnInit(): void {
    this.loadFiles(); // Llama a la función para cargar los archivos cuando el componente se inicia
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
    this.progressInfo[index] = { value: 0, fileName: file.name };
  
    // Simula un retraso antes de iniciar la carga real
    setTimeout(() => {
      this.uploadService.upload(file).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progressInfo[index].value = Math.round(100 * (event.loaded / event.total));
          } else if (event.type === HttpEventType.Response) {
            this.loadFiles();  // Actualizar la lista después de cada carga exitosa
            if (index === this.selectedFiles.length - 1) {
              // Simula un retraso después de completar todas las cargas
              setTimeout(() => {
                this.isLoading = false;
                this.message = "Todos los archivos se han subido exitosamente!";
              }, 2000); // 2 segundos de demora
            }
          }
        },
        err => {
          this.progressInfo[index].value = 0;
          this.message = "No se pudo cargar el archivo: " + file.name;
          this.isLoading = false;
        }
      );
    }, 2000); // 2 segundos de demora antes de iniciar la carga
  }

  deleteFile(filename: string): void {
    this.uploadService.deleteFile(filename).subscribe(
      () => {
        this.message = "Archivo eliminado con éxito.";
        this.loadFiles();  // Recargar la lista de archivos después de eliminar uno
      },
      err => {
        this.message = "Error al eliminar el archivo.";
      }
    );
  }

  private loadFiles(): void {
    this.fileInfos = this.uploadService.getFiles().pipe(
      map(files => files.sort((a: { uploadDate: string | number | Date; }, b: { uploadDate: string | number | Date; }) => {
        // Asumiendo que uploadDate es una propiedad de tipo string en formato ISO (por ejemplo, "2020-01-29T12:34:56.000Z")
        // Convertimos las fechas a objetos Date para compararlas
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }).slice(0, 5)) // Tomamos solo los 5 primeros elementos después de ordenar
    );
  }
}