import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public login:LoginService) { }

  ngOnInit(): void {
    
  }

  public logout(){
   // TODO refacto this.login.logout();
    window.location.reload();
  }

}
