
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { PreguntaService } from 'src/app/SERVICE/pregunta.service';

//se declara fuera de la clase de forma global
let vecesEnviado = 0;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  examenId:any;
  preguntas:any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  preguntasTotales = 0;

  esEnviado = false;
  timer:any;
  examen: any;
  intentosTotales: any;
  vecesEnviado: number = 0;
  enviosTotales = 0;
  


  

  constructor(
    private locationSt:LocationStrategy,
    private route:ActivatedRoute,
    private preguntaService:PreguntaService   
      ) { }

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    console.log(this.examenId);
    this.cargarPreguntas();
   
  }

  
  cargarPreguntas(){
    this.preguntaService.listarPreguntasDelExamenParaLaPrueba(this.examenId).subscribe(
      (data:any) => {
        console.log(data);
        //this.preguntas = data;
        this.preguntas = this.shuffleArray(data).slice(0, 5);
       
        this.timer = this.preguntas.length * 60;

        this.preguntas.forEach((p:any) => {
          p['respuestaDada'] = '';
        })
        console.log(this.preguntas);
        this.iniciarTemporizador();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar las preguntas de la prueba','error');
      }
    )
  }

  shuffleArray(array: any[]) {
    let currentIndex = array.length;
    let temporaryValue: any;
    let randomIndex: number;
  
    // While there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  

  iniciarTemporizador(){
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.evaluarExamen();
        clearInterval(t);
      }else{
        this.timer --;
      }
    },1000)
  }

  prevenirElBotonDeRetroceso(){
    history.pushState(null,null!,location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null,null!,location.href);
    })
  }

  enviarCuestionario(){
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Enviar',
      icon:'info'
    }).then((e) => {
      if(e.isConfirmed){
        this.evaluarExamen();
        vecesEnviado++;
        
        this.vecesEnviado = vecesEnviado;
       // this.enviosTotales = this.vecesEnviado;
        
        
      }
    })
  }

  evaluarExamen(){

   /*  this.preguntaService.evaluarExamen(this.preguntas).subscribe(
      (data:any) => {
        console.log(data);
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;
        this.intentosTotales = data.intentosTotales;
        //this.intentos ++;
        this.esEnviado = true;

        // Incrementar la variable vecesEnviado
        this.vecesEnviado++;
        this.enviosTotales = this.vecesEnviado;
      },
      (error) => {
        console.log(error);

      }
      
      
    ) */
    
    this.esEnviado = true;
    
    this.preguntas.forEach((p:any) => {
      if(p.respuestaDada == p.respuesta){
        this.respuestasCorrectas ++;
        let puntos = this.preguntas[0].examen.puntosMaximos/this.preguntas.length;
        this.puntosConseguidos += puntos;
      }

      if(p.respuestaDada.trim() != ''){
        this.preguntasTotales ++;
       
      }
    });
    //const newLocal = this.enviosTotales = this.vecesEnviado;
    console.log("Respuestas correctas : " + this.respuestasCorrectas);
    console.log("Puntos conseguidos : " + this.puntosConseguidos);
    console.log("Intentos : " + this.preguntasTotales);
    console.log(this.preguntas); 
  }

  obtenerHoraFormateada(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60;
    return `${mm} : min : ${ss} seg`;
  }

  imprimirPagina(){
    window.print();
  }
}

function ViewChild(arg0: string): (target: StartComponent, propertyKey: "examPage") => void {
  throw new Error('Function not implemented.');
}
