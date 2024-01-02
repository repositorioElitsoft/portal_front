import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { ExamenService } from 'src/app/service/examen.service';
import 'chartjs-plugin-annotation';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DatosPersonalesComponent } from 'src/app/COMPONENTES/user/datos-personales/datos-personales.component';


//se declara fuera de la clase de forma global
let vecesEnviado = 0;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  examenId :number=0;
  preguntas?:any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  preguntasTotales = 0;
  idUser: number = 0;
  esEnviado = false;
  timer:any;
  examen!: any;
  intentosTotales: any;
  vecesEnviado: number = 0;
  enviosTotales = 0;
  resultadosExamenes: number[] = [];
  resultados: any[] = [];   
  constructor(
    private locationSt:LocationStrategy,
    private route:ActivatedRoute,
    private preguntaService:PreguntaService,
    private examenService:ExamenService,
    private usuarioService: UsuarioService
      ) { }

  ngOnInit(): void {
    
    this.usuarioService.obtenerUsuarioGuardado().subscribe(
      (usuarioGuardado ) => {
        if (usuarioGuardado) {
          this.idUser = usuarioGuardado.usr_id ?? 0;
          console.log('ID del usuario:', this.idUser);
        }
        this.prevenirElBotonDeRetroceso();
        this.examenId = this.route.snapshot.params['exam_id'];
        console.log(this.examenId);
        this.cargarPreguntas();
        this.obtenerResultados();
      },
      (error) => {
        console.error('Error al obtener el usuario guardado:', error);
      }
    );
  }
  ngAfterViewInit(): void {
    this.mostrarGrafico() ;
  }
  obtenerResultados() {
    this.usuarioService.obtenerResultados().subscribe(
      (data) => {
        this.resultados = data;
        console.log('Data:',data);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
  mostrarGrafico(): void {
    setTimeout(() => {
      const canvas = document.getElementById('resultadoExamenGrafico') as HTMLCanvasElement;
      if (canvas) {
        canvas.width = 800; // Ajusta según tus necesidades
        canvas.height = 600; // Ajusta según tus necesidades
        const ctx = canvas.getContext('2d');
        const dataParaMostrar: any = [];
        console.log("resultados:", this.resultados);
  
        // Filtra los resultados del usuario y examen
        const resultadosFiltrados = this.resultados.filter(resultado => {
          console.log("resultados:", resultado.usuarioId);
          return resultado.usuarioId === this.idUser;
        });
  
        // Filtra los resultados para el examen específico incluyendo el examen actual
        const examenesFiltrados = resultadosFiltrados.filter(resultado => {
          console.log("id examen:", this.examenId);
          console.log("id examen 2:", resultado.examen.examenId);
          return String(resultado.examen.examenId) === String(this.examenId);
        });
        this.vecesEnviado = examenesFiltrados.length;
  
        console.log("examenes filtrados:", examenesFiltrados);
        console.log("resultados filtrados:", resultadosFiltrados);
  
        // Toma los últimos 3 exámenes, incluyendo el examen actual
        const ultimosTresExamenes = examenesFiltrados.slice(-3);
  
        ultimosTresExamenes.forEach(resultado => {
          dataParaMostrar.push(resultado.resultadosExamen);
        });
        console.log("datos para mostrar:", dataParaMostrar);
        const labelsConPuntos = dataParaMostrar.map((valor: string) => valor + ' puntos');
        const puntuacionMaxima = examenesFiltrados[0]?.examen.puntuacionMaxima; 
  
        if (ctx) {
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labelsConPuntos,
              datasets: [{
                label: 'Resultados de tus ultimos 3 examenes realizados',
                data: dataParaMostrar,
                backgroundColor: ['orange'],
                borderColor: ['grey', '#F57C27'],
                borderWidth: 1,
                barThickness: 70
              }],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,
                  max: puntuacionMaxima,
                  title: {
                    display: true,
                    text: 'Puntuacion Maxima',
                    color: '#666',
                    font: {
                      size: 11,
                      weight: 'bold',
                    }
                  },
                },
                x: {
                  beginAtZero: true,
                  min: 0,
                  max: 10,
                  title: {
                    display: true,
                    text: 'Puntuacion Conseguida',
                    color: '#666',
                    font: {
                      size: 11,
                      weight: 'bold',
                    }
                  },
                }
              },
              plugins: {
                legend: {
                  labels: {
                    color: 'black',
                    font: {
                      size: 14
                    }
                  }
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
                annotation: {
                  annotations: {
                    line1: {
                      type: 'line',
                      yMin:  0,
                      yMax: 100,
                      borderColor: 'red',
                      borderWidth: 2,
                      borderDash: [6, 6]
                    }
                  }
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              aspectRatio: 2
            }
          });
        } else {
          console.error('No se pudo obtener el contexto del canvas');
        }
      } else {
        console.error('Elemento canvas no encontrado');
      }
    }, 1);
  }
  cargarPreguntas(){
    this.examenService.obtenerExamen(this.examenId).subscribe({
      next: (data)=>{
        this.examen = data
        console.log(this.examen)
      },
      error: (err) =>{
        console.log(err)
      }
    })
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
        cancelButtonColor: '#515151',
        confirmButtonColor: '#F57C27',
        icon: 'info',
        customClass: {
            popup: 'custom-border' // Aplica la clase al cuadro de diálogo
        }
    }).then((e) => {
      if(e.isConfirmed){

        this.evaluarExamen();

        const resultados = {
          resultadosExamen:this.puntosConseguidos,
          tiempo: Math.abs(100-this.timer),
          examen:{
            examenId: this.examenId
          }
        }

        this.preguntaService.guardarResultados(resultados).subscribe({
          next:(respuesta)=>{
          console.log("Resultados")
          console.log(respuesta)
          },
          error:(err)=>{
          console.log("hay un error")
          console.log(err)

          }
        })
        vecesEnviado++;
        this.vecesEnviado = vecesEnviado;
       // this.enviosTotales = this.vecesEnviado;
      }
    })
  }
  evaluarExamen(){
    this.esEnviado = true;
      
    console.log("preguntas", this.preguntas)
    this.preguntas.forEach((p:any) => {
      console.log("The p es", p)

      if(p.respuestaDada == p.respuesta){
        this.respuestasCorrectas ++;
        console.log("resp corretas:",this.respuestasCorrectas)
        let puntos = this.examen.puntosMaximos/this.preguntas.length;
        console.log("this.examen.puntosMaximos: ",this.examen.puntosMaximos)
        this.puntosConseguidos += puntos;
        console.log("conseguidos: ",this.puntosConseguidos)
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
    this.mostrarGrafico()
    
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



