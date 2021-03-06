import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-asig',
  templateUrl: './select-asig.component.html',
  styleUrls: ['./select-asig.component.css']
})
export class SelectAsigComponent implements OnInit {

  asignaciones = [];

  constructor(private _coursesService: CoursesService, private myRoute: Router) { }

  ngOnInit() {
    this._coursesService.getAsignaciones().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        this.asignaciones.push(response[index]);
      }
    },
    error => {
      console.log("Error", error);
    });
  }

  setEstado(estado:boolean ){
    var response = "";
    if(estado){
      response ="Abierta"
    }else{
      response = "Cerrada"
    }
    return response;
  }

  edit(numero:string){
    localStorage.setItem('editAsig', numero);
    this.myRoute.navigate(["editasig"]);
  }

}
