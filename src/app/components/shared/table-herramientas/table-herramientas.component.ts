import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
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

  otroProductoValues: any[] = [];

  isLoaded: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private herramientasService: HerramientasService,
    private categoriaProductoService: CategoriaProductoService,
    private productoService: ProductoService,
    private notification: NotificationService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.herramientasForm = this.formBuilder.group({
      rows: this.formBuilder.array([])
    });
    this.getHerramientas()
    this.getCategories();
  }

  getHerramientas() {
    this.herramientasService.getHerramientasByUserId().subscribe(
      (herramientas: HerramientaData[]) => {
        if (herramientas.length > 0) {
          console.log('respuesta: ', herramientas);
          this.herramientas = herramientas;
          this.createFormRows();


        } else {
          this.addRow();

        }
        this.isLoaded = true;
      },
      (error) => {
        console.error('Error al obtener herramientas:', error);
      }
    );
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
    const selectedCategoriaIdControl = row.get('herr_cat_name');
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
    const selectedProductoIdControl = row.get('herr_prd_name');
    const selectedProductoIdValue = selectedProductoIdControl?.value;

    if (selectedProductoIdValue === 'otro') {
      const otroProductoValue = row.get('herr_prd_otro')?.value;

      // Asigna a otroProductoValue directamente
      this.versionByRow[index] = [];
      this.otroProductoValues[index] = otroProductoValue;
      return;
    } else {

      row.get('herr_prd_otro')?.patchValue('')
    }

    if (!selectedProductoIdValue) {
      return;
    }

    this.productoService.getVersionByProduct(selectedProductoIdValue).subscribe(
      (data: VersionProducto[] | undefined) => {
        // Asegurémonos de que data no sea null ni undefined
        this.versionByRow[index] = data || [];
        console.log('servicio getVersion', data);
        console.log(`Versiones cargadas para la fila ${index}:`, this.versionByRow[index]);
      },
      (error) => {
        console.log(`Error al obtener las versiones: ${error}`);
      }
    );
  }


    createFormRows() {

      const rowsArray = this.herramientas.map((herramienta, index) => {
        this.productoService.obtenerProductosPorCategoria(herramienta.versionProducto.prd.cat_prod_id.cat_prod_id).subscribe({
          next: (data: Producto[]) => {
            this.productByRow[index] = data;
          },
          error: (error) => {
            console.log('Error al obtener productos:', error);
          }
        });
        this.productoService.getVersionByProduct(herramienta.versionProducto.prd.prd_id).subscribe({
          next: (data: VersionProducto[]) => {
            this.versionByRow[index] = data;
          },
          error: (error) => {
            console.log('Error al obtener versiones:', error);
          }
        })
        let valorDefectoProducto = String(herramienta.versionProducto.prd.prd_id)

        if (herramienta.herr_prd_otro){
          valorDefectoProducto = 'otro'
        }

        const row = this.formBuilder.group({
          herr_usr_id:[herramienta.herr_usr_id],
          herr_cat_name: [herramienta.versionProducto.prd.cat_prod_id.cat_prod_id, Validators.required],
          herr_prd_name: [valorDefectoProducto, Validators.required],
          herr_usr_anos_exp: [herramienta.herr_usr_anos_exp],
          herr_prd_otro:[herramienta.herr_prd_otro],
          versionProducto: this.formBuilder.group({
            vrs_id: [herramienta.versionProducto.vrs_id, Validators.required],
            vrs_name: [herramienta.versionProducto.vrs_name],
          }),
          herr_is_cert: [herramienta.herr_is_cert],
          herr_nvl: [herramienta.herr_nvl]
        });

        return row;

    });

      this.herramientasForm.setControl('rows', this.formBuilder.array(rowsArray));

    }

  async guardarDatos() {
    if (this.herramientasForm.invalid) {
      this.notification.showNotification(
        'error',
        'Error al guardar los datos',
        'Por favor, complete todos los campos antes de guardar.'
      );
      return;
    }

    const herramientas = this.herramientasForm.value.rows.map((row: any) => {

      return row;
    });

    console.log('Herramiengas enviadas:', herramientas);

    try {
      this.herramientasService.guardarHerramienta(herramientas).toPromise();
      console.log('Herramienta:', herramientas);
      const isConfirmed = await this.notification.showNotification(
        'success',
        'Datos guardados correctamente',
        'Herramientas guardadas correctamente'
      )
      if (isConfirmed) {
        this.router.navigate(['/informacion-academica']);
      }
    } catch (error) {
      this.notification.showNotification(
        'error',
        'Error al guardar los datos',
        'Ha ocurrido un error al guardar los datos, revise los campos y reintente.'
      );
    }
  }




  addRow() {
    console.log('metodo AddRow')
    const newRow = this.formBuilder.group({
      herr_cat_name: [{ value: '', disabled: false }, Validators.required],
      herr_prd_name: [{ value: '', disabled: true }, Validators.required],
      herr_usr_anos_exp: [''],
      versionProducto: this.formBuilder.group({
        vrs_id: [{ value: 0, disabled: true }, Validators.required],
        herr_otro_vrs_name: ['']

      }),
      herr_is_cert: [false],
      herr_nvl: [''],
      herr_prd_otro: [''],
      herr_vrs_otro: ['']
    });


    newRow.get('herr_cat_name')?.valueChanges.subscribe((value) => {
      const selectedProductoIdControl = newRow.get('herr_prd_name');
      if (value) {
        selectedProductoIdControl?.enable();
      } else {
        selectedProductoIdControl?.disable();
      }
    });

    newRow.get('herr_prd_name')?.valueChanges.subscribe((value) => {
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
