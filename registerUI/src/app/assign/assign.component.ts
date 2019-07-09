import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  profesors = [];
  materias = [];
  grupos = [];  
  ngOnInit() {
    this._dataService.getprofesor().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.profesors.push(response[index]);
      }
      console.log(this.profesors);
    },
    error => {
      console.log("Error", error);
    });

    this._dataService.getmateria().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.materias.push(response[index]);
      }
      console.log(this.materias);
    },
    error => {
      console.log("Error", error);
    });

    this._dataService.getgrupo().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
         this.grupos.push(response[index]);
      }
      console.log(this.grupos);
    },
    error => {
      console.log("Error", error);
    });
  }

  register(name:string) {
    /*var month = fecha.getUTCMonth() + 1; //months from 1-12
    var day = fecha.getUTCDate();
    var year = fecha.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day + " 00:00:00";
    this._dataService.regprofessor(name,lastNameP,lastNameM,user,pass,newdate);*/
    console.log(name);
  }

}
