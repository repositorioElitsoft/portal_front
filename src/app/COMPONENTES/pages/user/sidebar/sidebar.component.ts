import { MatSnackBar } from '@angular/material/snack-bar';

import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/SERVICE/categoria.service';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-sidebar-user-exam',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categorias:any;

  constructor(
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    public login:LoginService
  ) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data:any) => {
        this.categorias = data;
      },
      (error) => {
        this.snack.open('Error al cargar las categorías','',{
          duration:3000
        })
        console.log(error);
      }
    )
  }

  public logout(){
    //TODO this.login.logout();
    window.location.reload();
  }

}
