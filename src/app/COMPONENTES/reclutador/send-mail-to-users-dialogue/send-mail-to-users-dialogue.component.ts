import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmailRService } from 'src/app/service/email-r.service';
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
  ) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSendClick(): void{
    if(!this.selectedSubject) return;
    this.emailService.enviarCorreo(this.data.emails, this.selectedSubject).subscribe({
      next:(res)=>{
        console.log("respuesta: ", res)
        this.dialogRef.close();
      },
      error:(err)=>{
        if (!err.status) return;
        if(err.status === 200){
          console.log("respuesta: ", err)
          this.dialogRef.close();
          return
        }
        console.log("Error al enviar correos: ",err)
      }
    });
  }
}
