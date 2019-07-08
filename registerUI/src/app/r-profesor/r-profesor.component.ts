import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-r-profesor',
  templateUrl: './r-profesor.component.html',
  styleUrls: ['./r-profesor.component.css']
})
export class RProfesorComponent implements OnInit {

  date: Date = new Date();
  
  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  register(name:string,lastNameP:string,lastNameM:string,user:string, pass:string, fecha:Date) {
    var month = fecha.getUTCMonth() + 1; //months from 1-12
    var day = fecha.getUTCDate();
    var year = fecha.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day + " 00:00:00";
    this._dataService.regprofessor(name,lastNameP,lastNameM,user,pass,newdate);
  }
}
