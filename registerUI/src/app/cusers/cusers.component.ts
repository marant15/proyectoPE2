import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-cusers',
  templateUrl: './cusers.component.html',
  styleUrls: ['./cusers.component.css']
})
export class CusersComponent implements OnInit {

  constructor(private _dataService: DataService) { }
  isadmin = false;
  ngOnInit() {
  }

  register(user:string, pass:string,name:string,lastNameP:string,lastNameM:string){
    this._dataService.regusuario(user,pass,this.isadmin,name,lastNameP,lastNameM);
    console.log(user,pass,this.isadmin,name,lastNameP,lastNameM);  
  }

}
