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