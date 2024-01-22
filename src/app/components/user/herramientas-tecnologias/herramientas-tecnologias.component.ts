import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { CertificacionService } from 'src/app/service/certificacion.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { NivelService } from 'src/app/service/nivel.service';
import { ProductoService } from 'src/app/service/producto.service';
import { UserService } from 'src/app/service/user.service';
import { ProductCategory } from 'src/app/interface/categoria-prod.interface';
import { Certification } from 'src/app/interface/certificacion.interface';
import { Herramientas } from 'src/app/interface/herramientas.interface';
import { Level } from 'src/app/interface/niveles.interface';
import { Product } from 'src/app/interface/producto.interface';
@Component({
  selector: 'app-herramientas-tecnologias',
  templateUrl: './herramientas-tecnologias.component.html',
  styleUrls: ['./herramientas-tecnologias.component.css']
})
export class HerramientasTecnologiasComponent implements OnInit {
  herramienta!: Herramientas;
  selectedCategoriaId: number | undefined;
  selectedProductoId: number | undefined;
  selectedCertificadoId?: number;
  selectedNivelId: number | undefined;
  categorias: ProductCategory[] = [];
  productos: Product[] = [];
  certificados: Certification[] = [];
  niveles: Level[] = [];
  @ViewChild('btnradio1', { static: true }) btnradio1!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio2', { static: true }) btnradio2!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio3', { static: true }) btnradio3!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio4', { static: true }) btnradio4!: ElementRef<HTMLInputElement>;
  @ViewChild('btnradio5', { static: true }) btnradio5!: ElementRef<HTMLInputElement>;
  
  constructor(private router: Router,
    private categoriaProductoService: CategoriaProductoService,
    private certificacionService: CertificacionService,
    private nivelService: NivelService,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private userService:UserService
    ) { }
    ngOnInit(): void {
    
    }
    navigateToRoute(route: string) {
      this.router.navigate([route]);
    }
    redirectTo(){
      this.navigateToRoute('/user/informacion-academica')
    }
}