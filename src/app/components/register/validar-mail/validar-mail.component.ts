import { Component } from '@angular/core';
import { ValidarMailService } from 'src/app/service/validar-mail.service';

@Component({
  selector: 'app-validar-mail',
  templateUrl: './validar-mail.component.html',
  styleUrls: ['./validar-mail.component.css']
})
export class ValidarMailComponent {
  verified: boolean = false
  verificationFailed: boolean = false
  constructor(
    private validarEmailService: ValidarMailService  ){}

  ngOnInit(){
    this.validarEmailService.verificarEmail().subscribe({
      next:(res)=>{
        console.log(res.status)
        if(res.status !== 200) {
          this.verified = true
          return
        }
        this.verificationFailed = true;
        return
      },
      error:(err)=>{
        console.log(err.status)
        console.log(err)
        this.verificationFailed = true;
      }
    })
  }
}
