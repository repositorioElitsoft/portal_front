import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar
import { TableHerramientasComponent } from '../../shared/table-herramientas/table-herramientas.component';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { ToolDTO } from 'src/app/interface/herramientas.interface';
import { Certification } from 'src/app/interface/certificacion.interface';

@Component({
  selector: 'app-tool-certifications-dialog',
  templateUrl: './tool-certifications-dialog.component.html',
  styleUrls: ['./tool-certifications-dialog.component.css']
})
export class ToolCertificationsDialogComponent {

  isUploadingFile: boolean = false;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TableHerramientasComponent>,
    private toolService: HerramientasService,
    private snackBar: MatSnackBar, // Inyecta MatSnackBar
    @Inject(MAT_DIALOG_DATA) public tool: ToolDTO,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCertification(certId: number | undefined){
    this.toolService.deleteToolCertification(this.tool.id,certId).subscribe({
      next:(res: any)=>{
        console.log("Deleted certification: ", res)
        this.tool.certifications = this.tool.certifications?.filter(cert => cert.id !== certId);
        this.snackBar.open('Certificación borrada exitosamente', 'Cerrar', {
          duration: 2000, // Duración en milisegundos
          panelClass: ['snackbar-success'], // Clase CSS personalizada para el estilo del Snackbar
        });
      },
      error:(err: Error)=>{
        console.log("Error at deleting certification:", err);
      }
    });
  }

  addCertification(){
    const inputNode: any = document.querySelector('#file');
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
      const formData: FormData = new FormData();
      formData.append('file', inputNode.files[0]);
      this.isUploadingFile = true;
      this.uploadSuccess = false;
      this.uploadError = false;
      this.toolService.addToolCertification(this.tool.id, formData).subscribe({
        next: (response) => {
          this.isUploadingFile = false;
          console.log("Uploaded successfully")
          this.tool = response;
          this.uploadSuccess = true;
        },
        error: (err) => {
          console.log("Error al subir certificación", err);
          this.isUploadingFile = false;
          this.uploadError = true;
        }
      });
    }
  }
}
