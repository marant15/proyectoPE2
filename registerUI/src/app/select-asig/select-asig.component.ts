import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-asig',
  templateUrl: './select-asig.component.html',
  styleUrls: ['./select-asig.component.css']
})
export class SelectAsigComponent implements OnInit {

  asignaciones = [];

  constructor(private _dataService: DataService, private myRoute: Router) { }

  ngOnInit() {
    this._dataService.getAsignaciones().subscribe(response =>{
      var count = Object.keys(response).length;
      for (let index = 0; index < count; index++) {
        if(response[index].estado){
          this.asignaciones.push(response[index]);
        }
      }
      console.log(this.asignaciones);
    },
    error => {
      console.log("Error", error);
    });
  }

  edit(numero:string){
    localStorage.setItem('editAsig', numero);
    this.myRoute.navigate(["editasig"]);
  }

}
