import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-profesor',
  templateUrl: './select-profesor.component.html',
  styleUrls: ['./select-profesor.component.css']
})
export class SelectProfesorComponent implements OnInit {

  profesors=[];

  constructor(private _dataService: DataService, private myRoute: Router) { }

  ngOnInit() {
    this._dataService.getprofesores().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        this.profesors.push(response[index]);
      }
      console.log(this.profesors);
    },
    error => {
      console.log("Error", error);
    });
  }

  edit(numero:string){
    localStorage.setItem('editProf', numero);
    this.myRoute.navigate(["editprof"]);
  }

  
}
