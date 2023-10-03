import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { NivelService } from 'src/app/service/nivel.service';
import { ProductoService } from 'src/app/service/producto.service';
import { CategoriaProducto } from 'src/app/interface/categoria-prod.interface';
import { Producto } from 'src/app/interface/producto.interface';
import { VersionProducto } from 'src/app/interface/version.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-table-herramientas',
  templateUrl: './table-herramientas.component.html',
  styleUrls: ['./table-herramientas.component.css']
})
export class TableHerramientasComponent implements OnInit {

  herramientasForm!: FormGroup;
  herramientas: HerramientaData[] = []
  categorias: CategoriaProducto[] = [];
  rows: any[] = [];
  productByRow: Producto[][] = [];
  versionByRow: VersionProducto[][] = [];
  selectedCategoriaId: any;


  constructor(
    private formBuilder: FormBuilder,
    private herramientasService: HerramientasService,
    private categoriaProductoService: CategoriaProductoService,
    private productoService: ProductoService,
    private notification: NotificationService,
  ){}

  ngOnInit(): void {
    this.herramientasForm = this.formBuilder.group({
      rows: this.formBuilder.array([])
    });

    this.getCategories();
    this.addRow();
  }

  get rowsFormArray() {
    return this.herramientasForm.get('rows') as FormArray;
  }

  getCategories() {
    this.categoriaProductoService.getCategoriasDisponibles().subscribe(
      (data: CategoriaProducto[]) => {
        this.categorias = data;
      },
      (error) => {
        console.log('Error al obtener categorías:', error);
      }
    );
  }

  getProducts(index: number) {
    const row = this.rowsFormArray.at(index);
    const selectedCategoriaIdControl = row.get('selectedCategoriaId');    
    const selectedCategoriaIdValue = selectedCategoriaIdControl?.value;

    if (!selectedCategoriaIdValue) {
      console.log('No se ha seleccionado una categoría');
      this.productByRow[index] = [];
      return;
    }

    this.productoService.obtenerProductosPorCategoria(selectedCategoriaIdValue).subscribe(
      (data: Producto[]) => {
        this.productByRow[index] = data;
        console.log('Productos cargados para la fila ' + index + ':', this.productByRow[index]);
      },
      (error) => {
        console.log('Error al obtener productos:', error);
      }
    );
  }
    
  getVersion(index: number) {
    const row = this.rowsFormArray.at(index);
    const selectedProductoIdControl = row.get('selectedProductoId');
    const selectedProductoIdValue = selectedProductoIdControl?.value;

    if (!selectedProductoIdValue) {
      console.log('No se ha seleccionado un producto');
      return;
    }
    
    this.productoService.getVersionByProduct(selectedProductoIdValue).subscribe(
      (data: VersionProducto[]) => {
        this.versionByRow[index] = data;
        console.log(`Versiones cargadas para la fila ${index}:`, this.versionByRow[index]);
      },
      (error) => {
        console.log(`Error al obtener las versiones: ${error}`);
      }
    );
  }

  guardarDatos() {
    const herramientas = this.herramientasForm.value.rows;

    this.herramientasService.guardarHerramienta(herramientas).subscribe(
      (nuevaHerramienta: HerramientaData) => {
        this.notification.showNotification(
          'success',
          'Datos guardados',
          'Las herramientas han sido guardadas correctamente.'
        );
        console.log('Herramienta guardada exitosamente:', herramientas);
      },
      (error) => {
        this.notification.showNotification(
          'error',
          'Error al guardar los datos',
          'Ha ocurrido un error al guardar los datos, revise los campos y reintente.'
        );
        console.log('Error al guardar herramienta:', error);
      }
    );
  }

  addRow() {
    const newRow = this.formBuilder.group({
      selectedCategoriaId: [{ value: '', disabled: false }, Validators.required],
      selectedProductoId: [{ value: '', disabled: true }, Validators.required],
      herr_usr_anos_exp: [''],
      herr_is_cert: [false],
      herr_nvl: [''],
      versionProducto: this.formBuilder.group({
        vrs_id: [{ value: 0, disabled: true }, Validators.required]
      })
    });
  
    newRow.get('selectedCategoriaId')?.valueChanges.subscribe((value) => {
      const selectedProductoIdControl = newRow.get('selectedProductoId');
      if (value) {
        selectedProductoIdControl?.enable();
      } else {
        selectedProductoIdControl?.disable();
      }
    });
  
    newRow.get('selectedProductoId')?.valueChanges.subscribe((value) => {
      const versionProductoControl = newRow.get('versionProducto.vrs_id');
      if (value) {
        versionProductoControl?.enable();
      } else {
        versionProductoControl?.disable();
      }
    });
  
    this.rowsFormArray.push(newRow);
    console.log('Filas', this.rowsFormArray.value);
  }

  removeRow(index: number) {
    this.rowsFormArray.removeAt(index);
  }
}
