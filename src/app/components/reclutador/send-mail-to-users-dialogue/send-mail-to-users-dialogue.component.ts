import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmailRService } from 'src/app/service/email-r.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send-mail-to-users-dialogue',
  templateUrl: './send-mail-to-users-dialogue.component.html',
  styleUrls: ['./send-mail-to-users-dialogue.component.css']
})
export class SendMailToUsersDialogueComponent {
  selectedSubject: string = '';
  constructor(
    private emailService: EmailRService,
    public dialogRef: MatDialogRef<SendMailToUsersDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar ,
  ) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  isSending = false;
  sendSuccess = false;
  sendError = false;
  
  ngOnInit() {
    console.log("Estos son los correos:", this.data.emails);
  }

  getDestinatarios(): string {
    return this.data.emails.join(', ');
  }

  onSendClick(): void {
    if (!this.selectedSubject) return;
    this.isSending = true;
    this.sendSuccess = false;
    this.sendError = false;
  
    this.emailService.enviarCorreo(this.data.emails, this.selectedSubject).subscribe({
      next: (res) => {
        this.isSending = false;
        this.sendSuccess = true;
        console.log("respuesta: ", res);
        this.snackBar.open('Correo enviado exitosamente', 'Cerrar', {
          duration: 3000  
        });
  
        this.dialogRef.close();
      },
      error: (err) => {
        this.isSending = false;
        this.sendError = true;
        console.error("Error al enviar correos: ", err);
      }
    });
  }
    
  }

