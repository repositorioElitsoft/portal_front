import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';
import { PreguntaService } from 'src/app/service/pregunta.service';
import 'chartjs-plugin-annotation';
import { UserService } from 'src/app/service/user.service';
import { ProductoService } from 'src/app/service/producto.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { ResultadosService } from 'src/app/service/resultados.service';
import { Result } from 'src/app/interface/exam-results.interface';

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
  herramientas: any;
  lvl: any;
  productIds: any;
  productname: any;
  questions: any;
  productid: any;
  lvlid: any;
  puntuacionMaxima: number = 20; 

  
  constructor(
    private locationSt:LocationStrategy,
    private route:ActivatedRoute,
    private preguntaService:PreguntaService,
    private productService:ProductoService,
    private userService: UserService,
    private herramientasService:HerramientasService,
    private resultadosService:ResultadosService
    
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
        
      },
      (error) => {
        console.error('Error al obtener el usuario guardado:', error);
      }
    );
    this.herramientasService.getCurrentUserTools().subscribe(
      (herramientas:any) => {
        if (herramientas && herramientas.length > 0) {
          this.herramientas = herramientas
          this.lvl= herramientas.map((herramienta:any) => herramienta.level.description);
          console.log("herramientas",this.herramientas);
          this.productIds = herramientas.map((herramienta:any) => herramienta.productVersion.name);
          this.productname = herramientas.map((herramienta:any) => herramienta.productVersion.product.name);
          this.productid = herramientas.map((herramienta:any) => herramienta.productVersion.product.id);
           this.productid = herramientas.map((herramienta:any) => herramienta.productVersion.product.id);
           this.lvlid= herramientas.map((herramienta:any) => herramienta.level.id);
          console.log('IDs de productos:', this.productIds);
          console.log('name de productos:', this.productname);
          console.log('level:', this.lvl);
          console.log('level:', this.lvl);
          this.generarExamen();
        } else {
          console.log('No se encontraron herramientas para el usuario.');
        }
      },
      (error) => {
        console.error('Error al obtener el usuario guardado:', error);
      }
    );
    
  }
  ngAfterViewInit(): void {
   
  }
  obtenerResultados() {
    this.resultadosService.obtenerResultadosByUser().subscribe(
      (data:any) => {
        this.resultados = data;
        console.log("data", data);
        this.mostrarGrafico() ;
      },
      (error:any) => {
        console.error(error);
      }
    );
  }
  generarExamen(): void {
    const description = this.lvl;
    this.questions = []; 
    this.timer = 180; 
    console.log("description blabla bla",description);
    for (const productId of this.productIds) {
      this.preguntaService.generarExamen(description[0], productId).subscribe({
        next: (examQuestions) => {
          console.log(`Preguntas del examen para el producto ${productId}:`, examQuestions);
          this.questions = this.questions.concat(examQuestions);
        },  
        error: (error) => {
          console.error(`Error al generar el examen para el producto ${productId}:`, error);
        },
        complete: () => {
          this.iniciarTemporizador(); 
          this.obtenerResultados();
        }
      });
    }
  }
  
  mostrarGrafico(): void {
    setTimeout(() => {
      const canvas = document.getElementById('resultadoExamenGrafico') as HTMLCanvasElement;
      if (canvas) {
        canvas.width = 800; 
        canvas.height = 600; 
        const ctx = canvas.getContext('2d');
        const dataParaMostrar: any = [];
        console.log("data", this.resultados);
        const examenesFiltrados =this.resultados;
        console.log("examenesFiltrados",examenesFiltrados);
        const veces = examenesFiltrados.length;
        console.log("examenes totales",veces);
        const ultimosTresExamenes = examenesFiltrados.slice(-3);
        ultimosTresExamenes.forEach(resultado => {
          dataParaMostrar.push(resultado.score);
          
        });
        console.log("dataParaMostrar",dataParaMostrar);
        const labelsConPuntos = dataParaMostrar.map((valor: string) => valor + ' puntos');
        const puntuacionMaxima = 20; 
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
  iniciarTemporizador() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluarExamen();
        clearInterval(t);
      } else {
        this.timer--; // Disminuir como número
      }
    }, 1000);
  }
  
  prevenirElBotonDeRetroceso(){
    history.pushState(null,null!,location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null,null!,location.href);
    })
  }
  enviarCuestionario() {
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      cancelButtonColor: '#515151',
      confirmButtonColor: '#F57C27',
      icon: 'info',
      customClass: {
        popup: 'custom-border'
      }
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluarExamen();
  
        const resultados: Result = {
          score: this.puntosConseguidos,
          time: Math.abs(100 - this.timer),
          product: {
            id: this.productid[0],
            name: '',
          },
          level: {
            id: this.lvlid[0],
            description: ''
          }
        };
  
        this.resultadosService.guardarResultados(resultados).subscribe({
          next: (respuesta: any) => {
            this.vecesEnviado = this.resultados.length;
          },
          error: (err: any) => {
            console.log('Hay un error', err);
          }
        });
      }
    });
  }

  evaluarExamen() {
  this.esEnviado = true;
  this.questions.forEach((p: any) => {
    if (p.respuestaDada == p.answer) {
      this.respuestasCorrectas++;
      this.puntosConseguidos += 2;
    }
    if (p.respuestaDada.trim() != '') {
      this.preguntasTotales++;
    }
  });
  this.mostrarGrafico();
  console.log('Puntos conseguidos:', this.puntosConseguidos);
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