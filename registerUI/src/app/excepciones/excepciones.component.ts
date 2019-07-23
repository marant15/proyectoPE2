import { Component, OnInit } from '@angular/core';
import { DataService } from '../http.service';

@Component({
  selector: 'app-excepciones',
  templateUrl: './excepciones.component.html',
  styleUrls: ['./excepciones.component.css']
})
export class ExcepcionesComponent implements OnInit {

  tiempos = false;
  asignaciones = [];
  profesors = [];

  constructor(private _dataService: DataService) { }

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
  }

  register(assigID:number,pid:number,tipo:string,fecha:Date,hora:Date){
    if(this.tiempos){
      console.log(assigID,tipo,fecha,hora);
      var mi = fecha.getUTCMonth() + 1; //months from 1-12
      var di = fecha.getUTCDate();
      var yi = fecha.getUTCFullYear();
      var date = yi + "-" + mi + "-" + di;
      var houri = hora.getHours();
      var mini = hora.getUTCMinutes();
      var hour = houri+":"+mini+":00";
      this._dataService.excep(assigID,tipo,pid,date,hour);
    }else{
      var ndate = new Date();
      var mi = ndate.getUTCMonth() + 1; //months from 1-12
      var di = ndate.getUTCDate();
      var yi = ndate.getUTCFullYear();
      var date = yi + "-" + mi + "-" + di;
      var houri = ndate.getHours();
      var mini = ndate.getUTCMinutes();
      var segi = ndate.getUTCSeconds();
      var hour = houri+":"+mini+":"+segi;
      this._dataService.excep(assigID,tipo,pid,date,hour);
    }
  }

}
