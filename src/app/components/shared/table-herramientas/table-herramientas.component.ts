import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { ProductoService } from 'src/app/service/producto.service';
import { Product } from 'src/app/interface/producto.interface';
import { ProductVersion } from 'src/app/interface/version-producto';
import { NotificationService } from 'src/app/service/notification.service';
import { CreateToolDTO, Herramientas, ToolDTO } from 'src/app/interface/herramientas.interface';
@Component({
  selector: 'app-table-herramientas',
  templateUrl: './table-herramientas.component.html',
  styleUrls: ['./table-herramientas.component.css']
})
export class TableHerramientasComponent implements OnInit {
  toolForm!: FormGroup;
  isLoaded: boolean = false;
  productsToDisplay: Product[] = []; 
  versionsToDisplay: ProductVersion[] = []; 

  userTools: ToolDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private herramientasService: HerramientasService,
    private categoriaProductoService: CategoriaProductoService,
    private productoService: ProductoService,
    private notification: NotificationService,
    private router: Router,
  ){}
  ngOnInit(): void {
<<<<<<< HEAD
    this.toolForm = this.formBuilder.group({
      yearsOfExperience: ["",Validators.required],
      level: this.formBuilder.group({
        id: ["", Validators.required],
        description: ["",]
      }),
      product: this.formBuilder.group({
        id: ["",],
        name: ["",]
      }),
      version: this.formBuilder.group({
        id: ["",],
        name: ["",]
      }),
      categoryId: ["", Validators.required]
=======
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
      (data: ProductCategory[]) => {
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
      this.productByRow[index] = [];
      return;
    }
    this.productoService.obtenerProductosPorCategoria(selectedCategoriaIdValue).subscribe(
      (data: Product[]) => {
        this.productByRow[index] = data;
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
      (data: ProductVersion[] | undefined) => {
        this.versionByRow[index] = data || [];
      },
      (error) => {
        console.log(`Error al obtener las versiones: ${error}`);
      }
    );
  }
    createFormRows() {
      const rowsArray = this.herramientas.map((herramienta, index) => {
        this.productoService.obtenerProductosPorCategoria(herramienta.productVersion.product.productCategory.id).subscribe({
          next: (data: Product[]) => {
            this.productByRow[index] = data;
          },
          error: (error) => {
            console.log('Error al obtener productos:', error);
          }
        });
        this.productoService.getVersionByProduct(herramienta.productVersion.product.id).subscribe({
          next: (data: ProductVersion[]) => {
            this.versionByRow[index] = data;
          },
          error: (error) => {
            console.log('Error al obtener versiones:', error);
          }
        })
        let valorDefectoProducto = String(herramienta.productVersion.product.id)
        if (herramienta.herr_prd_otro){
          valorDefectoProducto = 'otro'
        }
        const row = this.formBuilder.group({
          herr_cat_name: [herramienta.productVersion.product.productCategory.id, Validators.required],
          herr_prd_name: [valorDefectoProducto, Validators.required],
          yearsOfExperience: [herramienta.yearsOfExperience],
          herr_prd_otro:[herramienta.herr_prd_otro],
          productVersion: this.formBuilder.group({
            vrs_id: [herramienta.productVersion.id, Validators.required],
            vrs_name: [herramienta.productVersion.name],
          }),
         certification: [herramienta. certification],
          level: [herramienta.level]
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
    try {
      this.herramientasService.guardarHerramienta(herramientas).toPromise();
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
    const newRow = this.formBuilder.group({
      herr_cat_name: [{ value: '', disabled: false }, Validators.required],
      herr_prd_name: [{ value: '', disabled: true }, Validators.required],
      yearsOfExperience: [''],
      productVersion: this.formBuilder.group({
        vrs_id: [{ value: 0, disabled: true }, Validators.required],
        herr_otro_vrs_name: ['']

      }),
     certification: [false],
      level: [''],
      herr_prd_otro: [''],
      herr_vrs_otro: ['']
>>>>>>> b220794dbb23a6727427d309d3d5d0a5c0dd21da
    });
    this.isLoaded = true;

    this.getCurrentTools();
  }

  getCurrentTools(){
    this.herramientasService.getCurrentUserTools().subscribe({
      next: (tools: ToolDTO[])=>{
        console.log("Current tools", tools)
        this.userTools = tools
      },
      error: (err)=>{
        console.log("Error at getting tools: ", err)
      }
    });
<<<<<<< HEAD
  }
  
  getProducts(){
    const categoryId = this.toolForm.get("categoryId")?.value;

    this.productoService.getProductsByCategory(categoryId).subscribe({
      next: (products: Product[])=>{
        console.log("Obtuve products", products)
        this.productsToDisplay = products
        console.log("Obtuve products to display", this.productsToDisplay)
      },
      error: (err) =>{
        console.log("Error al obtener productos desde categoría: ", err)
=======
    newRow.get('herr_prd_name')?.valueChanges.subscribe((value) => {
      const versionProductoControl = newRow.get('productVersion.vrs_id');
      if (value) {
        versionProductoControl?.enable();
      } else {
        versionProductoControl?.disable();
>>>>>>> b220794dbb23a6727427d309d3d5d0a5c0dd21da
      }
    })
  }

  getVersions(){
    const productId = this.toolForm.get("product")?.get("id")?.value;
    console.log("Product id ", productId)
    this.productoService.getVersionByProduct(productId).subscribe({
      next: (versions: ProductVersion[])=>{
        console.log("versiosn obtained ", versions)
        this.versionsToDisplay = versions
      },
      error: (err) =>{
        console.log("Error al obtener versiones desde productos: ", err)
      }
    })
  }


  async addTool() {
    console.log("Tool to be sent: ", this.toolForm.value)

    if (!this.toolForm.invalid) {
      const newTool: CreateToolDTO = this.toolForm.value
      console.log("Tool to be sent: ", newTool)
      this.herramientasService.createTool(newTool).subscribe({
        next:(res) => {
          console.log("Created", res)
        },
        error: (err) => {
          console.log("Error al crear herramienta: ",err)
        }
      })
   
    }
  }

  deleteTool(toolId: number){
    console.log("Toold Id to delete ", toolId)
    this.herramientasService.deleteTool(toolId).subscribe({
      next: (res)=>{
        console.log("tool deleted", res);
        this.getCurrentTools();
      },
      error: (err)=>{
        console.log("error delting tool", err)
      }
    })

  }

}