import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cusers',
  templateUrl: './cusers.component.html',
  styleUrls: ['./cusers.component.css']
})
export class CusersComponent implements OnInit {

  constructor(private _adminService: AdminService, private myRoute: Router) { }
  isadmin = false;
  ngOnInit() {
  }

  register(user:string, pass:string,name:string,lastNameP:string,lastNameM:string){
    this._adminService.regusuario(user,pass,this.isadmin,name,lastNameP,lastNameM);  
  }

  edit(){
    this.myRoute.navigate(["selectuser"]);
  }

}
