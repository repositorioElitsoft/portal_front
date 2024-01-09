import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';
import { PreguntaService } from 'src/app/service/pregunta.service';
import 'chartjs-plugin-annotation';
import { UserService } from 'src/app/service/user.service';
import { ProductoService } from 'src/app/service/producto.service';
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
    private productService:ProductoService,
    private userService: UserService
      ) { }
  ngOnInit(): void {
    this.userService.obtenerUsuarioGuardado().subscribe(
      (usuarioGuardado ) => {
        if (usuarioGuardado) {
          this.idUser = usuarioGuardado.id ?? 0;
        }
        this.prevenirElBotonDeRetroceso();
        this.examenId = this.route.snapshot.params['exam_id'];
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
    this.userService.obtenerResultados().subscribe(
      (data) => {
        this.resultados = data;
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
        canvas.width = 800; 
        canvas.height = 600; 
        const ctx = canvas.getContext('2d');
        const dataParaMostrar: any = [];
        const resultadosFiltrados = this.resultados.filter(resultado => {
          return resultado.usuarioId === this.idUser;
        });
        const examenesFiltrados = resultadosFiltrados.filter(resultado => {
          return String(resultado.examen.examenId) === String(this.examenId);
        });
        this.vecesEnviado = examenesFiltrados.length;
        const ultimosTresExamenes = examenesFiltrados.slice(-3);
        ultimosTresExamenes.forEach(resultado => {
          dataParaMostrar.push(resultado.resultadosExamen);
        });
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
    this.productService.obtenerExamen(this.examenId).subscribe({
      next: (data)=>{
        this.examen = data
      },
      error: (err) =>{
        console.log(err)
      }
    })
    this.preguntaService.listarPreguntasDelExamenParaLaPrueba(this.examenId).subscribe(
      (data:any) => {
        this.preguntas = this.shuffleArray(data).slice(0, 5);
        this.timer = this.preguntas.length * 60;
        this.preguntas.forEach((p:any) => {
          p['respuestaDada'] = '';
        })
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
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
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
            popup: 'custom-border'
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
          },
          error:(err)=>{
          console.log("hay un error")
          console.log(err)
          }
        })
        vecesEnviado++;
        this.vecesEnviado = vecesEnviado;
      }
    })
  }
  evaluarExamen(){
    this.esEnviado = true;
    this.preguntas.forEach((p:any) => {
      if(p.respuestaDada == p.respuesta){
        this.respuestasCorrectas ++;
        let puntos = this.examen.puntosMaximos/this.preguntas.length;
        this.puntosConseguidos += puntos;
      }
      if(p.respuestaDada.trim() != ''){
        this.preguntasTotales ++;
      }
    });
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